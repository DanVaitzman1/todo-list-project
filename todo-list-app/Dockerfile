# Use the official Node.js image as the base image
# Choose the version compatible with your app
FROM node:18 as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Build the application for production
RUN npm run build

# Use a lightweight web server to serve the built app
# The nginx image is commonly used for this purpose
FROM nginx:stable-alpine

# Copy the built app from the previous stage to the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port Nginx will serve the app on
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
