import React, { useState, useEffect } from 'react';

// TODO: Use componentDidMount() to get questions on load

const List = () => {
  const [displayQs, setDisplayQs] = useState([]);
  const getQs = (position) => {
    fetch(position === undefined ? `/api/questions/${position}` : '/api/questions/all')
      .then(data => data.json())
      // .then(data => console.log(data))
      .then((questions) => {
        console.log(questions);
        const questionsArr = [];
        questions.forEach((q) => {
          questionsArr.push(
            // TODO: On click, this should open the question in the body
            <li name="list item" onClick={(e) => console.log(e.target.value)}>
              {q.buildingType}
              {q.position}
              {q.question}
            </li>
          );
        });
        setDisplayQs(questionsArr);
      })
      .catch(err => console.log(err));
  }

  return <>
    <input type='text' placeholder="Position"></input>
    <button onClick={getQs}>Load</button>
    {displayQs}
  </>;
}

export default List;
