# drishti

> Braille software to print books for native indian languages.

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. The current version of node compatible is node 12.0.0, install node version using nvm if preferring package manager otherwise directly install node.
3. Install yarn globally.
4. Install your dependencies for FrontEnd project inside root.
   ```
   cd path/to/drishti/FrontEnd
   yarn install
   ```
6. Install your dependencies on root project

    ```
    cd path/to/drishti
    yarn install
    ```
    
7. Start your app

    ```
    npm start
    ```

## Production Build
    1. Make sure that dependencies are installed already.
    2. Go to path/to/root project drishti
    3. npm run build.
    4. Once completed it is going to create a public folder 
    5. Checkout branch gh-pages in different checkout
    6. Copy the content of public directory as is to gh-pages code.
    7. Once commited , the github deployment will trigger and the latest code changes will be visible here https://drishti.foundation/

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g @feathersjs/cli          # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).
