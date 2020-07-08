const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false })); // Parsea lo que venga en el body

app.use(bodyParser.json()); // Parsea lo que enviamos nostotros

// CRUD

/* Get */
app.get('/', async (req, res) => {
  const { data } = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  res.send(data);
});

/* Post */
app.post('/', async (req, res) => {
  const { body } = req;
  const { data } = await axios.post(
    'https://jsonplaceholder.typicode.com/users',
    body
  );
  res.status(201).send(data);
});

/* Put */

app.put('/:id', async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, body);
  res.sendStatus(204);
});

/* Delete */
app.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  res.sendStatus(204);
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
