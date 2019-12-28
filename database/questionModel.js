const { Question } = require('./database.js');

const QuestionModel = {};

QuestionModel.createQuestion = async (data) => {
  // Ensure that scenarioId is valid; TODO: Verify that it exists in scenario collection
  const response = await Question.create({ ...data, nextQuestionID: null });
  return response._id;
};

QuestionModel.updateNextQuestionId = async (currentId, nextQuestionId) => {
  return Question.updateOne({ _id: currentId }, { nextQuestionId });
};

module.exports = QuestionModel;
