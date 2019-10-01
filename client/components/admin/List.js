import React, { useContext, useEffect } from 'react';
// regeneratorRuntime allows us to use async/await in handleNewClick function
import regeneratorRuntime from "regenerator-runtime";
import AdminContext from './Context';

const List = () => {
  const context = useContext(AdminContext);
  const {
    displayQs,
    setDisplayQs,
    setCurrentQ,
    showForm,
    setShowForm,
  } = context;

  function getQs(position) {
    fetch(position === 'undefined' ? `/api/questions/position/${position}` : '/api/questions/all')
      .then(data => data.json())
      .then((questions) => {
        const questionsArr = [];
        questions.forEach((q) => {
          questionsArr.push(
            <li name={`q${q._id}`} key={`q${q._id}`} onClick={handleQuestionClick}>
              {q.position} {q.buildingType} {q.question}
            </li>
          );
        });
        setDisplayQs(questionsArr);
      })
      .catch(err => console.error(err));
  }
  function getQById(id) {
    return fetch(`/api/questions/id/${id}`)
      .then(data => data.json())
      .catch(err => console.error(err));
  }
  function handleQuestionClick(e) {
    const name = e.target.getAttribute('name');
    const id = name.slice(1, name.length);
    getQById(id)
      .then((result) => {
        setShowForm(false);
        setCurrentQ(result[0]);
        setShowForm(true);
      });
  }
  async function handleNewClick() {
    // TODO: if a question is currently open with unsaved changes, prompt to save
    // TODO: Switching between questions should also test for unsaved changes
    if (showForm) {
      const readyForNewForm = confirm('Do you wish to abandon changes?');
      if (!readyForNewForm) return;
    }
    const newQ = {
      position: '',
      buildingType: '',
      fireType: '',
      question: '',
      options: [],
      answerIndex: '',
      questionImage: '',
      answerImage: '',
      explanation: '',
    };
    setShowForm(false);
    await setCurrentQ(newQ);
    await setShowForm(true);
    // if not, then populate the body with blank form
  }

  useEffect(getQs, []);

  return (
    <div id="list">
      <input type="text" placeholder="Position" />
      <input type="button" onClick={getQs} value="Search" />
      <input type="button" onClick={handleNewClick} value="New" />
      {displayQs}
    </div>
  );
};

export default List;
