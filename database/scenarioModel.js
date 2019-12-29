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

module.exports = ScenarioModel;
