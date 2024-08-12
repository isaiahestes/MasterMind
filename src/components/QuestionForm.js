import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import DeleteButton from './DeleteButton';

const QuestionForm = ({ show, handleClose, onSave, questionToEdit }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [brainPart, setBrainPart] = useState('');

  useEffect(() => {
    if (questionToEdit) {
      setQuestion(questionToEdit.question);
      setOptions(questionToEdit.options);
      setCorrectAnswer(questionToEdit.correctAnswer);
      setBrainPart(questionToEdit.brainPart);
    } else {
      resetForm();
    }
  }, [questionToEdit]);

  const resetForm = () => {
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    setBrainPart('');
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };
  const handleAddOption = () => {
    setOptions([...options, '']);
  };
  const handleDeleteOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    if (correctAnswer === options[index]) {
      setCorrectAnswer('');
    }
  };
  

  const handleSubmit = () => {
    const newQuestion = { question, options, correctAnswer,brainPart };
    // console.log('updated data',newQuestion)
    if (questionToEdit) {
      onSave(questionToEdit.id,newQuestion); // Edit existing question
    } else {
      onSave(null, newQuestion); // Add new question
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{questionToEdit ? 'Edit Question' : 'Add New Question'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formQuestion">
            <Form.Label>Question</Form.Label>
            <Form.Control
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Form.Group>
          {options.map((option, index) => (
            <Form.Group controlId={`formOption${index}`} key={index}>
              <Form.Label>Option {index + 1}</Form.Label>
              <Form.Control
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              
              <DeleteButton
                onDelete={() => handleDeleteOption(index)}
                item={index}
                label="Remove Option"
              />
            </Form.Group>
          ))}
          <Button
            variant="success"
            onClick={handleAddOption}
            className="mb-3"
          >
            Add Option
          </Button>
          <Form.Group controlId="formCorrectAnswer">
            <Form.Label>Correct Answer</Form.Label>
            <Form.Control
              as="select"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            >
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBrainPart">
            <Form.Label>Part of brain used</Form.Label>
            <Form.Control
              type="text"
              value={brainPart}
              onChange={(e) => setBrainPart(e.target.value)}
            >
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {questionToEdit ? "Save Question" : "Create Question"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuestionForm;