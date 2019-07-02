const express = require('express');
const path = require('path');
const app = express();
const questionController = require('./questionController.js')
// const mongo = require('../database/mongo.js')

// mongo();

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/api/questions', (req, res) => res.status(200).send('this is working'));

// app.get('/questions', questionController.getAll);
const port = process.env.NODE_ENV === 'production' ? 3000 : 8080;
app.listen(3000, () => console.log(`listening on port ${port}`));
