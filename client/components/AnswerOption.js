import React from 'react';

const AnswerOption = ({ text }) => {
  return (
    <label>
      <input type="radio" /> {text}
    </label>
  )
}

export default AnswerOption;