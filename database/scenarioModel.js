const { Scenario, Question } = require('./database.js');

const ScenarioModel = {};

ScenarioModel.create = async (data) => {
  try {
    const response = await Scenario.create(data);
    const scenarioId = response._id;
    return scenarioId;
  } catch (error) {
    console.log('ScenarioModel.createScenario', error);
  }
};

ScenarioModel.getAll = async () => Scenario.find({});

ScenarioModel.getById = async (id) => {
  const [scenario] = await Scenario.find({ _id: id });
  return scenario;
};

ScenarioModel.updateFirst = async (scenarioId, questionId) => (
  Scenario.updateOne({ _id: scenarioId }, { first: questionId })
);

ScenarioModel.updateLast = async (scenarioId, questionId) => (
  Scenario.updateOne({ _id: scenarioId }, { last: questionId })
);

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
};

module.exports = ScenarioModel;
