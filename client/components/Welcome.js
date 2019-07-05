import React, { useContext } from 'react';
import MyContext from './Context';

const Welcome = () => {
  const context = useContext(MyContext);
  return (
    <>
      <h1>Welcome!</h1>
      <p>Get ready to ace the Lieutenant's exam! This simulation will help you prepare.</p>
      <p>What is your position?</p>
      <button onClick={context.selectPosition} value="can" >Can</button>
      <button onClick={context.selectPosition} value="fe" >Forcible Entry</button>
      <button onClick={context.selectPosition} value="ov" disabled >OV</button>
      <button onClick={context.selectPosition} value="roof" disabled>Roof</button>
      <button onClick={context.selectPosition} value="lcc" disabled>LCC</button>
    </ >
  )
};

export default Welcome;