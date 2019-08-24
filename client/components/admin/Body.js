import React, { useContext, useState } from 'react';
import AdminContext from './Context';

const Body = () => {
  function handleSave() {
    // TODO: Grab all information from the form and submit to DB
  }
  function handleChange(e) {
    // TODO: How to handle different fields?
    // Possibly get from "name" field and then save in local state
  }
  const context = useContext(AdminContext);
  // const [question, setQuestion] = useState(JSON.parse(JSON.stringify(context.currentQ)));
  const { currentQ } = context;

  const contents = [];
  const keys = Object.keys(currentQ);
  keys.forEach((key) => {
    if (key !== '_id' && key !== '__v') {
      contents.push(
        <React.Fragment key={`entry${key}`}>
          <label>{key}</label>
          <input value={currentQ[key]} onChange={handleChange} />
          <br />
        </React.Fragment>,
      );
    }
  });
  if (keys.length) contents.push(<input key="submit" type="button" value="Save" />);

  return (
    // <p>Here is the body</p>
    <form>
      {contents}
    </form>
  );
};

export default Body;
