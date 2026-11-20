# ==============================================================================
# Lean Single-Stage Dockerfile for Fast Production Builds
# Eliminates slow cross-layer file copying on the deployment server
# ==============================================================================
FROM node:22-slim

WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1
ENV BUILD_STANDALONE=false
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Install curl for container healthchecks
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates && rm -rf /var/lib/apt/lists/*

# 1. Fast dependency installation (includes build devDependencies like typescript)
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund --ignore-scripts

# 2. Build Next.js application (standalone NFT trace disabled, types validated pre-commit)
COPY . .
RUN npm run build

# 3. Strip devDependencies to minimize image size while retaining runtime deps (sharp, etc.)
RUN npm prune --omit=dev --no-audit --no-fund

# 4. Permissions for runtime
RUN chown -R node:node /app

ENV NODE_ENV=production
USER node

EXPOSE 3000

CMD ["npm", "start"]
