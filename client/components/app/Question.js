import React, { useContext } from 'react';
import QuestionOption from './QuestionOption';
import AppContext from './Context';

const Question = () => {
  const { questions, questionIndex, submitAnswer } = useContext(AppContext);
  const questionOptions = [];
  let index = 0;
  questions[questionIndex].options.forEach((option) => {
    questionOptions.push(<QuestionOption text={option} index={index} key={`question-${index}`} />);
    questionOptions.push(<br key={`break-${index}`} />);
    index += 1;
  });
  return (
    <>
      <img src={questions[questionIndex].questionImage} />
      <br />
      {questions[questionIndex].question}
      <br />
      <br />
      {questionOptions}
      <br />
      <button name="submitAnswer" type="button" onClick={submitAnswer}>Submit</button>
    </ >
  );
}

export default Question;