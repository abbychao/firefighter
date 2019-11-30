import React, { useContext } from 'react';
import AppContext from './Context'

const Nav = () => {
  const context = useContext(AppContext);
  const { questions, questionIndex } = context;

  return (
    <section id="nav">
      <div>
        Scenario:
        <label> {questions[questionIndex].scenario}</label>
      </div>
      <button onClick={() => context.setView('admin')}>Switch to Admin</button>
    </section >
  );
}

export default Nav;
