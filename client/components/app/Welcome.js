import React, { useContext, useEffect, useState } from 'react';
import AppContext from './Context';

const Welcome = () => {
  const context = useContext(AppContext);
  const { scenarios, getScenarios } = context;
  useEffect(getScenarios, []);

  // Options are populated into the dropdowns
  const [buildingOptions, setBuildingOptions] = useState('');
  const [buildingDetailsOptions, setBuildingDetailsOptions] = useState('');
  const [positionOptions, setPositionOptions] = useState('');
  const [DueOptions, setDueOptions] = useState('');

  // Selected elements are the current selection
  const [buildingSelected, setBuildingSelected] = useState('');
  const [buildingDetailsSelected, setBuildingDetailsSelected] = useState('');
  const [positionSelected, setPositionSelected] = useState('');
  const [dueSelected, setDueSelected] = useState('');

  const scenariosHTML = [];
  const buildingSet = new Set(['Building Type']);
  const buildingDetailsSet = new Set(['Details']);
  const positionSet = new Set(['Position']);
  const dueSet = new Set(['Due']);
  scenarios.forEach((scenario) => {
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
  const getOptionHTML = (set) => [...set].map((item) => (
    <option key={`option-${item}`}>
      {item}
    </option>
  ));

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
      <select onChange={(e) => console.log(e.target.value)}>
        {buildingHTML}
      </select>
      <select>
        {buildingDetailsHTML}
      </select>
      <select>
        {positionHTML}
      </select>
      <select>
        {dueHTML}
      </select>
      <br />
      {scenariosHTML}
    </ >
  );
};

export default Welcome;
