const QuestionModel = require('./questionModel.js');
const ScenarioModel = require('./scenarioModel');

const Model = {};

Model.createScenario = ScenarioModel.create;
Model.addQuestion = async (scenarioId, questionData) => {
  try {
    const newQuestionId = await QuestionModel.createQuestion({ scenarioId, ...questionData });
    const scenario = await ScenarioModel.getById(scenarioId);
    if (scenario.first === undefined) {
      await ScenarioModel.updateFirst(scenarioId, newQuestionId);
    } else {
      await QuestionModel.updateNextQuestionId(scenario.last, newQuestionId);
    }
    await ScenarioModel.updateLast(scenarioId, newQuestionId);
  } catch (error) {
    console.log('Model.addQuestion', error);
  }
};
Model.updateQuestionById = async (id, data) => {
  const oldQuestion = await QuestionModel.getById(id);
  if (oldQuestion.scenarioId === data.scenarioId) {
    return QuestionModel.updateById(id, data);
  }
  await Model.addQuestion(data.scenarioId, data);
  await Model.deleteQuestionById(id);
};

Model.deleteQuestionById = async (id) => {
  const question = await QuestionModel.getById(id);
  const { scenarioId } = question;
  const scenario = await ScenarioModel.getById(scenarioId);
  let previousId = scenario.first;
  let previousQuestion = await QuestionModel.getById(previousId);
  while (previousQuestion.nextQuestionId && previousQuestion.nextQuestionId !== id) {
    previousId = previousQuestion.nextQuestionId;
    previousQuestion = await QuestionModel.getById(previousId);
  }
  if (scenario.first === id) await ScenarioModel.updateFirst(scenarioId, question.nextQuestionId);
  if (scenario.last === id) await ScenarioModel.updateLast(scenarioId, previousId);
  await QuestionModel.updateNextQuestionId(previousId, question.nextQuestionId);
  return QuestionModel.deleteById(id);
};

module.exports = Model;
