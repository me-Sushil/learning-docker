# Multi-stage build for optimization
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./

# Install ALL dependencies for build
RUN npm ci

COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]


# # Use the official Node.js 20 image (slim version = smaller, faster image)
# # This image already has Node.js and npm installed
# FROM node:20-slim

# # Set the working directory inside the container
# # All next commands will run inside /app
# WORKDIR /app

# # Copy only package.json into the container
# # This is done first to leverage Docker layer caching
# COPY package.json .

# # Install all dependencies listed in package.json
# # These packages are installed INSIDE the container, not on your laptop
# RUN npm install

# # Copy the rest of the application source code into the container
# # (React components, Vite config, etc.)
# COPY . .

# # Expose port 5173 (Vite default dev server port)
# # This allows access from the host machine
# EXPOSE 5173

# # Start the Vite development server
# # --host allows the app to be accessible outside the container (e.g. browser)
# CMD ["npm", "run", "dev", "--", "--host"]
