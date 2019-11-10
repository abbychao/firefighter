import React from 'react';
import styled from 'styled-components';
import Body from "./Body.js";
import Nav from "./Nav.js";

const StyledApp = styled.div`
  max-width: 600px;
`;

const App = () => {
  return (
    <StyledApp>
      <Nav />
      <Body />
    </StyledApp>
  );
}

export default App;