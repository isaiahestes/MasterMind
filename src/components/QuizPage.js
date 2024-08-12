import React, { useState, useEffect } from 'react';
import ApiService from './ApiService';
import QuestionCard from './QuestionCard';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    ApiService.getAllQuestions().then(data => setQuestions(data));
  }, []);

  const handleAnswerOptionClick = (selectedOption) => {
    const correctAnswer = questions[currentQuestion].correctAnswer;
    if (selectedOption == correctAnswer) {
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
    <div className="container qCard">
      {showScore ? (
        <div className="alert alert-success bg-dark text-white" role="alert">
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

export default QuizPage;