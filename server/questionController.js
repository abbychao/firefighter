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

module.exports = questionController;
