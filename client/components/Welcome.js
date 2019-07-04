import React, { useState } from 'react';

const Welcome = ({ handleClick }) => {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>Get ready to ace the Lieutenant's exam! This simulation will help you prepare.</p>
      <p>You've been called to a <b>store fire</b> at a <b>Taxpayer</b> building.</p>
      <p>What is your position?</p>
      <button onClick={handleClick} name="position" value="can" >Can</button>
      <button onClick={handleClick} name="position" value="fe" >Forcible Entry</button>
      <button onClick={handleClick} name="position" value="ov" >OV</button>
      <button onClick={handleClick} name="position" value="roof" >Roof</button>
      <button onClick={handleClick} name="position" value="lcc" >LCC</button>
    </div >
  )
};

export default Welcome;