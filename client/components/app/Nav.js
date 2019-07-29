import React, { useContext } from 'react';
import AppContext from './Context'

const Nav = () => {
  const context = useContext(AppContext);
  return (
    <section id="nav">
      <div>Position: <label>{context.questions[context.questionIndex].position}</label></div>
      <div>Building: <label>{context.questions[context.questionIndex].buildingType}</label></div>
      <div>Location: <label>{context.questions[context.questionIndex].fireType}</label></div>
      {/* <button onClick={() => context.setView('admin')}>Switch to Admin</button> */}
    </section >
  );
}

export default Nav;
