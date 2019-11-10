const mongoose = require('mongoose');

const { Schema } = mongoose;
const uri = process.env.NODE_ENV === 'production'
  ? `mongodb+srv://admin:${process.env.DB_PASS}@cluster0-53vfg.mongodb.net/production`
  : 'mongodb://localhost/mongo';

mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  // useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
  console.log('connected to MongoDB');
});

const questionSchema = new Schema({
  // id: { type: Number, unique: true, required: true },
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
