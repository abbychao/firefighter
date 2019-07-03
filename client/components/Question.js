import React from 'react';
import QuestionOption from './QuestionOption'

const Question = ({ question, options, handleClick, saveAnswer }) => {
  const contents = [];
  let index = 0;
  options.map((option) => {
    contents.push(<QuestionOption name="answer" text={option} index={index} saveAnswer={saveAnswer} />);
    contents.push(<br />);
    index += 1;
  });
  return (
    <form>
      {question}
      <br />
      <br />
      {contents}
      <br />
      <button name="submitAnswer" handleClick={handleClick}>Submit</button>
    </form>
  );
}

export default Question;