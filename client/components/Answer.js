import React from 'react';

const Answer = ({ explanation, lastQuestionCorrect, handleClick }) => {
  let header;
  let body;
  if (lastQuestionCorrect) {
    header = 'Yes, absolutely right!';
  } else {
    header = 'Sorry, not quite.';
  }
  body = `Here's why: ${explanation}`
  return (
    <div>
      <h1>{header}</h1>
      <p>{body}</p>
      <button onClick={handleClick} name="nextButton">Next question</button>
    </div>
  );
}

export default Answer;
