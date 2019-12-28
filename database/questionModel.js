const { Question } = require('./database.js');

const QuestionModel = {};

QuestionModel.createQuestion = async (data) => {
  // Ensure that scenarioId is valid; TODO: Verify that it exists in scenario collection
  const response = await Question.create({ ...data, nextQuestionID: null });
  return response._id;
};

QuestionModel.updateNextQuestionId = async (currentId, nextQuestionId) => (
  Question.updateOne({ _id: currentId }, { nextQuestionId })
);

QuestionModel.getAll = async () => Question.find({});

QuestionModel.getById = async (id) => {
  try {
    const [question] = await Question.find({ _id: id });
    return question;
  } catch (error) {
    console.log('QuestionModel.getById', error);
  }
};

QuestionModel.updateById = async (id, data) => Question.updateOne({ _id: id }, { ...data });

QuestionModel.deleteById = async (id) => Question.deleteOne({ _id: id });

module.exports = QuestionModel;
