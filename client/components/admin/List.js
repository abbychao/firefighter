import React, { useContext, useEffect } from 'react';
import AdminContext from './Context';

const List = () => {
  function getQs(position) {
    fetch(position === 'undefined' ? `/api/questions/position/${position}` : '/api/questions/all')
      .then(data => data.json())
      .then((questions) => {
        const questionsArr = []
        questions.forEach((q) => {
          // TODO: On click, this should open the question in the body
          questionsArr.push(
            <li name={`q${q.id}`} key={`q${q.id}`} onClick={handleQuestionClick}>
              {q.buildingType}
              {q.position}
              {q.question}
            </li>
          );
        });
        context.setDisplayQs(questionsArr);
      })
      .catch(err => console.log(err));
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
      .then((result) => context.setCurrentQ(result[0]));
  }
  function handleNewClick(e) {
    // TODO: if a question is currently open with unsaved changes, prompt to save
    // if not, then populate the body with blank form
  }

  const context = useContext(AdminContext);
  const { displayQs } = context;

  useEffect(getQs, []);

  return (
    <>
      <input type="text" placeholder="Position" />
      <input type="button" onClick={getQs} value="Search" />
      <input type="button" onClick={handleNewClick} value="New" />
      {displayQs}
    </>
  );
};

export default List;
