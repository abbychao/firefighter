const { Schema } = require('mongoose');

const questionSchema = new Schema({
  // id: { type: Number, unique: true, required: true },
  scenario: { type: String, required: true },
  // buildingType: { type: String, required: true },
  // fireType: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: Object, required: true },
  answerIndex: { type: Number, required: true },
  questionImage: String,
  answerImage: String,
  explanation: { type: String, required: true },
  nextQuestionId: String,
  createdAt: Date,
  updatedAt: Date,
});

module.exports = questionSchema;
