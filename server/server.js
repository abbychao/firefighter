const express = require('express');
const path = require('path');
const questionController = require('./questionController.js');
// const resetQs = require('../database/generate-qs.js');
// resetQs();

// ? HELP: Noticed that express.static isn't working with a full path – why?

const app = express();
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/admin', (req, res) => {
  res.status(200).send('hello');
});

app.get('/api/questions/all', questionController.getAll);

app.get('/api/questions/first', questionController.getFirst);

app.get('/api/questions/:positionCode', questionController.getByPosition);

// If deployed to cloud, use that port; otherwise display 3000 for local and 8080 for dev server
const port = process.env.PORT || process.env.NODE_ENV === 'production' ? 3000 : 8080;
app.listen(port, () => console.log(`listening on port ${port}`));
