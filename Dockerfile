# Node server for downloading
FROM node:latest

# Work directory
WORKDIR /opt/app

# Installing package.json only
COPY package*.json ./
RUN npm install --silent
ENV PATH=$PATH:/opt/app/node_modules/.bin

# Deploy the application
COPY . ./
RUN npm run build

# HTTP Server for serving the web server
RUN npm install http-server

# Run the application
EXPOSE 8080
CMD ["http-server", "./dist", "-p", "8080"]