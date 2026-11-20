# ==============================================================================
# Base Image: Lightweight Node 22 on Debian Slim (Fast glibc runtime)
# ==============================================================================
FROM node:22-slim AS base
WORKDIR /app

# Install curl and ca-certificates for healthchecks and HTTPS requests
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates && rm -rf /var/lib/apt/lists/*

# ==============================================================================
# Stage 1: Install Dependencies
# ==============================================================================
FROM base AS deps
WORKDIR /app

COPY package.json package-lock.json ./
# Fast clean install of dependencies
RUN npm ci --ignore-scripts

# ==============================================================================
# Stage 2: Build the Application
# ==============================================================================
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV BUILD_STANDALONE=false

# Run Next.js production build (~4 mins without slow 60k files NFT trace)
RUN npm run build

# Remove development dependencies to keep the image slim
RUN npm prune --omit=dev

# ==============================================================================
# Stage 3: Production Runner
# ==============================================================================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create non-root system user & group for enhanced container security
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 nextjs

# Copy runtime files
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

# Copy content folder & config for runtime CMS reading
COPY --from=builder --chown=nextjs:nodejs /app/content ./content
COPY --from=builder --chown=nextjs:nodejs /app/keystatic.config.ts ./keystatic.config.ts

USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
