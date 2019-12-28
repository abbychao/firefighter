const QuestionModel = require('../database/questionModel.js');
const Model = require('../database/model.js');

const questionController = {};

questionController.getAll = async (req, res) => {
  const questions = await QuestionModel.getAll();
  return res.status(200).send(questions);
};

questionController.getById = async (req, res) => {
  const { id } = req.params;
  const question = await QuestionModel.getById(id);
  return res.status(200).send(question);
};

questionController.getByScenario = async (req, res) => {
  const { scenarioId } = req.params;
  const questions = await Model.getQuestionsByScenario(scenarioId);
  return res.status(200).send(questions);
};

questionController.updateById = async (req, res) => {
  const { id } = req.params;
  const {
    scenarioId,
    question,
    options,
    answerIndex,
    questionImage,
    answerImage,
    explanation,
  } = req.body;
  const data = {
    scenarioId,
    question,
    options,
    answerIndex,
    questionImage,
    answerImage,
    explanation,
  };
  await Model.updateQuestionById(id, data);
  return res.status(200).send();
};

questionController.create = async (req, res) => {
  const {
    scenarioId,
    question,
    options,
    answerIndex,
    questionImage,
    answerImage,
    explanation,
  } = req.body;
  const data = {
    question,
    options,
    answerIndex,
    questionImage,
    answerImage,
    explanation,
  };
  await Model.addQuestion(scenarioId, data);
  return res.status(200).send();
};

questionController.deleteById = async (req, res) => {
  const { id } = req.params;
  await Model.deleteQuestionById(id);
  return res.status(200).send();
};

module.exports = questionController;
