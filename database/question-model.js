const mongoose = require('mongoose');

const { Schema } = mongoose;
const uri = process.env.NODE_ENV === 'production'
  ? `mongodb+srv://admin:${process.env.DB_PASS}@cluster0-53vfg.mongodb.net/production`
  : 'mongodb://localhost/mongo';

mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

mongoose.connection.once('open', () => {
  console.log('connected to MongoDB');
});

const questionSchema = new Schema({
  // id: { type: Number, unique: true, required: true },
  position: { type: String, required: true },
  // buildingType: { type: String, required: true },
  // fireType: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: Object, required: true },
  answerIndex: { type: Number, required: true },
  questionImage: String,
  answerImage: String,
  explanation: { type: String, required: true },
  nextQuestionId: String,
  createdAt: Date,
  updatedAt: Date,
});

const Question = mongoose.model('Question', questionSchema);

// createQuestion adds a new question to the database, and also adds the question as
// the "next question" from the last question of that position
// TODO: Error handling
async function createQuestion(data) {
  if (!Object.prototype.hasOwnProperty.call(data, 'position')) throw new Error();
  try {
    const questions = await Question.find({ position: data.position });
    const lastQuestion = questions[questions.length - 1];
    const lastQuestionId = lastQuestion._id;
    const newQuestion = await Question.create(data);
    const newQuestionId = newQuestion._id;
    const updatedQuestion = await Question.updateOne({ _id: lastQuestionId }, { nextQuestionId: newQuestionId });
  } catch (error) {
    console.log(error);
  }
}

function getFirstQuestion() { }

function updateQuestion() { }

function deleteQuestion() { }

function getNextQuestion() { }

module.exports = { Question, createQuestion };
