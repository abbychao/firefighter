import React, { Component } from 'react';
import Body from "./Body.js";
import Nav from "./Nav.js";
import { isNumber } from 'util';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'welcome',
      position: null,
      currentAnswer: null,
      lastQuestionCorrect: false,
      currentQuestion: {},
    };
    this.handleClick = this.handleClick.bind(this);
    this.saveAnswer = this.saveAnswer.bind(this);
  }

  handleClick(e) {
    // handles answer option selection
    // TODO: Refactor to move this to a separate function
    if (e.target.name === "position") {
      const position = e.target.name;
      // TODO: Refactor to choose selected position with e.target.value
      fetch(`/api/questions/position/${position}`)
        .then((data) => data.json())
        .then((data) => {
          return this.setState({
            ...this.state,
            position,
            currentQuestion: data,
            screen: 'question',
          })
        })
        .catch(err => console.error(err));

    } else if (e.target.name === "submitAnswer") {
      // score the question
      if (this.state.currentAnswer === this.state.currentQuestion.answerIndex) {
        this.setState({
          ...this.state,
          lastQuestionCorrect: true,
          screen: 'answer',
        });
      } else {
        this.setState({
          ...this.state,
          lastQuestionCorrect: false,
          screen: 'answer',
        });
      }
    }
  }

  saveAnswer(index) {
    console.log('saved answer ', index, this.state.currentAnswer);
    this.setState({
      ...this.state,
      currentAnswer: index,
    });
  }

  render() {
    const { position, screen, lastQuestionCorrect } = this.state;
    const { fireType, question, options, explanation } = this.state.currentQuestion;
    return (
      <div>
        <Nav position={position} fireType={fireType} />
        <Body
          screen={screen}
          question={question}
          options={options}
          lastQuestionCorrect={lastQuestionCorrect}
          explanation={explanation}
          handleClick={this.handleClick}
          saveAnswer={this.saveAnswer}
        />
      </div>
    );
  }
}

export default App;