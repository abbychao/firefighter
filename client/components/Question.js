import React, { Component } from 'react';

export default class Question extends Component {
  render() {
    return (
      <div>
        <section>Here is a question</section>
        <input type="radio" name="answerA" /> <label>Answer A</label>
        <br />
        <input type="radio" name="answerB" /> <label>Answer B</label>
        <br />
        <input type="radio" name="answerC" /> <label>Answer C</label>
      </div>
    );
  }
}