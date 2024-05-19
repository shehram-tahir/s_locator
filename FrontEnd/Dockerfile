# Use an official Node runtime as a parent image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container
COPY . .

# Expose port 9000
EXPOSE 9000

# # Prod
# # Build the app
# RUN npm run build
# # Install http-server to serve the static files
# RUN npm install -g http-server
# CMD ["http-server", "dist", "-p", "9000"]

# Dev
# # Install dependencies
RUN npm install
# Serve the static files
CMD ["npm", "start"]