require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const questionController = require('./questionController.js');
const scenarioController = require('./scenarioController.js');
const resetQs = require('../database/generateQs.js');

if (process.env.NODE_ENV !== 'production') resetQs();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static('public', { index: false }));

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.get('/api/questions/all', questionController.getAll);
app.post('/api/questions', questionController.create);
app.get('/api/questions/id/:id', questionController.getById);
app.put('/api/questions/id/:id', questionController.updateById);
app.delete('/api/questions/id/:id', questionController.deleteById);
app.get('/api/questions/s/:scenarioId', questionController.getByScenario);

app.get('/api/scenarios/all', scenarioController.getAll);
app.post('/api/scenarios', scenarioController.create);
app.get('/api/scenarios/id/:id', scenarioController.getById);

// If deployed to cloud, use that port; otherwise display 3000 for local and 8080 for dev server
const port = process.env.NODE_ENV === 'production' ? 3000 : 8080;
app.listen(process.env.PORT || 3000, '0.0.0.0', () => console.log(`listening on port ${port}`));
