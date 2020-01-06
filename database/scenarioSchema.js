const { Schema } = require('mongoose');

const scenarioSchema = new Schema({
  building: { type: String, required: true },
  buildingDetails: String,
  position: { type: String, required: true },
  due: { type: String, required: true },
  first: String,
  last: String,
});

module.exports = scenarioSchema;
