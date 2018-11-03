const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

const routes = require('./controllers/burgersController.js');

app.use(routes);

app.listen(PORT, function() {
  console.log('Server listening on: http://localhost:' + PORT);
});