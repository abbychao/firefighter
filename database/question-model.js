const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/mongo', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected to MongoDB');
});

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
