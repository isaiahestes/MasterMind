// Create an ap that gives you quesitons to strengthen your brain and tells you what part of your brain you are using to anwser those questions.

import React, { useState, useEffect } from 'react';
import ApiService from './components/ApiService';
import QuestionCard from './components/QuestionCard';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    ApiService.getAllQuestions().then(data => setQuestions(data));
  }, []);

  const handleAnswerOptionClick = (selectedOption) => {
    const correctAnswer = questions[currentQuestion].correctAnswer;
    if (selectedOption === correctAnswer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="container">
      {showScore ? (
        <div className="alert alert-success" role="alert">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        questions.length > 0 && (
          <QuestionCard
            question={questions[currentQuestion]}
            onAnswer={handleAnswerOptionClick}
          />
        )
      )}
    </div>
  );
};

export default QuestionList;