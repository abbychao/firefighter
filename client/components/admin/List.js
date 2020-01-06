import React, { useContext, useEffect } from 'react';
// regeneratorRuntime allows us to use async/await in handleNewClick function
import regeneratorRuntime from "regenerator-runtime";
import AdminContext from './Context';
import ScenarioMenu from './ScenarioMenu';

const List = () => {
  const context = useContext(AdminContext);
  const {
    displayQs,
    setCurrentQ,
    showForm,
    setShowForm,
    getQs,
  } = context;

  async function handleNewQuestionClick() {
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

  return (
    <div id="list">
      <input type="button" onClick={() => alert("Coming soon!")} value="New Scenario" />
      <input type="button" onClick={handleNewQuestionClick} value="New Question" />
      <br />
      <br />
      <ScenarioMenu onChange={(e) => { getQs(e.target.value === 'all' ? undefined : e.target.value); }} />
      {displayQs}
    </div>
  );
};

export default List;
