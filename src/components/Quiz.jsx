import { useState, useCallback } from "react";

import QUESTIONS from "../questions";
import quizCompleteImg from "../assets/quiz-complete.png";
import QuestionTimer from "./QuestionTimer";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  const quizCompleted = activeQuestionIndex === QUESTIONS.length;

  const handleSelectedAnswer = useCallback((selectedAnswer) =>
    setUserAnswers((prev) => {
      return [...prev, selectedAnswer];
    })
  );

  const handleSkipAnswer = useCallback(() => handleSelectedAnswer(null));

  if (quizCompleted) {
    return (
      <div id='summary'>
        <img src={quizCompleteImg} alt='Trophy icon' />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const shuffeledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffeledAnswers.sort(() => Math.random() - 0.5);

  return (
    <div id='quiz'>
      <div id='question'>
        <QuestionTimer
          key={activeQuestionIndex}
          timeout={10000}
          onTimeout={handleSkipAnswer}
        />
        <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
        <ul id='answers'>
          {shuffeledAnswers.map((answer) => (
            <li key={answer} className='answer'>
              <button onClick={() => handleSelectedAnswer(answer)}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
