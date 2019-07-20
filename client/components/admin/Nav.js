import React, { useContext } from 'react';
import AdminContext from './Context';

const Nav = () => {
  const context = useContext(AdminContext);
  return (
    <section id="nav">
      <button onClick={() => context.setView('player')}>Switch to Player</button>
    </section>
  );
}

export default Nav;
