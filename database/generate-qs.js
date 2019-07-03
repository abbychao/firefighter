const Question = require('./question-model.js');

// TODO: Figure out how to delete the collection
const resetStarterQs = (num = 20) => {
  Question.deleteMany({});
  const questions = [];
  for (let i = 0; i < num; i += 1) {
    const q = {};
    q.id = i + 1;
    q.position = 'Forcible Entry';
    q.buildingType = 'Taxpayer';
    q.fireType = 'Cellar Fire';
    q.question = 'What do you bring?';
    q.options = [
      'Axe, Halligan, FE Saw, Search Rope',
      'Axe, Halligan, Search Rope',
      'Axe, Halligan, FE Saw',
    ];
    q.answerIndex = 1;
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

module.exports = resetStarterQs;
