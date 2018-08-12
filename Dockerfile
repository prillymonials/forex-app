# Node server for downloading
FROM node:latest

# Work directory
WORKDIR /opt/app

# Deploy the application
COPY . ./
RUN npm install
RUN npm run build

# HTTP Server for running
RUN npm install http-server --global

# Run the application
WORKDIR /opt/app/dist
["http-server"]