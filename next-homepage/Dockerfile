# Base on offical Node.js Alpine image
FROM node:alpine

# Set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . /usr/src/app

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY ./ ./

ENV NODE_ENV production
ENV PORT 3000

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
# USER node

# Build app
RUN npm run build

# Run npm start script when container starts
CMD [ "npm", "run", "start" ]