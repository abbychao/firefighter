import React, { useState } from 'react';

const Welcome = ({ handleClick }) => {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>Get ready to ace the Lieutenant's exam! This simulation will help you prepare.</p>
      <p>You've been called to a <b>Store Fire</b> at a <b>Taxpayer</b> building.</p>
      <p>What is your position?</p>
      <button onClick={handleClick} name="positionButton" value="can" >Can</button>
      <button onClick={handleClick} name="positionButton" value="fe" >Forcible Entry</button>
      <button onClick={handleClick} name="positionButton" value="ov" >OV</button>
      <button onClick={handleClick} name="positionButton" value="roof" >Roof</button>
      <button onClick={handleClick} name="positionButton" value="lcc" >LCC</button>
    </div >
  )
};

export default Welcome;