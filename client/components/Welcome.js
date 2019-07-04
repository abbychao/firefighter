import React from 'react';
import MyContext from './Context';

const Welcome = ({ handleClick }) => {
  return (
    <MyContext.Consumer>
      {(context) => (
        <>
          <h1>Welcome!</h1>
          <p>Get ready to ace the Lieutenant's exam! This simulation will help you prepare.</p>
          <p>You've been called to a <b>Store Fire</b> at a <b>Taxpayer</b> building.</p>
          <p>What is your position?</p>
          <button onClick={context.handleClick} name="positionButton" value="can" >Can</button>
          <button onClick={context.handleClick} name="positionButton" value="fe" >Forcible Entry</button>
          <button onClick={context.handleClick} name="positionButton" value="ov" >OV</button>
          <button onClick={context.handleClick} name="positionButton" value="roof" >Roof</button>
          <button onClick={context.handleClick} name="positionButton" value="lcc" >LCC</button>
        </ >
      )}
    </MyContext.Consumer>
  )
};

export default Welcome;