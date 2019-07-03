import React, { useState } from 'react';

const Welcome = ({ handleClick }) => {
  return (
    <div>
      <h1>Welcome!</h1>
      <p>Get ready to ace your Lieutenant's exam! This simulation will help you prepare.</p>
      <p>We'll start with <b>Taxpayer</b> buildings.</p>
      <p>What position do you want to start with?</p>
      <button onClick={handleClick} value="Can" >Can</button>
      <button onClick={handleClick} value="Forcible Entry" >Forcible Entry</button>
      <button onClick={handleClick} value="OV" >OV</button>
      <button onClick={handleClick} value="Roof" >Roof</button>
      <button onClick={handleClick} value="LCC" >LCC</button>
    </div >
  )
};

export default Welcome;