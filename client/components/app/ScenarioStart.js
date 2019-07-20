import React, { useContext } from 'react';
import AppContext from './Context';

const ScenarioStart = () => {
  const context = useContext(AppContext);
  return (
    <>
      <img src="../../public/images/taxpayer-store-fire.jpg" alt="taxpayer store fire" />
      <p>You've been called to a <b>Store Fire</b> at a <b>Taxpayer</b> building.</p>
      <button onClick={context.showFirstQuestion} >Let's go!</button>
    </ >
  )
};

export default ScenarioStart;