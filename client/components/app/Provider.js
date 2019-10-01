import React, { useState } from 'react';
import AppContext from './Context';

const AppProvider = (props) => {
  const { setView } = props;
  const initialQuestionArray = [
    {
      id: 0,
      position: '',
      buildingType: '',
      fireType: '',
      question: '',
      options: [''],
      answerIndex: 0,
      explanation: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  ];
  const [screen, setScreen] = useState('welcome');
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [lastQuestionCorrect, setLastQuestionCorrect] = useState(false);
  const [scenarioWon, setScenarioWon] = useState(true);
  const [questions, setQuestions] = useState(initialQuestionArray);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [positions, setPositions] = useState([]);


  const getPositions = () => {
    fetch('/api/positions/all')
      .then((data) => data.json())
      .then((positionsArray) => {
        setPositions(positionsArray);
      })
      .catch((err) => console.error(err));
  };
  const initialize = () => {
    setScreen('welcome');
    setCurrentAnswer(null);
    setLastQuestionCorrect(false);
    setScenarioWon(true);
    setQuestions(initialQuestionArray);
    setQuestionIndex(0);
  };
  const selectPosition = (e) => {
    const position = e.target.value;
    fetch(`/api/questions/position/${position}`)
      .then((data) => data.json())
      .then((data) => {
        setScreen('start');
        setQuestions(data);
      })
      .catch((err) => console.error(err));
  };
  const submitAnswer = () => {
    if (currentAnswer === null) return;
    if (currentAnswer === questions[questionIndex].answerIndex) {
      setLastQuestionCorrect(true);
    } else {
      setLastQuestionCorrect(false);
      setScenarioWon(false);
    }
    setCurrentAnswer(null);
    setScreen('answer');
  };
  const showFirstQuestion = () => setScreen('question');
  const showNextQuestion = () => {
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
      setScreen('question');
    } else setScreen('end');
  };
  const saveAnswer = (i) => setCurrentAnswer(i);

  return (
    <AppContext.Provider value={{
      setView,
      screen,
      currentAnswer,
      lastQuestionCorrect,
      scenarioWon,
      questions,
      questionIndex,
      initialize,
      selectPosition,
      submitAnswer,
      showFirstQuestion,
      showNextQuestion,
      saveAnswer,
      positions,
      getPositions,
    }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
