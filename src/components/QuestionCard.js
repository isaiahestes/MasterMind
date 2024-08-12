import React from 'react';
import { Button, Card } from 'react-bootstrap';

const QuestionCard = ({ question, onAnswer }) => {
  return (
    <Card className="mb-3 qCard bg-dark text-white">
      <Card.Body>
        <Card.Title>{question.question}</Card.Title>
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