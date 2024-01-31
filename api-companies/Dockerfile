# Stage 1: Build Stage
FROM node:18.16.0-alpine as builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy source code
COPY tsconfig.json openapi.yml ./
COPY src ./src

# Build TypeScript
RUN pnpm build

# Stage 2: Production Stage
FROM node:18.16.0-alpine

# Set working directory
WORKDIR /app

# Copy node modules and built files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Copy public files
COPY src/public ./dist/src/public

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/src/server.js"]
