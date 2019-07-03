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
      buildingType: null,
      currentQuestion: null,
      currentAnswer: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.saveAnswer = this.saveAnswer.bind(this);
  }

  handleClick(e) {
    // handles answer option selection
    // TODO: Refactor to move this to a separate function
    if (e.target.name === "position") {
      // TODO: Refactor to choose selected position with e.target.value
      fetch('/api/questions/get-first')
        .then((data) => data.json())
        .then((data) => this.setState({
          ...this.state,
          ...data,
          screen: 'question',
        }))
        .catch(err => console.error(err));
    } else if (e.target.name === "submitAnswer") {
      // score the question
    }
  }

  saveAnswer(index) {
    this.setState({
      ...this.state,
      currentAnswer: index,
    });
  }


  componentDidMount() {
  }

  render() {
    const { position, fireType, screen, question, options } = this.state;
    return (
      <div>
        <Nav position={position} fireType={fireType} />
        <Body screen={screen} question={question} options={options} handleClick={this.handleClick} saveAnswer={this.saveAnswer} />
      </div>
    );
  }
}

export default App;