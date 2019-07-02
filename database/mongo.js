const mongoose = require('mongoose');
const Question = require('./question-model.js');

const generateStarterQs = (num) => {
  const questions = [];
  for (let i = 0; i < num; i += 1) {
    const q = {};
    q.position = 'Forcible Entry';
    q.buildingType = 'Taxpayer';
    q.fireType = 'Cellar Fire';
    q.question = 'What do you bring?';
    q.options = [
      'Axe, Halligan, FE Saw, Search Rope',
      'Axe, Halligan, Search Rope',
      'Axe, Halligan, FE Saw',
    ];
    q.explanation = 'Here is an explanation';
    q.createdAt = Date.now();
    q.updatedAt = Date.now();
    questions.push(q);
  }
  // FUTURE: Use Model.bulkWrite instead of Model.create
  Question.create(questions, (err) => {
    if (err) console.log(err);
  });
};

module.exports = () => {
  generateStarterQs();
};
