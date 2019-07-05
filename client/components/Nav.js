import React, { useContext } from 'react';
import MyContext from './Context'

const Nav = () => {
  const context = useContext(MyContext);
  return (
    <section id="nav">
      <div>Position: <label>{context.questions[context.questionIndex].position}</label></div>
      <div>Building: <label>{context.questions[context.questionIndex].buildingType}</label></div>
      <div>Location: <label>{context.questions[context.questionIndex].fireType}</label></div>
    </section >
  );
}

export default Nav;
