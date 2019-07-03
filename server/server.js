const express = require('express');
const path = require('path');
const questionController = require('./questionController.js');

const app = express();
const resetQs = require('../database/generate-qs.js');
resetQs(20);

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/api/questions/get-all', questionController.getAll);

app.get('/api/questions/get-first', questionController.getFirst);

const port = process.env.NODE_ENV === 'production' ? 3000 : 8080;
app.listen(3000, () => console.log(`listening on port ${port}`));
