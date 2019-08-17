import React, { useState } from 'react';
import AdminContext from './Context';

const AdminProvider = (props) => {
  const { setView } = props;
  const [displayQs, setDisplayQs] = useState([]);

  return (
    <AdminContext.Provider value={{
      setView,
      displayQs,
      setDisplayQs,
    }}>
      {props.children}
    </AdminContext.Provider >
  )
}

export default AdminProvider;