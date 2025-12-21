# Use the official Node.js 20 slim image
# This image includes Node.js and npm, with a smaller footprint
FROM node:20-slim

# Set the working directory inside the container
# All application files and commands will run inside /app
WORKDIR /app

# Copy only package.json into the container
# This helps Docker cache dependency installation layers
COPY package.json .

# Install backend dependencies (express, mongoose, jwt, cors, dotenv, etc.)
# Installation happens INSIDE the container
RUN npm install

# Copy the rest of the backend source code into the container
# Includes server.js, routes, models, and config files
COPY . .

# Start the backend server using nodemon
# npx runs nodemon without requiring a global install
# nodemon automatically restarts the server when code changes
# This is ideal for development environments
CMD ["npx", "nodemon", "server.js"]
