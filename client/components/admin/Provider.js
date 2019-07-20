import React from 'react';
import AdminContext from './Context';

const AdminProvider = (props) => {
  const { setView } = props;

  return (
    <AdminContext.Provider value={{
      setView,
    }}>
      {props.children}
    </AdminContext.Provider >
  )
}

export default AdminProvider;