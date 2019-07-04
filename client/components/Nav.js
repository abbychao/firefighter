import React from 'react';
import MyContext from './Context'

const Nav = () => {
  return (
    <MyContext.Consumer>
      {(context) => (
        <section id="nav">
          <span>Position: <label>{context.position}</label></span>
          <span>Fire Type: <label>{context.fireType}</label></span>
        </section >
      )}
    </MyContext.Consumer>
  );
}

export default Nav;
