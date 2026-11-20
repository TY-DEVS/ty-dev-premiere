# ==============================================================================
# Lean Single-Stage Dockerfile for Fast Production Builds
# Eliminates slow cross-layer file copying & unnecessary chown operations
# ==============================================================================
FROM node:22-slim

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV BUILD_STANDALONE=false
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV=production

# Install curl for container healthchecks
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates && rm -rf /var/lib/apt/lists/*

# 1. Fast dependency installation
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund --ignore-scripts

# 2. Build Next.js application
COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
