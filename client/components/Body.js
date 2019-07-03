import React from 'react';
import Welcome from './Welcome';
import Question from './Question';

const Body = ({ screen, question, options }) => {

  return (
    <section id="body">
      {screen === 'welcome' ? <Welcome /> : < Question question={question} options={options} />}
    </section>
  );
};

export default Body;
