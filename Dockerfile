# Stage 1: Build the application
FROM node:18 AS builder
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .
# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
# Copy the build output to Nginx's html folder
COPY --from=builder /app/dist /usr/share/nginx/html
# Expose the port on which Nginx will run
EXPOSE 80
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

# docker build -t disney-app .
# docker run -p 80:3000 disney-app