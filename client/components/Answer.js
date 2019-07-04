import React from 'react';
import MyContext from './Context';

const Answer = ({ explanation, lastQuestionCorrect, handleClick }) => {
  return (
    <MyContext.Consumer>
      {(context) => {
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
            <button onClick={context.handleClick} name="nextButton">Next question</button>
          </>
        )
      }}
    </MyContext.Consumer>
  );
}

export default Answer;
