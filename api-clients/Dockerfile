# Use a smaller base image for the final image
FROM node:20-alpine as base

# Install curl for debugging
RUN apk add --no-cache curl

# Set node environment, either development or production
# Defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Default to port 3002 for Node
ARG PORT=3004
ENV PORT $PORT
EXPOSE $PORT

# You'll likely want the latest npm, regardless of node version, for speed and fixes
# But pin this version for the best stability
RUN npm i npm@latest -g

# Install dependencies first
# We have to create the dir with root and change perms
RUN mkdir /app && chown node:node /app
WORKDIR /app

# The official node image provides an unprivileged user as a security best practice
# But we have to manually enable it. We put it here so npm installs dependencies as the same
# user who runs the app.
USER node
COPY --chown=node:node package.json package-lock.json* ./
RUN npm install --no-optional && npm cache clean --force
ENV PATH /app/node_modules/.bin:$PATH

# A dev and build-only stage. We don't need to
# Copy in code since we bind-mount it
FROM base as dev
ENV NODE_ENV=development
RUN npm install --only=development
# We use "npm start" here in development and node in production
CMD ["npm", "run", "dev"] # Explicitly run npm script

FROM dev as test
# Copy in our source code last, as it changes the most
# Copy in as node user, so permissions match what we need
COPY --chown=node:node . .
CMD ["npm", "test"]

# This only has minimal deps and files
FROM base as prod
# Copy in as node user, so permissions match what we need
COPY --chown=node:node . .
# Check every 30s to ensure this service returns HTTP 200
HEALTHCHECK --interval=600s CMD node ./src/healthcheck.js
CMD ["node", "./index.js"]
