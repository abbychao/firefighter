import React, { useContext } from 'react';
import QuestionOption from './QuestionOption';
import AppContext from './Context';

const Question = () => {
  const context = useContext(AppContext);
  const questionOptions = [];
  let index = 0;
  context.questions[context.questionIndex].options.map((option) => {
    questionOptions.push(<QuestionOption text={option} index={index} key={`question-${index}`} />);
    questionOptions.push(<br />);
    index += 1;
  });
  return (
    <>
      <img src={context.questions[context.questionIndex].questionImage} />
      <br />
      {context.questions[context.questionIndex].question}
      <br />
      <br />
      {questionOptions}
      <br />
      <button name="submitAnswer" type="button" onClick={context.submitAnswer}>Submit</button>
    </ >
  );
}

export default Question;