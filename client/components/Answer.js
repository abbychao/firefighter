import React, { useContext } from 'react';
import MyContext from './Context';

const Answer = () => {
  const context = useContext(MyContext);
  let header;
  let body;
  if (context.lastQuestionCorrect) {
    header = 'Yes, absolutely right!';
  } else {
    header = 'Sorry, not quite.';
  }
  body = `Here's why: ${context.questions[context.questionIndex].explanation}`
  return (
    <>
      <h1>{header}</h1>
      <p>{body}</p>
      <button onClick={context.showNextQuestion} name="nextButton">Next question</button>
    </>
  );
}

export default Answer;
