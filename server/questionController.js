const QuestionModel = require('../database/questionModel.js');

const { Question, createQuestion, deleteQuestion, getQuestionsByPosition } = QuestionModel;

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

async function getByPosition(req, res) {
  const { position } = req.params;
  const questions = await getQuestionsByPosition(position);
  return res.status(200).send(questions);
};

questionController.getByPosition = getByPosition;

questionController.getAllPositions = (req, res) => {
  Question.find({}, (err, docs) => {
    if (err) return res.status(500).end(err);
    const positions = new Set();
    docs.forEach((question) => {
      positions.add(question.position);
    });
    return res.status(200).send(Array.from(positions));
  });
};

questionController.updateById = (req, res) => {
  const { id } = req.params;
  const {
    position,
    buildingType,
    fireType,
    question,
    options,
    answerIndex,
    questionImage,
    answerImage,
    explanation,
  } = req.body;
  const data = {
    position,
    buildingType,
    fireType,
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

// TODO: Error handling
questionController.create = (req, res) => {
  const {
    position,
    buildingType,
    fireType,
    question,
    options,
    answerIndex,
    questionImage,
    answerImage,
    explanation,
  } = req.body;
  const data = {
    position,
    buildingType,
    fireType,
    question,
    options,
    answerIndex,
    questionImage,
    answerImage,
    explanation,
    nextQuestionId: null,
  };
  createQuestion(data);
  return res.status(200).send();
};

// TODO: Error handling
questionController.deleteById = (req, res) => {
  deleteQuestion(req.params.id);
  return res.status(200).send();
}

module.exports = questionController;
