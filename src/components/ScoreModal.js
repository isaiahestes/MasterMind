import React from 'react';
import { Modal, Button } from 'react-bootstrap';
// This is the score modal I don't know if this is really needed but i needed another componant

const ScoreModal = ({ show, handleClose, score, totalQuestions }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Your Score</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>
          You scored {score} out of {totalQuestions}!
        </h4>
        <p>{(score / totalQuestions) * 100}%</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ScoreModal;