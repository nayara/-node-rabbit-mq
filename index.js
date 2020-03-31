const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require('./db-connection');

const app = express();

dbConnection;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 8080;

app.listen(port, () => {
  console.log('\n\nServer running on port %s', port);
});