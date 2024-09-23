# Stage 1: Build the application
FROM node:22-alpine AS builder
# Set the working directory
WORKDIR /app
# Copy package.json and package-lock.json
COPY package*.json ./
# Set enviroment variable for Vite public URL
ARG VITE_PUBLIC_URL
ENV VITE_PUBLIC_URL=$VITE_PUBLIC_URL
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

# docker build -t disney-app --build-arg VITE_PUBLIC_URL=https://api.disneyapi.dev .
# docker run --name disney-app -p 3000:80 disney-app