import React, { useContext, useEffect } from 'react';
import AdminContext from './Context';


const ScenarioMenu = ({ onChange, selectedScenarioId }) => {
  const context = useContext(AdminContext);
  const { allScenarios, getAllScenarios } = context;

  useEffect(getAllScenarios, []);

  const scenariosArray = allScenarios.map((scenario) => {
    const selected = scenario._id === selectedScenarioId;
    return (
      <option value={scenario._id} key={scenario._id} selected={selected}>
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
