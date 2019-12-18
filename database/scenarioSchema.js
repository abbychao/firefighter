const { Schema } = require('mongoose');

const scenarioSchema = new Schema({
  name: { type: String, required: true },
  first: { type: String, required: true },
  last: { type: String, required: true },
});

module.exports = scenarioSchema;
