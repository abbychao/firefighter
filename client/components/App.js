import React, { Component } from 'react';
import Body from "./Body.js";
import Nav from "./Nav.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'welcome',
      position: null,
      currentAnswer: null,
      lastQuestionCorrect: false,
      questions: [],
      // currentQuestion: {},
      questionIndex: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.saveAnswer = this.saveAnswer.bind(this);
  }

  handleClick(e) {
    // handles answer option selection
    // TODO: Refactor to move this to a separate function
    if (e.target.name === "positionButton") {
      let positionString;
      switch (e.target.value) {
        case 'fe':
          positionString = 'Forcible Entry';
          break;
        default:
          positionString = 'Can'
          break;
      }
      const position = e.target.value;
      // TODO: Refactor to choose selected position with e.target.value
      fetch(`/api/questions/${position}`)
        .then((data) => data.json())
        .then((data) => {
          return this.setState({
            ...this.state,
            position: positionString,
            questions: data,
            // currentQuestion: data[0],
            screen: 'question',
          })
        })
        .catch(err => console.error(err));

    } else if (e.target.name === "submitAnswer") {
      // score the question
      if (this.state.currentAnswer === this.state.questions[this.state.questionIndex].answerIndex) {
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
    } else if (e.target.name === "nextButton") {
      // TODO: show next question
      // check if this is the last question
      if (this.state.questionIndex + 1 < this.state.questions.length) {
        // if not, move to the next question
        this.setState({
          ...this.state,
          questionIndex: this.state.questionIndex + 1,
          screen: 'question',
        });
      } else {
        // otherwise, show the end
        console.log("That was the last question!");
      }
    }
  }

  saveAnswer(index) {
    this.setState({
      ...this.state,
      currentAnswer: index,
    });
  }

  render() {
    const { position, screen, lastQuestionCorrect } = this.state;
    // TODO: fix default
    const { fireType, question, options, explanation } = this.state.questions[this.state.questionIndex] || {};
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