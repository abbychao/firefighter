const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/mongo');

const questionSchema = new Schema({
  position: String,
  building_type: String,
  fireType: String,
  question: String,
  options: Object,
  explanation: String,
  createdAt: Date,
  updatedAt: Date,
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
