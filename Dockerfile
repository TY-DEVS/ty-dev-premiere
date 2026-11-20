# ==============================================================================
# Build Stage: Single builder to eliminate slow multi-stage file copying
# ==============================================================================
FROM node:22-slim AS builder
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV BUILD_STANDALONE=false

# 1. Fast dependency installation (no-audit, no-fund, no-scripts)
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund --ignore-scripts

# 2. Build Next.js application
COPY . .
RUN npm run build

# 3. Strip devDependencies to minimize image size
RUN npm prune --omit=dev --no-audit --no-fund

# ==============================================================================
# Runner Stage: Lean production runner
# ==============================================================================
FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Install curl for container healthchecks
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates && rm -rf /var/lib/apt/lists/*

# Copy only production assets and pruned node_modules
COPY --from=builder --chown=node:node /app/.next ./.next
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/package.json ./package.json
COPY --from=builder --chown=node:node /app/content ./content
COPY --from=builder --chown=node:node /app/keystatic.config.ts ./keystatic.config.ts

USER node

EXPOSE 3000

CMD ["npm", "start"]
