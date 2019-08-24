require('dotenv').config();
const express = require('express');
const path = require('path');
const questionController = require('./questionController.js');
// const resetQs = require('../database/generate-qs.js');
// resetQs();

const app = express();
app.use('/public', express.static('public', { index: false }));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/admin', (req, res) => {
  res.status(200).send('hello');
});

app.get('/api/questions/all', questionController.getAll);

app.get('/api/questions/first', questionController.getFirst);

app.get('/api/questions/position/:positionCode', questionController.getByPosition);

app.get('/api/questions/id/:id', questionController.getById);

// If deployed to cloud, use that port; otherwise display 3000 for local and 8080 for dev server
const port = process.env.NODE_ENV === 'production' ? 3000 : 8080;
app.listen(process.env.PORT || 3000, '0.0.0.0', () => console.log(`listening on port ${port}`));
