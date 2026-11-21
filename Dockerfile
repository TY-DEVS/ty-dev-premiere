# ==============================================================================
# Lean Single-Stage Dockerfile for Fast Production Builds with pnpm
# ==============================================================================
FROM node:22-slim

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV BUILD_STANDALONE=false
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

# Install curl for container healthchecks & required native runtime dependencies for pnpm
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates libatomic1 && rm -rf /var/lib/apt/lists/* \
    && npm install -g pnpm@11.25.0

# 1. Fast dependency installation with pnpm (frozen lockfile & trusted supply chain)
COPY package.json pnpm-lock.yaml .npmrc* ./
RUN pnpm install --frozen-lockfile --trust-lockfile --ignore-scripts --prod=false

# 2. Build Next.js application
COPY . .
RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]
