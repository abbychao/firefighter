import React, { useContext, useEffect } from 'react';
import AdminContext from './Context';


const ScenarioMenu = ({ onChange }) => {
  const context = useContext(AdminContext);
  const { scenarios, getScenarios } = context;

  useEffect(getScenarios, []);

  const scenariosArray = scenarios.map((scenario) => {
    return (
      <option value={scenario._id} key={scenario._id}>
        {`${scenario.building} ${scenario.buildingDetails}, ${scenario.position}, ${scenario.due} Due`}
      </option>
    );
  });

  // TODO: Find a way to show current scenario correctly
  return (
    <select onChange={onChange}>
      <option value="none">Select a scenario...</option>
      {scenariosArray}
    </select>
  );

};

export default ScenarioMenu;
