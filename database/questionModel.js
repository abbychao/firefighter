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
  scenario: { type: String, required: true },
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

const scenarioSchema = new Schema({
  name: { type: String, required: true },
  first: { type: String, required: true },
  last: { type: String, required: true },
});

const Scenario = mongoose.model('Scenario', scenarioSchema);

// TODO: Error handling
async function createQuestion(data) {
  if (!Object.prototype.hasOwnProperty.call(data, 'scenario')) throw new Error();
  const { scenario } = data;
  try {
    const newQuestion = await Question.create({ ...data, nextQuestionId: null });
    const newQuestionId = newQuestion._id;

    // Update the Scenario's last and prior Question's next, or create a new Scenario
    const [scenarioObj] = await Scenario.find({ name: scenario });
    if (scenarioObj === undefined) {
      await Scenario.create({ name: scenario, first: newQuestionId, last: newQuestionId });
    } else {
      await Question.updateOne({ _id: scenarioObj.last }, { nextQuestionId: newQuestionId });
      await Scenario.updateOne({ _id: scenarioObj._id }, { last: newQuestionId });
    }
  } catch (error) {
    console.log(error);
  }
}

async function getQuestionsByScenario(scenario) {
  try {
    const [scenarioObj] = await Scenario.find({ name: scenario });
    const questions = await Question.find({ scenario });
    const sortedQuestions = [];
    const questionDict = {};
    questions.forEach(question => {
      questionDict[question._id] = question;
    });
    let currentId = scenarioObj.first;
    sortedQuestions.push(questionDict[currentId]);
    while (scenarioObj.last !== currentId) {
      currentId = questionDict[currentId].nextQuestionId;
      sortedQuestions.push(questionDict[currentId]);
    }
    return sortedQuestions;
  } catch (error) {
    console.log(error);
  }
}

async function deleteQuestion(id) {
  try {
    // Find the prior question within the scenario order
    const [currentQuestion] = await Question.find({ _id: id });
    const questions = await Question.find({ scenario: currentQuestion.scenario });
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

module.exports = {
  Question,
  Scenario,
  createQuestion,
  deleteQuestion,
  getQuestionsByScenario,
};
