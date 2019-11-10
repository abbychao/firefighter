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

  return (
    <AdminContext.Provider value={{
      setView,
      displayQs,
      setDisplayQs,
      currentQ,
      setCurrentQ,
      showForm,
      setShowForm,
      positions,
      getPositions,
    }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
