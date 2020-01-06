import React, { useContext, useEffect, useState } from 'react';
import AppContext from './Context';

const Welcome = () => {
  const context = useContext(AppContext);
  const {
    getScenario, allScenarios, getAllScenarios, setSelectedScenarios,
  } = context;
  const [selections, setSelections] = useState({
    building: null,
    buildingDetails: null,
    position: null,
    due: null,
  });
  const getOptionHTML = (set) => [...set].map((item) => (
    <option key={`option-${item}`}>
      {item}
    </option>
  ));
  const handleSelection = (e) => {
    const { name } = e.target;
    let { value } = e.target;
    if (
      value === 'Building Type'
      || value === 'Details'
      || value === 'Position'
      || value === 'Due'
    ) value = null;
    const result = {};
    result[name] = value;
    setSelections({ ...selections, ...result });
    setSelectedScenarios(selectedScenarios);
  };

  useEffect(getAllScenarios, []);

  const buildingSet = new Set(['Building Type']);
  const buildingDetailsSet = new Set(['Details']);
  const positionSet = new Set(['Position']);
  const dueSet = new Set(['Due']);
  const selectedScenarios = allScenarios.filter((scenario) => {
    if (selections.building && scenario.building !== selections.building) return false;
    if (selections.buildingDetails
      && scenario.buildingDetails !== selections.buildingDetails) return false;
    if (selections.position && scenario.position !== selections.position) return false;
    if (selections.due && scenario.due !== selections.due) return false;
    return true;
  });

  selectedScenarios.forEach((scenario) => {
    const {
      building,
      buildingDetails,
      position,
      due,
    } = scenario;
    buildingSet.add(building);
    buildingDetailsSet.add(buildingDetails);
    positionSet.add(position);
    dueSet.add(due);
  });

  const buildingHTML = getOptionHTML(buildingSet);
  const buildingDetailsHTML = getOptionHTML(buildingDetailsSet);
  const positionHTML = getOptionHTML(positionSet);
  const dueHTML = getOptionHTML(dueSet);

  return (
    <>
      <img src="../../public/images/fdny-study.jpg" alt="FDNY badge in classroom" />
      <h1>Welcome!</h1>
      <p>Get ready to ace the Lieutenant's exam! This simulation will help you prepare.</p>
      <p>What is your scenario?</p>
      <select name="building" onChange={handleSelection}>
        {buildingHTML}
      </select>
      <select name="buildingDetail" onChange={handleSelection}>
        {buildingDetailsHTML}
      </select>
      <select name="position" onChange={handleSelection}>
        {positionHTML}
      </select>
      <select name="due" onChange={handleSelection}>
        {dueHTML}
      </select>
      <button type="button" onClick={() => getScenario(0)}>Start</button>
      <br />
      <i>{selectedScenarios.length} scenarios selected.</i>
    </ >
  );
};

export default Welcome;
