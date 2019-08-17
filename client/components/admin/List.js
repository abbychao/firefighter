import React, { useContext, useEffect } from 'react';
import AdminContext from './Context'

// TODO: Why does this re-render constantly?

const List = () => {
  const getQs = (position) => {
    fetch(position === 'undefined' ? `/api/questions/${position}` : '/api/questions/all')
      .then(data => data.json())
      .then((questions) => {
        const questionsArr = []
        questions.forEach((q) => {
          // TODO: On click, this should open the question in the body
          questionsArr.push(
            <li name="list item" key={`question${q.id}`} onClick={(e) => console.log(e.target.value)}>
              {q.buildingType}
              {q.position}
              {q.question}
            </li>
          );
        });
        context.setDisplayQs(questionsArr);
      })
      .catch(err => console.log(err));
  }
  const context = useContext(AdminContext);

  // TODO: While passing [] as the second argument is closer to the familiar componentDidMount and componentWillUnmount mental model, there are usually better solutions to avoid re-running effects too often.
  // https://reactjs.org/docs/hooks-effect.html
  // https://reactjs.org/docs/hooks-faq.html#what-can-i-do-if-my-effect-dependencies-change-too-often
  useEffect(getQs, []);

  return <>
    <input type='text' placeholder="Position"></input>
    <button onClick={getQs}>Search</button>
    {context.displayQs}
  </>;
}

export default List;
