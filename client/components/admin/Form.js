/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import AdminContext from './Context';
import styled from 'styled-components';

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
  function handleChange(e) {
    // TODO: How to handle different fields?
    // Possibly get from "name" field and then save in local state
  }
  function getFieldType(key) {
    if (
      key === '_id'
      || key === '__v'
      || key === 'id'
      || key === 'createdAt'
      || key === 'updatedAt'
      || key === 'answerIndex'
    ) return 'hidden';
    if (
      key === 'options'
    ) return 'options';
    if (
      key === 'explanation'
    ) return 'textarea';
    return 'text';
  }
  function renderField(currentQ, key) {
    const fieldType = getFieldType(key);
    console.log('key', key, 'fieldType', fieldType);
    switch (fieldType) {
      case 'hidden':
        return null;
      case 'textarea':
        return (
          <React.Fragment key={`entry${key}`}>
            <label>{key}</label>
            <textarea value={currentQ[key]} onChange={handleChange} />
            <br />
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment key={`entry${key}`}>
            <label>{key}</label>
            <input value={currentQ[key]} onChange={handleChange} />
            <br />
          </React.Fragment>
        );
    }
  }

  const context = useContext(AdminContext);
  // const [question, setQuestion] = useState(JSON.parse(JSON.stringify(context.currentQ)));
  const { currentQ } = context;
  console.log(currentQ);

  // Other fields: createdAt, updatedAt, id, _id, __v
  const {
    position,
    buildingType,
    fireType,
    question,
    options,
    answerIndex,
    questionImage,
    answerImage,
    explanation,
  } = currentQ;


  const contents = [];
  const keys = Object.keys(currentQ);
  keys.forEach((key) => {
    contents.push(renderField(currentQ, key));
  });


  const optionsHTML = [];
  options.forEach((item, idx) => {
    optionsHTML.push(<input value={item} key={`option${idx}`} />);
  });

  return (
    <StyledForm>
      <label>
        Position:
        <input value={position} />
      </label>
      <label>
        Building Type:
        <input value={buildingType} />
      </label>
      <label>
        Fire Type:
        <input value={fireType} />
      </label>
      <label>
        Question:
        <input value={question} />
      </label>
      <label>
        Options:
        {optionsHTML}
      </label>
      <label>
        Question Image URL:
        <input value={questionImage} />
      </label>
      <label>
        Question Image Preview:
        <img src={questionImage} alt="question" />
      </label>
      <label>
        Explanation Image
        <input value={answerImage} />
      </label>
      <label>
        Explanation Image Preview:
        <img src={answerImage} alt="answer" />
      </label>
      <label>
        Explanation
        <textarea value={explanation} />
      </label>

      <input type="button" value="Save" onClick={handleSave} />
    </StyledForm>
  );
};

export default Form;
