import React, { useState, useEffect } from 'react';

// TODO: Use componentDidMount() to get questions on load

const List = () => {
  const [displayQs, setDisplayQs] = useState([]);
  const getQs = () => {
    fetch('/api/questions/all')
      .then(data => data.json())
      // .then(data => console.log(data))
      .then((questions) => {
        console.log(questions);
        const questionsArr = [];
        questions.forEach((q) => {
          questionsArr.push(
            <li>
              <span>{q.buildingType}</span>
              <span>{q.position}</span>
              <span>{q.question}</span>
            </li>
          );
        });
        setDisplayQs(questionsArr);
      })
      .catch(err => console.log(err));
  }

  return <>
    <button onClick={getQs}>Load</button>
    {displayQs}
  </>;
}

export default List;
