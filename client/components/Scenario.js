import React, { useContext } from 'react';
import MyContext from './Context';

const Scenario = () => {
  const context = useContext(MyContext);
  return (
    <>
      <img src="../../assets/taxpayer-store-fire.jpg" alt="taxpayer store fire" />
      <p>You've been called to a <b>Store Fire</b> at a <b>Taxpayer</b> building.</p>
      <button onClick={context.showFirstQuestion} >Let's go!</button>
    </ >
  )
};

export default Scenario;