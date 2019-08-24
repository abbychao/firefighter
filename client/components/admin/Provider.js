import React, { useState } from 'react';
import AdminContext from './Context';

const AdminProvider = ({ setView, children }) => {
  const [displayQs, setDisplayQs] = useState([]);
  const [currentQ, setCurrentQ] = useState({});

  return (
    <AdminContext.Provider value={{
      setView,
      displayQs,
      setDisplayQs,
      currentQ,
      setCurrentQ,
    }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
