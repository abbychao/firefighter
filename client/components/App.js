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
      questions: [{
        id: 0,
        position: '',
        building_type: '',
        fireType: '',
        question: '',
        options: [''],
        answerIndex: 0,
        explanation: '',
        createdAt: Date.now(),
        updatedAt: Date.now()
      }],
      questionIndex: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.saveAnswer = this.saveAnswer.bind(this);
  }

  handleClick(e) {
    // handles answer option selection
    // TODO: Refactor to move this to a separate function
    if (e.target.name === "positionButton") {
      let position;
      switch (e.target.value) {
        case 'fe':
          position = 'Forcible Entry';
          break;
        case 'can':
          position = 'Can';
          break;
        default:
          position = 'Can'
          break;
      }
      const positionCode = e.target.value;
      fetch(`/api/questions/${positionCode}`)
        .then((data) => data.json())
        .then((data) => {
          return this.setState({
            ...this.state,
            position,
            questions: data,
            screen: 'question',
          })
        })
        .catch(err => console.error(err));

    } else if (e.target.name === "submitAnswer") {
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
      if (this.state.questionIndex + 1 < this.state.questions.length) {
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
    const { fireType, question, options, explanation } = this.state.questions[this.state.questionIndex];
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