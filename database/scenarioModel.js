const { Scenario, Question } = require('./database.js');
const QuestionModel = require('./questionModel.js');

const ScenarioModel = {};

ScenarioModel.createScenario = async (data) => {
  try {
    const response = await Scenario.create(data);
    const scenarioId = response._id;
    return scenarioId;
  } catch (error) {
    console.log('ScenarioModel.createScenario', error);
  }
};

ScenarioModel.addQuestion = async (scenarioId, questionData) => {
  try {
    const newQuestionId = await QuestionModel.createQuestion({ scenarioId, ...questionData });
    const scenarioObj = await Scenario.find({ _id: scenarioId });
    if (scenarioObj.first === undefined) {
      scenarioObj.first = newQuestionId;
    } else {
      QuestionModel.updateNextQuestionId(scenarioObj.last, newQuestionId);
    }
    scenarioObj.last = newQuestionId;
    await Scenario.updateOne({ _id: scenarioId }, { ...scenarioObj });
  } catch (error) {
    console.log('ScenarioModel.addQuestion', error);
  }
};

ScenarioModel.getQuestionsByScenario = async (scenarioId) => {
  try {
    const [scenarioObj] = await Scenario.find({ _id: scenarioId });
    const questions = await Question.find({ scenarioId });
    const sortedQuestions = [];
    const questionDict = {};
    questions.forEach((question) => {
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

module.exports = ScenarioModel;
