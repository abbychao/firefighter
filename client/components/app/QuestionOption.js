import React, { useContext } from 'react';
import AppContext from './Context';

const QuestionOption = ({ text, index }) => {
  const context = useContext(AppContext);
  return (
    <label>
      <input type="radio" name="option" onClick={() => context.saveAnswer(index)} /> {text}
    </label>
  )
}

export default QuestionOption;