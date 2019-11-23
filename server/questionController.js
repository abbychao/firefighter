const Question = require('../database/question-model.js');

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

questionController.getByPosition = (req, res) => {
  const { position } = req.params;
  Question.find({ position }, (err, docs) => {
    if (err) return res.status(500).end(err);
    return res.status(200).send(docs);
  });
};

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
