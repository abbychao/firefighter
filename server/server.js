const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const questionController = require('./questionController.js');
const resetQs = require('../database/generate-qs.js');

const app = express();
resetQs(20);

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/api/questions/all', questionController.getAll);

app.get('/api/questions/first', questionController.getFirst);

app.get('/api/questions/:position', questionController.getByPosition);


const port = process.env.NODE_ENV === 'production' ? 3000 : 8080;
app.listen(3000, () => console.log(`listening on port ${port}`));
