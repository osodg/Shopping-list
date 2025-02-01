# Use Node.js base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy all files into the container
COPY . .

# Install a simple HTTP server
RUN npm install -g http-server

# Expose port 3000
EXPOSE 3000

# Disable update notifier
ENV NO_UPDATE_NOTIFIER=true

# Serve files using http-server
CMD ["http-server", "-p", "3000"]
