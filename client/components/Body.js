import React from 'react';
import Welcome from './Welcome';
import Question from './Question';

const Body = ({ screen, question, options, handleClick }) => {

  return (
    <section id="body">
      {screen === 'welcome' ? <Welcome handleClick={handleClick} /> : < Question question={question} options={options} />}
    </section>
  );
};

export default Body;
