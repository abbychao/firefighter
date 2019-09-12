import React, { useContext } from 'react';
import Nav from './Nav';
import List from './List';
import Form from './Form';
import AdminContext from './Context';

const Admin = () => {
  const context = useContext(AdminContext);
  const { showForm, currentQ } = context;

  return (
    <>
      <Nav />
      <List />
      {showForm && <Form currentQ={currentQ} />}
    </>
  );
}

export default Admin;
