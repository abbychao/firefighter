import React, { useContext } from 'react';
import MyContext from './Context';

const Welcome = () => {
  const context = useContext(MyContext);
  return (
    <>
      <h1>Welcome!</h1>
      <p>Get ready to ace the Lieutenant's exam! This simulation will help you prepare.</p>
      <p>You've been called to a <b>Store Fire</b> at a <b>Taxpayer</b> building.</p>
      <p>What is your position?</p>
      <button onClick={context.selectPosition} name="positionButton" value="can" >Can</button>
      <button onClick={context.selectPosition} name="positionButton" value="fe" >Forcible Entry</button>
      <button onClick={context.selectPosition} name="positionButton" value="ov" >OV</button>
      <button onClick={context.selectPosition} name="positionButton" value="roof" >Roof</button>
      <button onClick={context.selectPosition} name="positionButton" value="lcc" >LCC</button>
    </ >
  )
};

export default Welcome;