import React from 'react';

const QuestionOption = ({ text, index, saveAnswer }) => {
  return (
    <label>
      <input type="radio" name="option" onClick={() => saveAnswer(index)} /> {text}
    </label>
  )
}

export default QuestionOption;