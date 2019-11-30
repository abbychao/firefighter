import React, { useContext, useEffect } from 'react';
// regeneratorRuntime allows us to use async/await in handleNewClick function
import regeneratorRuntime from "regenerator-runtime";
import AdminContext from './Context';

const List = () => {
  const context = useContext(AdminContext);
  const {
    displayQs,
    setCurrentQ,
    showForm,
    setShowForm,
    scenarios,
    getScenarios,
    getQs,
  } = context;

  async function handleNewClick() {
    // TODO: if a question is currently open with unsaved changes, prompt to save
    // TODO: Switching between questions should also test for unsaved changes
    if (showForm) {
      const readyForNewForm = confirm('Do you wish to abandon changes?');
      if (!readyForNewForm) return;
    }
    const newQ = {
      scenario: '',
      question: '',
      options: [],
      answerIndex: '',
      questionImage: '',
      answerImage: '',
      explanation: '',
    };
    setShowForm(false);
    await setCurrentQ(newQ);
    await setShowForm(true);
    // if not, then populate the body with blank form
  }

  useEffect(getQs, []);
  useEffect(getScenarios, []);

  const scenariosArray = scenarios.map((scenario) => <option value={scenario} key={scenario}>{scenario}</option>);

  return (
    <div id="list">
      <select onChange={(e) => { getQs(e.target.value === 'all' ? undefined : e.target.value); }}>
        <option value="all"> All Scenarios</option>
        {scenariosArray}
      </select>
      <input type="button" onClick={handleNewClick} value="New Question" />
      {displayQs}
    </div>
  );
};

export default List;
