import React from 'react';
import { Button, Card } from 'react-bootstrap';
// This is my card componant it is what we display when on the quiz each quesiotn is asked
const QuestionCard = ({ question, onAnswer }) => {
  return (
    <Card className="mb-3 qCard bg-dark text-white">
      <Card.Body>
        <Card.Title>{question.question}</Card.Title>
        {/* This will create the choices or optionsand allow them to be selectable */}
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant="outline-primary"
            className="d-block mb-2"
            onClick={() => onAnswer(option)}
          >
            {option}
          </Button>
        ))}
        <p>You are using your {question.brainPart}</p>
      </Card.Body>
    </Card>
  );
};

export default QuestionCard;