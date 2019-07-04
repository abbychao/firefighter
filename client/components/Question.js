import React, { useContext } from 'react';
import QuestionOption from './QuestionOption';
import MyContext from './Context';

const Question = () => {
  const context = useContext(MyContext);
  const contents = [];
  let index = 0;
  context.questions[context.questionIndex].options.map((option) => {
    contents.push(<QuestionOption text={option} index={index} />);
    contents.push(<br />);
    index += 1;
  });
  return (
    <form>
      {context.questions[context.questionIndex].question}
      <br />
      <br />
      {contents}
      <br />
      <button name="submitAnswer" type="button" onClick={context.submitAnswer}>Submit</button>
    </form >
  );
}

export default Question;