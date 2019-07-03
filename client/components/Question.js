import React from 'react';
import AnswerOption from './AnswerOption'

const Question = ({ question, options }) => {
  const contents = [];
  options.map((option) => {
    contents.push(<AnswerOption name="answer" text={option} />);
    contents.push(<br />);
  });
  // contents.push(<button>Submit</button>)
  return (
    <form>
      {question}
      <br /> <br />
      {contents}
      <br />
      <button>Submit</button>
    </form>
  );
}

export default Question;