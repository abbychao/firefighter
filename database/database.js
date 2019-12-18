const mongoose = require('mongoose');
const questionSchema = require('./questionSchema.js');
const scenarioSchema = require('./scenarioSchema.js');

const uri = process.env.NODE_ENV === 'production'
  ? `mongodb+srv://admin:${process.env.DB_PASS}@cluster0-53vfg.mongodb.net/production`
  : 'mongodb://localhost/mongo';

mongoose.connect(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

mongoose.connection.once('open', () => {
  console.log('connected to MongoDB');
});

const Question = mongoose.model('Question', questionSchema);
const Scenario = mongoose.model('Scenario', scenarioSchema);


module.exports = { Question, Scenario };
