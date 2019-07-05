import React, { useState } from 'react';
import MyContext from './Context';

const MyProvider = (props) => {

  const [screen, setScreen] = useState('welcome');
  const [currentAnswer, setCurrentAnswer] = useState(null);
  const [lastQuestionCorrect, setLastQuestionCorrect] = useState(false);
  const [questions, setQuestions] = useState(
    [
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
        updatedAt: Date.now()
      }
    ]
  );
  const [questionIndex, setQuestionIndex] = useState(0);

  const selectPosition = (e) => {
    const positionCode = e.target.value;
    fetch(`/api/questions/${positionCode}`)
      .then((data) => data.json())
      .then((data) => {
        setScreen('question');
        setQuestions(data);
      })
      .catch(err => console.error(err));
  }
  const submitAnswer = () => {
    if (currentAnswer === questions[questionIndex].answerIndex) {
      setLastQuestionCorrect(true);
    } else setLastQuestionCorrect(false);
    setScreen('answer');
  }
  const showNextQuestion = () => {
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
      setScreen('question');
    } else {
      // otherwise, show the end
      console.log("That was the last question!");
    }

  }
  const saveAnswer = i => setCurrentAnswer(i);

  return (
    <MyContext.Provider value={{
      screen,
      currentAnswer,
      lastQuestionCorrect,
      questions,
      questionIndex,
      selectPosition,
      submitAnswer,
      showNextQuestion,
      saveAnswer
    }}>
      {props.children}
    </MyContext.Provider >
  )
}

export default MyProvider;