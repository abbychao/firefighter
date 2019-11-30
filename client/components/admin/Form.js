/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import AdminContext from './Context';

const StyledForm = styled.div`
  label {
    display: block;
  }
  img {
    max-width: 300px;
  }
  textarea {
    width: 100%;
  }
`;

const Form = () => {
  const context = useContext(AdminContext);
  const { currentQ, setShowForm, getQs } = context;

  // Other fields (ignored): createdAt, updatedAt, _id, __v
  const [scenario, setScenario] = useState(currentQ.scenario);
  const [question, setQuestion] = useState(currentQ.question);
  const [options, setOptions] = useState(currentQ.options);
  const [answerIndex, setAnswerIndex] = useState(currentQ.answerIndex);
  const [questionImage, setQuestionImage] = useState(currentQ.questionImage);
  const [answerImage, setAnswerImage] = useState(currentQ.answerImage);
  const [explanation, setExplanation] = useState(currentQ.explanation);

  function handleSave() {
    const fetchOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenario,
        question,
        options,
        answerIndex,
        questionImage,
        answerImage,
        explanation,
      }),
    };
    fetch(`/api/questions/id/${currentQ._id}`, fetchOptions)
      .then(res => {
        context.setShowForm(false);
        alert('Saved!');
        getQs();
      })
      .catch((err) => console.error(err));
  }
  function handleDelete() {
    const readyToDelete = confirm('Are you sure you want to delete this question?');
    if (!readyToDelete) return;
    const fetchOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenario,
        question,
        options,
        answerIndex,
        questionImage,
        answerImage,
        explanation,
      }),
    };
    fetch(`/api/questions/id/${currentQ._id}`, fetchOptions)
      .then(res => {
        setShowForm(false);
        alert('Deleted!');
        getQs();
      })
      .catch((err) => console.error(err));
  }
  function handleCreate() {
    const fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scenario,
        question,
        options,
        answerIndex,
        questionImage,
        answerImage,
        explanation,
      }),
    };
    fetch('/api/questions', fetchOptions)
      .then(res => {
        setShowForm(false);
        alert('Created!');
        getQs();
      })
      .catch((err) => console.error(err));
  }
  function handleOptionUpdate(e, idx) {
    const optionsCopy = options.slice();
    optionsCopy[idx] = e.target.value;
    setOptions(optionsCopy);
  }
  function handleNewOptionUpdate(e, newId) {
    const optionsCopy = options.slice();
    optionsCopy.push(e.target.value);
    setOptions(optionsCopy);
  }

  const optionsHTML = [];
  options.forEach((item, idx) => {
    optionsHTML.push(
      <li key={`option${idx}`}>
        <input value={item} onChange={(e) => handleOptionUpdate(e, idx)} />
        {answerIndex === idx && <button type="button" disabled>ANSWER</button>}
        {answerIndex !== idx && <button type="button" onClick={() => setAnswerIndex(idx)}>Select</button>}
      </li>
    );
  });
  const newId = options.length;
  optionsHTML.push(
    <li key={`option${newId}`}>
      <input placeholder="New option..." onChange={(e) => handleNewOptionUpdate(e, newId)} />
      <button type="button" onClick={() => setAnswerIndex(newId)}>Select</button>
    </li>
  );


  return (
    <StyledForm id="form">
      <label>
        Scenario:
        <input value={scenario} onChange={(e) => setScenario(e.target.value)} />
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
      <img src={questionImage} alt="question preview" />
      <label>
        Explanation Image
        <input value={answerImage} onChange={(e) => setAnswerImage(e.target.value)} />
      </label>
      <img src={answerImage} alt="answer preview" />
      <label>
        Explanation
        <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} />
      </label>

      {currentQ._id && <input type="button" value="Save" onClick={handleSave} />}
      {currentQ._id && <input type="button" value="Delete" onClick={handleDelete} />}
      {!currentQ._id && <input type="button" value="Create" onClick={handleCreate} />}
    </StyledForm>
  );
};

export default Form;
