import React, { useState, useEffect } from 'react';
import ApiService from './ApiService';
import QuestionCard from './QuestionCard';
import ScoreModal from './ScoreModal';
// This is my quiz page it pulls in the card for each quesiotn and lets the user know their score once they are done
const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);

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
      setShowScoreModal(true);
    }
  };

  return (
    <div className="container qCard">
      {showScore ? (
        
        <div className="score">          
          <ScoreModal
            show={showScoreModal}
            handleClose={() => setShowScoreModal(false)}
            score={score}
            totalQuestions={questions.length}
          />
      
          <div className="alert alert-success bg-dark text-white" role="alert">
            You scored {score} out of {questions.length}
          </div>
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