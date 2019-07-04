const Question = require('../database/question-model.js');

const questionController = {};

questionController.getAll = (req, res) => {
  Question.find({}, (err, docs) => {
    if (err) return res.status(500).end(err);
    return res.status(200).send(docs);
  });
};

questionController.getFirst = (req, res) => {
  Question.findOne({ id: 1 }, (err, doc) => {
    if (err) return res.status(500).end(err);
    return res.status(200).send(JSON.stringify(doc));
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

module.exports = questionController;
