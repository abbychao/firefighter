import React, { useContext } from 'react';
import MyContext from './Context'

const Nav = () => {
  const context = useContext(MyContext);
  return (
    <section id="nav">
      <span>Position: <label>{context.questions[context.questionIndex].position}</label></span>
      <span>Building: <label>{context.questions[context.questionIndex].buildingType}</label></span>
      <span>Location: <label>{context.questions[context.questionIndex].fireType}</label></span>
    </section >
  );
}

export default Nav;
