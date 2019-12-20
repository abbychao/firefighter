import React, { useContext, useEffect } from 'react';
import AppContext from './Context';

const Welcome = () => {
  const context = useContext(AppContext);
  const { scenarios, getScenarios } = context;
  useEffect(getScenarios, []);

  const scenariosHTML = [];
  scenarios.forEach((scenario) => {
    const { building, buildingDetails, position, due } = scenario;
    const name = `${building} ${buildingDetails} ${position} ${due} Due`;
    scenariosHTML.push(
      <button
        onClick={context.selectScenario}
        value={scenario._id}
        key={`scenario${scenario._id}`}
        type="button"
      >
        {name}
      </button>,
    );
  });

  return (
    <>
      <img src="../../public/images/fdny-study.jpg" alt="FDNY badge in classroom" />
      <h1>Welcome!</h1>
      <p>Get ready to ace the Lieutenant's exam! This simulation will help you prepare.</p>
      <p>What is your scenario?</p>
      {scenariosHTML}
    </ >
  );
};

export default Welcome;
