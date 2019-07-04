const Question = require('./question-model.js');

const resetStarterQs = () => {
  const questions = [];

  // Forcible Entry Questions
  const q1 = {};
  q1.id = 1;
  q1.position = 'Forcible Entry';
  q1.buildingType = 'Taxpayer';
  q1.fireType = 'Store Fire';
  q1.question = 'What tools do you bring?';
  q1.options = [
    'Can, Hook',
    'Halligan Hook, Halligan, Portable Ladder, Saw',
    'Axe, Halligan, FE Saw, Search Rope',
  ];
  q1.answerIndex = 2;
  q1.explanation = 'Here is an explanation of the answer and/or further resources';
  q1.createdAt = Date.now();
  q1.updatedAt = Date.now();
  questions.push(q1);

  const q2 = {};
  q2.id = 2;
  q2.position = 'Forcible Entry';
  q2.buildingType = 'Taxpayer';
  q2.fireType = 'Store Fire';
  q2.question = 'Where do you go?';
  q2.options = [
    'Force entry',
    'Check rear for access',
    'To roof via portable ladder',
    'To aerial ladder or tower ladder',
    'To adjacent store entrances',
  ];
  q2.answerIndex = 0;
  q2.explanation = 'Here is an explanation of the answer and/or further resources';
  q2.createdAt = Date.now();
  q2.updatedAt = Date.now();
  questions.push(q2);

  const q3 = {};
  q3.id = 3;
  q3.position = 'Forcible Entry';
  q3.buildingType = 'Taxpayer';
  q3.fireType = 'Store Fire';
  q3.question = 'What do you do?';
  q3.options = [
    'Search store and locate fire',
    'Immediately vent store at the front',
    'Open up floors, ceilings, and partitions',
  ];
  q3.answerIndex = 0;
  q3.explanation = 'Force entry\nSearch store\nLocate fire\nControl life hazard\nHelp facilitate line advance\nCheck cellar for fire\nShut down utilities...';
  q3.createdAt = Date.now();
  q3.updatedAt = Date.now();
  questions.push(q3);

  // Can Questions
  const q4 = {};
  q4.id = 4;
  q4.position = 'Can';
  q4.buildingType = 'Taxpayer';
  q4.fireType = 'Store Fire';
  q4.question = 'What tools do you bring?';
  q4.options = [
    'Axe, Halligan, Search Rope',
    'Can, Hook',
    'Maul, Halligan',
  ];
  q4.answerIndex = 1;
  q4.explanation = 'Here is an explanation of the answer and/or further resources';
  q4.createdAt = Date.now();
  q4.updatedAt = Date.now();
  questions.push(q4);

  const q5 = {};
  q5.id = 5;
  q5.position = 'Can';
  q5.buildingType = 'Taxpayer';
  q5.fireType = 'Store Fire';
  q5.question = 'Where do you go?';
  q5.options = [
    'To adjacent store entrances',
    'Check rear for access',
    'To roof via portable ladder',
    'Assist with forcible entry',
    'To aerial ladder or tower ladder',
  ];
  q5.answerIndex = 3;
  q5.explanation = 'Here is an explanation of the answer and/or further resources';
  q5.createdAt = Date.now();
  q5.updatedAt = Date.now();
  questions.push(q5);

  const q6 = {};
  q6.id = 6;
  q6.position = 'Can';
  q6.buildingType = 'Taxpayer';
  q6.fireType = 'Store Fire';
  q6.question = 'What do you do?';
  q6.options = [
    'Search store and locate fire',
    'Immediately vent store at the front',
    'Assist with forcible entry',
  ];
  q6.answerIndex = 2;
  q6.explanation = 'Assist with forcible entry\nSearch store\nProbe ceiling with hook for fire or construction...';
  q6.createdAt = Date.now();
  q6.updatedAt = Date.now();
  questions.push(q6);

  refreshDB(questions);
};

function refreshDB(questions) {
  Question.deleteMany({}, (err, res) => {
    console.log('response from refreshDB: ', err, res);
    // TODO: Use Model.bulkWrite instead of Model.create
    Question.create(questions, (err) => {
      if (err) console.log('mongoose create', err);
    });
  });
}

module.exports = resetStarterQs;
