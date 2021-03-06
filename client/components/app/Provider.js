import React, { useState } from 'react';
import AppContext from './Context';

const AppProvider = (props) => {
  const { setView } = props;
  const initialQuestionArray = [
    {
      id: 0,
      scenario: '',
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
  const [allScenarios, setAllScenarios] = useState([]); // Replicated in Admin
  const [currentScenario, setScenario] = useState({});
  const [selectedScenarios, setSelectedScenarios] = useState([]);
  const [nextScenarioIndex, setNextScenarioIndex] = useState(0);


  // getAllScenarios is replicated in Admin
  const getAllScenarios = () => {
    fetch('/api/scenarios/all')
      .then((data) => data.json())
      .then((scenariosArray) => {
        setAllScenarios(scenariosArray);
        if (selectedScenarios.length === 0) setSelectedScenarios(scenariosArray);
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
  const getScenario = () => {
    /**
    * Randomize array element order in-place.
    * Using Durstenfeld shuffle algorithm.
    */
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    const shuffledScenarios = nextScenarioIndex === 0 ? shuffle(selectedScenarios) : selectedScenarios;
    if (nextScenarioIndex === 0) setSelectedScenarios(shuffledScenarios);
    const scenarioId = shuffledScenarios[nextScenarioIndex]._id;
    setNextScenarioIndex(nextScenarioIndex + 1);
    fetch(`/api/scenarios/id/${scenarioId}`)
      .then((data) => data.json())
      .then((scenario) => {
        setScenario(scenario);
      })
      .catch((err) => console.error(err));
    fetch(`/api/questions/s/${scenarioId}`)
      .then((data) => data.json())
      .then((data) => setQuestions(data))
      .then(() => setQuestionIndex(0))
      .then(() => setScreen('start'))
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
      getScenario,
      submitAnswer,
      showFirstQuestion,
      showNextQuestion,
      saveAnswer,
      allScenarios,
      getAllScenarios,
      currentScenario,
      selectedScenarios,
      setSelectedScenarios,
      nextScenarioIndex,
    }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
