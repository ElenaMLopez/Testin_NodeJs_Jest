Install all dependencies: jest, express, axios and nodemor for hot reload.

Use the start server example in expresss for a ['Hello World'](https://expressjs.com/es/starter/hello-world.html)

Run the server with nodemon. I just edit the package.json with this scrip:

```js
    "scripts": {
    "serve": "nodemon ./index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```

We are goint to use this JSONplaceholder url: `https://jsonplaceholder.typicode.com/users`

## UNIT TEST

Just test a particular functionality, a code unit. In this way isn't a test for API calls or database connections or interactions.

With this kind of test, we can't test for example, if an array is done correctly, or if really isn't empty, etc.

## INTEGRATION TEST

Here we have the API calls, test if we have a correct response, for example, in that way we can test fluxes completely.

## E2E TEST

This kind of test start the apliction and interact with it. They are used to test the user's interfaces.

## TEST CONCEPTS:

- **Spy, stub & mock**: This concepts appear with a test library called Sinon. Spy is a function that we can ask how many times was called and with which arguments. Stub is similar to Spy, but we can tell what behaviour must have, like return and object with a user, at the moment that have been called. Mock is a part of code that's implements the same that others, but we can tell what to use.
- **Mock**: Everything are mocks in Jest, so we have in this entity all the concepts before.
- **Module pattern**: We are going to use this kind of pattern. Everything will be in a module.
- **Dependency injection**: We can inject axios for example, by mocks (is just an argument)
- **Efects!**: don make API calls, don't test database connection. Just functionality

---
