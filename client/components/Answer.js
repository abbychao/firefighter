import React from 'react';

const Answer = ({ explanation, lastQuestionCorrect }) => {
  let header;
  let body;
  if (lastQuestionCorrect) {
    header = <h1>Yes, absolutely right!</h1>;
  } else {
    header = <h1>Sorry, not quite.</h1>;
  }
  body = <p>Here's why: {explanation}</p>
  return (
    <div>
      <h1>{header}</h1>
      <p>{body}</p>
    </div>
  );
}

export default Answer;
