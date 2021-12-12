# Name of project

## Prerequisites
- NodeJS 10.x.x or higher

## Project structure
```
└──server     # express server
    ├── index.js
    ├── README.md
    ├── ...
    └── package.json
└──client     # angular project
    ├── e2e
    ├── src
    ├── README.md
    ├── tsconfig.json
    ├── ...
    ├── angular.json
    └── package.json
```
### Server
This is a simple express app that //TODO add description.

Run `$ npm install` to install it's dependencies and `$ npm start` to start the server on port 3000

### Client

Run `$ npm install` to install it's dependencies and `$ npm start` to serve your frontend on port 4200.

**Note** that we pre-configured the angular proxy `./client/proxy.conf.json` to proxy all request that start with `http://localhost:4200/api` to your server running on `http://localhost:3000` so you don't run into CORS problems and don't loose time setting up a local proxy.
