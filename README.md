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
