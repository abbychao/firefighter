import React, { useContext } from 'react';
import MyContext from './Context';
import Welcome from './Welcome';
import Question from './Question';
import Answer from './Answer';

const Body = () => {
  const context = useContext(MyContext);
  return (
    <section id="body">
      {context.screen === 'welcome' && <Welcome />}
      {context.screen === 'question' && < Question />}
      {context.screen === 'answer' && <Answer />}
    </section>
  );
};

export default Body;
