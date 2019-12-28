import React, { useState } from 'react';
import AdminContext from './Context';

const AdminProvider = ({ setView, children }) => {
  const [displayQs, setDisplayQs] = useState([]);
  const [currentQ, setCurrentQ] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [scenarios, setScenarios] = useState([]); // Replicated in App

  // getScenarios is replicated in Admin
  const getScenarios = () => {
    fetch('/api/scenarios/all')
      .then((data) => data.json())
      .then((scenariosArray) => {
        setScenarios(scenariosArray);
      })
      .catch((err) => console.error(err));
  };
  function getQs(scenarioId) {
    fetch(scenarioId === undefined ? '/api/questions/all' : `/api/questions/s/${scenarioId}`)
      .then(data => data.json())
      .then((questions) => {
        const questionsArr = [];
        questions.forEach((q) => {
          questionsArr.push(
            <li name={`q${q._id}`} key={`q${q._id}`} onClick={handleQuestionClick}>
              {q.question}
            </li>
          );
        });
        setDisplayQs(questionsArr);
      })
      .catch(err => console.error(err));
  }
  function handleQuestionClick(e) {
    const name = e.target.getAttribute('name');
    const id = name.slice(1, name.length);
    getQById(id)
      .then((result) => {
        setShowForm(false);
        setCurrentQ(result);
        setShowForm(true);
      });
  }
  function getQById(id) {
    return fetch(`/api/questions/id/${id}`)
      .then(data => data.json())
      .catch(err => console.error(err));
  }

  return (
    <AdminContext.Provider value={{
      setView,
      displayQs,
      currentQ,
      setCurrentQ,
      showForm,
      setShowForm,
      scenarios,
      getScenarios,
      getQs,
    }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
