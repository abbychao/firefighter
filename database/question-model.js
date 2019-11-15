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

const positionSchema = new Schema({
  name: { type: String, required: true },
  first: { type: String, required: true },
  last: { type: String, required: true },
});

const Position = mongoose.model('Position', positionSchema);

// TODO: Error handling
async function createQuestion(data) {
  if (!Object.prototype.hasOwnProperty.call(data, 'position')) throw new Error();
  const { position } = data;
  try {
    const newQuestion = await Question.create(data);
    const newQuestionId = newQuestion._id;

    // Update the Position's last and prior Question's next, or create a new Position
    const [positionObj] = await Position.find({ name: position });
    if (positionObj._id) {
      await Question.updateOne({ _id: positionObj.last }, { nextQuestionId: newQuestionId })
      await Position.updateOne({ _id: positionObj._id }, { last: newQuestionId });
    } else {
      await Position.create({ name: position, first: newQuestionId, last: newQuestionId });
    }
  } catch (error) {
    console.log(error);
  }
}

// async function getQuestionsByPosition(position) {
//   try {
//     const [positionObj] = await Position.find({ name: position });
//     const questions = await Question.find({ position });
//     const sortedQuestions = [];
//     const questionObj = {};
//     questions.forEach(question => {
//       questionObj[question._id] = question;
//     });
//     let pointer = positionObj.first;
//     sortedQuestions.push(questionObj[pointer]);
//     while (positionObj.last !== pointer) {
//       pointer = positionObj[pointer].next;
//       sortedQuestions.push(questionObj[pointer]);
//     }
//     return sortedQuestions;
//   } catch (error) {
//     console.log(error);
//   }
// }

async function deleteQuestion(id) {
  try {
    // Find the prior question within the position order
    const [currentQuestion] = await Question.find({ _id: id });
    const questions = await Question.find({ position: currentQuestion.position });
    let prevId = null;
    let i = 0;
    while (questions[i]._id.toString() !== id) {
      prevId = questions[i]._id;
      i += 1;
    }
    // Replace prior question's next with current's next, and then delete
    await Question.updateOne({ _id: prevId }, { nextQuestionId: questions[i].nextQuestionId });
    await Question.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
  }
}

module.exports = { Question, createQuestion, deleteQuestion };
