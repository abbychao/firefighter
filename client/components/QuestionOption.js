import React, { useContext } from 'react';
import MyContext from './Context';

const QuestionOption = ({ text, index }) => {
  const context = useContext(MyContext);
  return (
    <label>
      <input type="radio" name="option" onClick={() => context.saveAnswer(index)} /> {text}
    </label>
  )
}

export default QuestionOption;