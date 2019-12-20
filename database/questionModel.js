const { Question, Scenario } = require('./database.js');

const QuestionModel = {};

QuestionModel.createQuestion = async (data) => {
  // Ensure that scenarioId is valid; TODO: Verify that it exists in scenario collection
  const response = await Question.create({ ...data, nextQuestionID: null });
  return response._id;
};

QuestionModel.updateNextQuestionId = async (currentId, newQuestionId) => {
  Question.updateOne({ _id: currentId }, { newQuestionId });
};

async function getQuestionsByScenario(scenario) {
  try {
    const [scenarioObj] = await Scenario.find({ name: scenario });
    const questions = await Question.find({ scenario });
    const sortedQuestions = [];
    const questionDict = {};
    questions.forEach(question => {
      questionDict[question._id] = question;
    });
    let currentId = scenarioObj.first;
    sortedQuestions.push(questionDict[currentId]);
    while (scenarioObj.last !== currentId) {
      currentId = questionDict[currentId].nextQuestionId;
      sortedQuestions.push(questionDict[currentId]);
    }
    return sortedQuestions;
  } catch (error) {
    console.log(error);
  }
}

// async function deleteQuestion(id) {
//   try {
//     // Find the prior question within the scenario order
//     const [currentQuestion] = await Question.find({ _id: id });
//     const questions = await Question.find({ scenario: currentQuestion.scenario });
//     let prevId = null;
//     let i = 0;
//     while (questions[i]._id.toString() !== id) {
//       prevId = questions[i]._id;
//       i += 1;
//     }
//     // Replace prior question's next with current's next, and then delete
//     await Question.updateOne({ _id: prevId }, { nextQuestionId: questions[i].nextQuestionId });
//     await Question.deleteOne({ _id: id });
//   } catch (error) {
//     console.log(error);
//   }
// }

module.exports = QuestionModel;

// module.exports = {
//   Question,
//   Scenario,
//   getQuestionsByScenario,
// };
