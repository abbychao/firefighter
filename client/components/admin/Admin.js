import React, { useContext } from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import List from './List';
import Form from './Form';
import AdminContext from './Context';

const StyledAdmin = styled.div`
  width: 1000px;
  #body {
    display: flex;
    #list {
      max-width: 400px;
    }
  }
`;

const Admin = () => {
  const context = useContext(AdminContext);
  const { showForm, currentQ } = context;

  return (
    <StyledAdmin>
      <Nav />
      <div id="body">
        <List />
        {showForm && <Form currentQ={currentQ} />}
      </div>
    </StyledAdmin>
  );
}

export default Admin;
