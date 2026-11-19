# ==============================================================================
# Base Image: Lightweight Node 22 on Alpine Linux
# ==============================================================================
FROM node:22-alpine AS base
WORKDIR /app

# Install libc6-compat for Alpine compatibility with native tools
RUN apk add --no-cache libc6-compat

# ==============================================================================
# Stage 1: Install Dependencies
# ==============================================================================
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# ==============================================================================
# Stage 2: Build the Application
# ==============================================================================
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Environment variables for build stage
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Run Next.js production build (generates standalone server & copies assets via postbuild)
RUN npm run build

# ==============================================================================
# Stage 3: Production Runner (Ultra-minimal standalone container)
# ==============================================================================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create non-root system user & group for enhanced container security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy static public directory
COPY --from=builder /app/public ./public

# Set up permissions for Next.js prerender cache
RUN mkdir -p .next && chown nextjs:nodejs .next

# Copy standalone build output and static bundles
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to unprivileged nextjs user
USER nextjs

EXPOSE 3000

# Health check to ensure the Next.js server is actively serving requests
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1:3000/ || exit 1

CMD ["node", "server.js"]
