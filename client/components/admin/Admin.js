import React, { useContext } from 'react';
import styled from 'styled-components';
import Nav from './Nav';
import List from './List';
import Form from './Form';
import ScenarioForm from './ScenarioForm';
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
        {showForm === 'question' && <Form currentQ={currentQ} />}
        {showForm === 'scenario' && <ScenarioForm />}
      </div>
    </StyledAdmin>
  );
}

export default Admin;
