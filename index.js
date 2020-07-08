const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000;

// CRUD
app.get('/', async (req, res) => {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  res.send(data);
});

app.listen(3000, function () {
  console.log(`Example app listening on port ${port}!`);
});
