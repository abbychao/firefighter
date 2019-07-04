import React from 'react';
import QuestionOption from './QuestionOption';
import MyContext from './Context';

const Question = () => {
  return (
    <MyContext.Consumer>
      {(context) => {
        const contents = [];
        let index = 0;
        context.questions[context.questionIndex].options.map((option) => {
          contents.push(<QuestionOption text={option} index={index} />);
          contents.push(<br />);
        });
        return (
          <form>
            {context.questions[context.questionIndex].question}
            <br />
            <br />
            {contents}
            <br />
            <button name="submitAnswer" type="button" onClick={context.handleClick}>Submit</button>
          </form >
        )
      }}
    </MyContext.Consumer>
  );
}

export default Question;