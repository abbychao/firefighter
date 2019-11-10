import React, { useState } from 'react';
import AdminContext from './Context';

const AdminProvider = ({ setView, children }) => {
  const [displayQs, setDisplayQs] = useState([]);
  const [currentQ, setCurrentQ] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [positions, setPositions] = useState([]); // Replicated in App

  // getPositions is replicated in Admin
  const getPositions = () => {
    fetch('/api/positions/all')
      .then((data) => data.json())
      .then((positionsArray) => {
        setPositions(positionsArray);
      })
      .catch((err) => console.error(err));
  };
  function getQs(position) {
    fetch(position === undefined ? '/api/questions/all' : `/api/questions/position/${position}`)
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
      positions,
      getPositions,
      getQs,
    }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
