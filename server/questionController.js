const Question = require('../database/question-model.js');

const questionController = {};

questionController.getAll = (req, res) => {
  // res.send('this is working, really!');
  Question.find({}, (err, docs) => {
    if (err) return res.status(404).end(err);
    return res.status(200).send(docs);
  });
};

// console.log(questionController.getAll);

module.export = questionController;
