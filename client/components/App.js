import React, { Component } from 'react';
import MyContext from './Context.js';
import Body from "./Body.js";
import Nav from "./Nav.js";

class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'welcome',
      currentAnswer: null,
      lastQuestionCorrect: false,
      questions: [{
        id: 0,
        position: '',
        buildingType: '',
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

    this.selectPosition = this.selectPosition.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.showNextQuestion = this.showNextQuestion.bind(this);
    this.saveAnswer = this.saveAnswer.bind(this);
  }
  selectPosition(e) {
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
          questions: data,
          screen: 'question',
        })
      })
      .catch(err => console.error(err));
  }
  submitAnswer() {
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
  }
  showNextQuestion() {
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
  saveAnswer(index) {
    this.setState({
      ...this.state,
      currentAnswer: index,
    });
  }
  render() {
    return (
      <MyContext.Provider value={{
        ...this.state,
        handleClick: this.handleClick,
        selectPosition: this.selectPosition,
        submitAnswer: this.submitAnswer,
        showNextQuestion: this.showNextQuestion,
        saveAnswer: this.saveAnswer,
      }}>
        {this.props.children}
      </MyContext.Provider >
    )
  }
}

const App = () => {
  return (
    <MyProvider>
      <Nav />
      <Body />
    </MyProvider>
  );
}

export default App;