import React, { useContext } from 'react';
import AppContext from './Context';

const ScenarioStart = () => {
  const context = useContext(AppContext);
  const { currentScenario, showFirstQuestion } = context;
  const {
    building, buildingDetails, position, due,
  } = currentScenario;
  return (
    <>
      <img src="../../public/images/taxpayer-store-fire.jpg" alt="taxpayer store fire" />
      <p>You've been called to a <b>{building}.</b> It's a <b>{buildingDetails}</b>.</p>
      <p>You are <b>{due} Due</b> and your position is <b>{position}</b>.</p>
      <button type="button" onClick={showFirstQuestion}>Let's go!</button>
    </ >
  );
};

export default ScenarioStart;
