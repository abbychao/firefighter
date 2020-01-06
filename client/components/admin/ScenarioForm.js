import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import AdminContext from './Context';

const StyledForm = styled.div`
  label {
    display: block;
  }
  input {
    margin-left: 2px;
  }
`;

const ScenarioForm = () => {
  const context = useContext(AdminContext);
  const { setShowForm, getAllScenarios, } = context;


  const [values, setValues] = useState({
    building: null,
    buildingDetails: null,
    position: null,
    due: null,
  });

  const handleSubmit = () => {
    fetch('/api/scenarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then(res => {
        context.setShowForm('none');
        alert('Scenario created!');
        getAllScenarios();
      })
      .catch((err) => console.error(err));
  };

  return (
    <StyledForm id="form">
      <label>
        Building:
        <input type="text" value={values.building} onChange={(e) => setValues({ ...values, building: e.target.value })} />
      </label>
      <label>
        Building Details:
        <input type="text" value={values.buildingDetails} onChange={(e) => setValues({ ...values, buildingDetails: e.target.value })} />
      </label>
      <label>
        Position:
        <input type="text" value={values.position} onChange={(e) => setValues({ ...values, position: e.target.value })} />
      </label>
      <label>
        Due:
        <input type="text" value={values.due} onChange={(e) => setValues({ ...values, due: e.target.value })} />
      </label>
      <button type="button" onClick={handleSubmit}>Submit</button>
    </StyledForm>
  );
};

export default ScenarioForm;
