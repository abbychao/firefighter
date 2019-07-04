import React, { Component } from 'react';
import MyContext from './Context.js';
import Body from "./Body.js";
import Nav from "./Nav.js";

class MyProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      screen: 'welcome',
      position: 'starting position',
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
  }

  render() {
    return (
      <MyContext.Provider value={this.state}>
        {this.props.children}
      </MyContext.Provider >
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    // this.state = {}
    this.handleClick = this.handleClick.bind(this);
    this.saveAnswer = this.saveAnswer.bind(this);
  }

  // const [screen, setScreen] = useState('welcome');
  // const [position, setPosition] = useState(null);
  // const [currentAnswer, setCurrentAnswer] = useState(null);
  // const [lastQuestionCorrect,  setLastAnswerCorrect] = useState(false);
  // const [questions, setQuestions] = useState([{
  //   id: 0,
  //   position: '',
  //   building_type: '',
  //   fireType: '',
  //   question: '',
  //   options: [''],
  //   answerIndex: 0,
  //   explanation: '',
  //   createdAt: Date.now(),
  //   updatedAt: Date.now()
  // }]);

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
    // const { position, screen, lastQuestionCorrect } = this.state;
    // const { fireType, question, options, explanation } = this.state.questions[this.state.questionIndex];
    return (
      <MyProvider>
        <Nav />
        <Body />
        {/* <Body
          screen={screen}
          question={question}
          options={options}
          lastQuestionCorrect={lastQuestionCorrect}
          explanation={explanation}
          handleClick={this.handleClick}
          saveAnswer={this.saveAnswer}
        /> */}
      </MyProvider>
    );
  }
}

export default App;