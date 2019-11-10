import React, { useContext, useEffect } from 'react';
import AppContext from './Context';

const Welcome = () => {
  const context = useContext(AppContext);
  const { positions, getPositions } = context;
  useEffect(getPositions, []);

  const positionsHTML = [];
  positions.forEach((position) => {
    positionsHTML.push(<button onClick={context.selectPosition} value={position} key={`position${position}`}>{position}</button>);
  });

  return (
    <>
      <img src="../../public/images/fdny-study.jpg" alt="FDNY badge in classroom" />
      <h1>Welcome!</h1>
      <p>Get ready to ace the Lieutenant's exam! This simulation will help you prepare.</p>
      <p>What is your position?</p>
      {positionsHTML}
    </ >
  );
};

export default Welcome;
