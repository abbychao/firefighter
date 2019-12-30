import React, { useContext } from 'react';
import AppContext from './Context'

const Nav = () => {
  const context = useContext(AppContext);
  const { currentScenario } = context;

  return (
    <section id="nav">
      <div>
        Building:
        <span className="bold">{currentScenario.building}</span>
      </div>
      <div>
        Details:
        <span className="bold">{currentScenario.buildingDetails}</span>
      </div>
      <div>
        Position:
        <span className="bold">{currentScenario.position}</span>
      </div>
      <div>
        Due:
        <span className="bold">{currentScenario.due}</span>
      </div>
      <button onClick={() => context.setView('admin')}>Switch to Admin</button>
    </section >
  );
}

export default Nav;
