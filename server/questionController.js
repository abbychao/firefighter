const Question = require('../database/question-model.js');

const questionController = {};

questionController.getAll = (req, res) => {
  Question.find({}, (err, docs) => {
    if (err) return res.status(500).end(err);
    return res.status(200).send(docs);
  });
};

// questionController.getFirst = (req, res) => {
//   Question.findOne({ id: 1 }, (err, doc) => {
//     if (err) return res.status(500).end(err);
//     return res.status(200).send(JSON.stringify(doc));
//   });
// };

questionController.getById = (req, res) => {
  const { id } = req.params;
  Question.find({ _id: id }, (err, docs) => {
    if (err) return res.status(500).end(err);
    return res.status(200).send(docs);
  });
};

questionController.getByPosition = (req, res) => {
  let position;
  switch (req.params.positionCode) {
    case 'fe':
      position = 'Forcible Entry';
      break;
    case 'can':
      position = 'Can';
      break;
    default:
      position = 'Can';
      break;
  }
  Question.find({ position }, (err, docs) => {
    if (err) return res.status(500).end(err);
    return res.status(200).send(docs);
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
