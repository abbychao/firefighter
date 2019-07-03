import React, { useState } from 'react';

const Welcome = () => {
  const { position, setPosition } = useState(null);
  return (
    <div>
      <h1>Welcome!</h1>
      <p>Get ready to ace your Lieutenant's exam!  This simulation will help you prepare.</p>
      <p>We'll start with <b>Taxpayer</b> buildings.</p>
      <p>What position do you want to start with?</p>
      <button>Can</button>
      <button>Forcible Entry</button>
      <button>OV</button>
      <button>Roof</button>
      <button>LCC</button>
    </div>
  )
};

export default Welcome;