import React, { useContext } from 'react';
import MyContext from './Context';
import Welcome from './Welcome';
import ScenarioStart from './ScenarioStart';
import Question from './Question';
import Answer from './Answer';
import ScenarioEnd from './ScenarioEnd';

const Body = () => {
  const context = useContext(MyContext);
  return (
    <section id="body">
      {context.screen === 'welcome' && <Welcome />}
      {context.screen === 'start' && <ScenarioStart />}
      {context.screen === 'question' && < Question />}
      {context.screen === 'answer' && <Answer />}
      {context.screen === 'end' && <ScenarioEnd />}
    </section>
  );
};

export default Body;
