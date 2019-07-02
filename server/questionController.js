const Question = require('../database/question-model.js');

const questionController = {};

questionController.test = 'test';

questionController.getAll = (req, res) => {
  Question.find({}, (err, docs) => {
    if (err) return res.status(404).end(err);
    return res.status(200).send(docs);
  });
};

questionController.func = (req, res, next) => {
  console.log('function in question controller');
  next();
};


console.log('question controller from questionController.js: ' + JSON.stringify(questionController));

module.exports = questionController;
