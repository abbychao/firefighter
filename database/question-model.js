const mongoose = require('mongoose');
const dbPassword = 'XsOrxN28qWBvEFGK'; // TODO: Move credentials

const Schema = mongoose.Schema;
mongoose.connect(`mongodb+srv://admin:${dbPassword}@cluster0-53vfg.mongodb.net/production`, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected to MongoDB');
});

const questionSchema = new Schema({
  id: { type: Number, unique: true, required: true },
  position: { type: String, required: true },
  buildingType: { type: String, required: true },
  fireType: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: Object, required: true },
  answerIndex: { type: Number, required: true },
  questionImage: String,
  answerImage: String,
  explanation: { type: String, required: true },
  createdAt: Date,
  updatedAt: Date,
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
