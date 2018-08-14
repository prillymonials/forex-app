# Foreign Exchange Market Application

## Overview

The purpose this application is to show an information about exchange rate from USD to other currencies.
This application can be convert an amount of USD to one or multiple currency.
For example, we can know how much 150 USD if it converted into IDR and/or SGD.

## Folder Structure

```
.
├── config              # Configuration for Webpack and Jest.
│   └── jest            # Additional Jest configuration: file-loader, mocking fetch, and alert() implementation.
├── public              # Static file of application.
├── src                 # Main code of application.
│   ├── components      # The React component which have no state (UI only).
│   ├── containers      # The React component which have states inside.
│   ├── tests           # Unit testing files.
│   ├── utils           # Helper for application, which reusable.
│   └── index.tsx       # Main of application.
├── .babelrc            # Babel configuration for Jest.
├── .dockerignore       # Docker exclude file or directory from Dockerfile.
├── Dockerfile          # Docker deploy script.
├── jest.config.js      # Jest configuration when running the testing.
├── package.json        # List of dependencies will be used in app.
├── tsconfig*.json      # Configuration typescript for development, testing, and production
└── tslint.json         # Linting for typescript for standardize coding.
```

## How to Run and Build in Local

If you want to run the application, do:
1. Run the `npm install` or `npm i` for installing all dependencies.
   It will create `node_modules` directory.
2. Run the `npm run start`.
   The default port is `3000`. But you can change in `config/webpack.config.dev.js` in `port` variable.

If you want to build the application, do:
1. Run the `npm install` or `npm i` for installing all dependencies.
2. Run the `npm run build`.
   Before running build, it automatically run `npm run test` for testing purpose.
   If the test has failure, it will cancel building the application.
   This code has coverage, and will be create `coverage` directory.
   After the test, the build is running and will be created `dist` directory.
3. Copy the `dist` folder, and put it to your web server / service.

## How to deploy with Docker

Before you deploy, you must install `Docker` in `https://www.docker.com/get-started` if you Windows or Mac user.
And for Linux user in `https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04`

Steps for deploy with `Docker`:
1. Build the image with `docker build . -t forex-app`
   You can change the `forex-app` with another if you use this name already.
2. After that check your image with `docker images`.
   Please check your repository is in there.
3. Run the image with `docker run forex-app`.
   It will use [`http-server`](https://www.npmjs.com/package/http-server) for serving the web server.
   If your port `8080` is already used. Please change the `EXPOSE` and `-p` with your available port.