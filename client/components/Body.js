import React from 'react';
import MyContext from './Context';
import Welcome from './Welcome';
import Question from './Question';
import Answer from './Answer';

const Body = () => {
  return (
    <MyContext.Consumer>
      {(context) => (
        <section id="body">
          {context.screen === 'welcome' && <Welcome />}
          {context.screen === 'question' && < Question />}
          {context.screen === 'answer' && <Answer />}
        </section>
      )}
    </MyContext.Consumer>
  );
};

export default Body;
