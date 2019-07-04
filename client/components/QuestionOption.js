import React from 'react';
import MyContext from './Context';

const QuestionOption = ({ text, index }) => {
  return (
    <MyContext.Consumer>
      {(context) => (
        <label>
          <input type="radio" name="option" onClick={() => context.saveAnswer(index)} /> {text}
        </label>
      )}
    </MyContext.Consumer>
  )
}

export default QuestionOption;