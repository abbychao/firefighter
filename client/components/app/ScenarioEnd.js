import React, { useContext } from 'react';
import AppContext from './Context';

const ScenarioEnd = () => {
  const context = useContext(AppContext);
  const {
    scenarioWon, initialize, getScenario, selectedScenarios, nextScenarioIndex,
  } = context;
  const won = (
    <>
      <img src="../../public/images/scenario-won.png" alt=" blackened helmet" />
      <h1>Congratulations!</h1>
      <p>It was hard work, but you saved the day.</p>
    </>
  );
  const lost = (
    <>
      <img src="../../public/images/scenario-lost.png" alt="firefighters grocery shopping" />
      <h1>Better luck next time...</h1>
      <p>Take a lunch break and give this simulation another try.</p>
    </>
  );
  return (
    <>
      {scenarioWon ? won : lost}
      <button type="button" onClick={initialize}>Select a new scenario</button>
      {nextScenarioIndex !== selectedScenarios.length
        && <button type="button" onClick={() => { getScenario(); }}>Continue with next scenario</button>}
    </>
  )
};

export default ScenarioEnd;
