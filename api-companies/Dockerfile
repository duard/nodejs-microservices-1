FROM node:18.16.0-alpine as base

# Add package file
COPY package.json ./
COPY pnpm.lock ./
COPY scripts/dev.sh ./scripts/dev.sh

# Install deps
RUN pnpm install

# Copy source
COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY openapi.yml ./openapi.yml

# Build dist
RUN pnpm build

# Start production image build
FROM node:18.16.0-alpine

# Copy node modules and build directory
COPY --from=base ./node_modules ./node_modules
COPY --from=base /dist /dist

# Copy static files
COPY src/public dist/src/public

# Expose port 3000
EXPOSE 3000
CMD ["dist/src/server.js"]
