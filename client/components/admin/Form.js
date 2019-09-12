/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import AdminContext from './Context';

const StyledForm = styled.div`
  label {
    display: block;
  }
  img {
    width: 100%;
  }
  textarea {
    width: 100%;
  }
`;

const Form = () => {
  function handleSave() {
    // TODO: Grab all information from the form and submit to DB
  }

  const context = useContext(AdminContext);
  const { currentQ } = context;

  // Other fields (ignored): createdAt, updatedAt, id, _id, __v
  const [position, setPosition] = useState(currentQ.position);
  const [buildingType, setBuildingType] = useState(currentQ.buildingType);
  const [fireType, setFireType] = useState(currentQ.fireType);
  const [question, setQuestion] = useState(currentQ.question);
  const [options, setOptions] = useState(currentQ.options);
  const [answerIndex, setAnswerIndex] = useState(currentQ.answerIndex);
  const [questionImage, setQuestionImage] = useState(currentQ.questionImage);
  const [answerImage, setAnswerImage] = useState(currentQ.answerImage);
  const [explanation, setExplanation] = useState(currentQ.explanation);


  const optionsHTML = [];
  const handleOptionUpdate = (e, idx) => {
    const optionsCopy = options.slice();
    optionsCopy[idx] = e.target.value;
    setOptions(optionsCopy);
  }
  options.forEach((item, idx) => {
    optionsHTML.push(
      <li key={`option${idx}`}>
        <input value={item} onChange={(e) => handleOptionUpdate(e, idx)} />
        {answerIndex === idx && <button type="button" disabled>ANSWER</button>}
        {answerIndex !== idx && <button type="button" onClick={() => setAnswerIndex(idx)}>Select</button>}
      </li>
    );
  });

  return (
    <StyledForm>
      <label>
        Position:
        <input value={position} onChange={(e) => setPosition(e.target.value)} />
      </label>
      <label>
        Building Type:
        <input value={buildingType} onChange={(e) => setBuildingType(e.target.value)} />
      </label>
      <label>
        Fire Type:
        <input value={fireType} onChange={(e) => setFireType(e.target.value)} />
      </label>
      <label>
        Question:
        <input value={question} onChange={(e) => setQuestion(e.target.value)} />
      </label>
      <label>
        Options:
        {optionsHTML}
      </label>
      <label>
        Question Image URL:
        <input value={questionImage} onChange={(e) => setQuestionImage(e.target.value)} />
      </label>
      <label>
        Question Image Preview:
        <img src={questionImage} alt="question" />
      </label>
      <label>
        Explanation Image
        <input value={answerImage} onChange={(e) => setAnswerImage(e.target.value)} />
      </label>
      <label>
        Explanation Image Preview:
        <img src={answerImage} alt="answer" />
      </label>
      <label>
        Explanation
        <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} />
      </label>

      <input type="button" value="Save" onClick={handleSave} />
    </StyledForm>
  );
};

export default Form;
