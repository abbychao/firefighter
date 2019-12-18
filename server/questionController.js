const questionModel = require('../database/questionModel.js');

const { Question, createQuestion, deleteQuestion, getQuestionsByScenario } = questionModel;

const questionController = {};

questionController.getAll = (req, res) => {
  Question.find({}, (err, docs) => {
    if (err) return res.status(500).end(err);
    return res.status(200).send(docs);
  });
};

questionController.getById = (req, res) => {
  const { id } = req.params;
  Question.find({ _id: id }, (err, docs) => {
    if (err) return res.status(500).end(err);
    return res.status(200).send(docs);
  });
};

async function getByScenario(req, res) {
  const { scenario } = req.params;
  const questions = await getQuestionsByScenario(scenario);
  return res.status(200).send(questions);
};

questionController.getByScenario = getByScenario;

questionController.getAllScenarios = (req, res) => {
  Question.find({}, (err, docs) => {
    if (err) return res.status(500).end(err);
    const scenarios = new Set();
    docs.forEach((question) => {
      scenarios.add(question.scenario);
    });
    return res.status(200).send(Array.from(scenarios));
  });
};

questionController.updateById = (req, res) => {
  const { id } = req.params;
  const {
    scenario,
    question,
    options,
    answerIndex,
    questionImage,
    answerImage,
    explanation,
  } = req.body;
  const data = {
    scenario,
    question,
    options,
    answerIndex,
    questionImage,
    answerImage,
    explanation,
  };
  Question.updateOne({ _id: id }, data, (err, response) => {
    if (err) return res.status(500).end(err);
    return res.status(200).send(response);
  });
};

questionController.create = (req, res) => {
  const {
    scenario,
    question,
    options,
    answerIndex,
    questionImage,
    answerImage,
    explanation,
  } = req.body;
  const data = {
    scenario,
    question,
    options,
    answerIndex,
    questionImage,
    answerImage,
    explanation,
  };
  Question.create(data, (err, response) => {
    if (err) return res.status(500).end(err);
    return res.status(200).send();
  });
};

questionController.deleteById = (req, res) => {
  Question.deleteOne({ _id: req.params.id }, (err, response) => {
    if (err) return res.status(500).end(err);
    return res.status(200).send(response);
  });
};

module.exports = questionController;
