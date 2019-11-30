const Question = require('./question-model.js');

// To enter Mongo shell: mongo --shell

const resetStarterQs = () => {
  const questions = [];

  // Forcible Entry Questions
  const q1 = {};
  q1.scenario = 'Forcible Entry – Store Fire – Taxpayer';
  q1.question = 'What tools do you bring?';
  q1.options = [
    'Can, Hook',
    'Halligan Hook, Halligan, Portable Ladder, Saw',
    'Axe, Halligan, FE Saw, Search Rope',
  ];
  q1.answerIndex = 2;
  q1.questionImage = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Large_bonfire.jpg';
  q1.answerImage = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Large_bonfire.jpg';
  q1.explanation = 'Here is an explanation of the answer and/or further resources';
  q1.createdAt = Date.now();
  q1.updatedAt = Date.now();
  questions.push(q1);

  const q2 = {};
  q2.scenario = 'Forcible Entry – Store Fire – Taxpayer';
  q2.question = 'Where do you go?';
  q2.options = [
    'Force entry',
    'Check rear for access',
    'To roof via portable ladder',
    'To aerial ladder or tower ladder',
    'To adjacent store entrances',
  ];
  q2.answerIndex = 0;
  q2.questionImage = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Large_bonfire.jpg';
  q2.answerImage = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Large_bonfire.jpg';
  q2.explanation = 'Here is an explanation of the answer and/or further resources';
  q2.createdAt = Date.now();
  q2.updatedAt = Date.now();
  questions.push(q2);

  const q3 = {};
  q3.scenario = 'Forcible Entry – Store Fire – Taxpayer';
  q3.question = 'What do you do?';
  q3.options = [
    'Search store and locate fire',
    'Immediately vent store at the front',
    'Open up floors, ceilings, and partitions',
  ];
  q3.answerIndex = 0;
  q3.questionImage = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Large_bonfire.jpg';
  q3.answerImage = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Large_bonfire.jpg';
  q3.explanation = 'Force entry\nSearch store\nLocate fire\nControl life hazard\nHelp facilitate line advance\nCheck cellar for fire\nShut down utilities...';
  q3.createdAt = Date.now();
  q3.updatedAt = Date.now();
  questions.push(q3);

  // Can Questions
  const q4 = {};
  q4.scenario = 'Can - Store Fire – Taxpayer';
  q4.question = 'What tools do you bring?';
  q4.options = [
    'Axe, Halligan, Search Rope',
    'Can, Hook',
    'Maul, Halligan',
  ];
  q4.answerIndex = 1;
  q4.questionImage = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Large_bonfire.jpg';
  q4.answerImage = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Large_bonfire.jpg';
  q4.explanation = 'Here is an explanation of the answer and/or further resources';
  q4.createdAt = Date.now();
  q4.updatedAt = Date.now();
  questions.push(q4);

  const q5 = {};
  q5.scenario = 'Can - Store Fire – Taxpayer';
  q5.question = 'Where do you go?';
  q5.options = [
    'To adjacent store entrances',
    'Check rear for access',
    'To roof via portable ladder',
    'Assist with forcible entry',
    'To aerial ladder or tower ladder',
  ];
  q5.answerIndex = 3;
  q5.questionImage = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Large_bonfire.jpg';
  q5.answerImage = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Large_bonfire.jpg';
  q5.explanation = 'Here is an explanation of the answer and/or further resources';
  q5.createdAt = Date.now();
  q5.updatedAt = Date.now();
  questions.push(q5);

  const q6 = {};
  q6.scenario = 'Can - Store Fire – Taxpayer';
  q6.question = 'What do you do?';
  q6.options = [
    'Search store and locate fire',
    'Immediately vent store at the front',
    'Assist with forcible entry',
  ];
  q6.answerIndex = 2;
  q6.questionImage = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Large_bonfire.jpg';
  q6.answerImage = 'https://upload.wikimedia.org/wikipedia/commons/3/36/Large_bonfire.jpg';
  q6.explanation = 'Assist with forcible entry\nSearch store\nProbe ceiling with hook for fire or construction...';
  q6.createdAt = Date.now();
  q6.updatedAt = Date.now();
  questions.push(q6);

  refreshDB(questions);
};

function refreshDB(questions) {
  Question.deleteMany({}, (err, res) => {
    console.log('refreshed database: ', err ? err : res);
    // TODO: Use Model.bulkWrite instead of Model.create
    Question.create(questions, (err) => {
      if (err) console.log('mongoose create', err);
    });
  });
  await QuestionModel.Scenario.deleteMany({}, (err, res) => {
    console.log('refreshed scenarios: ', err || res);
  });
  for (let i = 0; i < questions.length; i += 1) {
    await QuestionModel.createQuestion(questions[i]);
  }
}

module.exports = resetStarterQs;
