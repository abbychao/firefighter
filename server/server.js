const express = require('express');
const path = require('path');
const app = express();
const questionController = require('./questionController.js')
// const mongo = require('../database/mongo.js')
// const psqlDB = require('./psql-database.js/index.js');

// psqlDB();
// mongo();

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/questions', (req, res) => res.status(200).send('this is working'));

// app.get('/questions', questionController.getAll);

app.listen(3000, () => console.log('listening on port 3000 (dev on port 8080)'));
