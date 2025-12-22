
# Use the official Node.js 20 image (slim version = smaller, faster image)
# This image already has Node.js and npm installed
FROM node:20-slim

# Set the working directory inside the container
# All next commands will run inside /app
WORKDIR /app

# Copy only package.json into the container
# This is done first to leverage Docker layer caching
COPY package.json .

# Install all dependencies listed in package.json
# These packages are installed INSIDE the container, not on your laptop
RUN npm install

# Copy the rest of the application source code into the container
# (React components, Vite config, etc.)
COPY . .

# Expose port 5173 (Vite default dev server port)
# This allows access from the host machine
EXPOSE 5173

# Start the Vite development server
# --host allows the app to be accessible outside the container (e.g. browser)
CMD ["npm", "run", "dev", "--", "--host"]
