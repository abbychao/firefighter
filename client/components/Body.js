import React from 'react';
import Welcome from './Welcome';
import Question from './Question';
import Answer from './Answer';

const Body = ({ screen, question, options, handleClick, saveAnswer }) => {

  return (
    <section id="body">
      {screen === 'welcome' && <Welcome handleClick={handleClick} />}
      {screen === 'question' &&
        < Question
          question={question}
          options={options}
          saveAnswer={saveAnswer}
          handleClick={handleClick} />
      }
      {screen === 'answer' && <Answer />}
    </section>
  );
};

export default Body;
