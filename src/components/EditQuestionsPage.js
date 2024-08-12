import React, { useState, useEffect } from 'react';
import ApiService from './ApiService';
import QuestionForm from './QuestionForm';
import DeleteButton from './DeleteButton';
// This page lists out all of my questions and allows me to start editing them if I need to
const EditQuestionsPage = () => {
  const [questions, setQuestions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState(null);
  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const data = await ApiService.getAllQuestions();
    setQuestions(data);
  };

  const handleAddQuestion = () => {
    // console.log("handleAddQuestion setting questionToEdit to null")
    setQuestionToEdit(null);
    setShowForm(true);
  };

  const handleEditQuestion = (question) => {
    // console.log("handleEditQuestion taking in question: ", question)
    setQuestionToEdit(question);
    // console.log("question to edit",questionToEdit)
    setShowForm(true);
  };
  
  const handleSaveQuestion = async (id,question) => {
    // console.log('handleSaveQuestion ran', question)
    if (id) {
      // console.log('hsq update, ', question)
      await ApiService.updateQuestion(id, question);
    } else {
      // console.log('hsq create, ', question)
      await ApiService.createQuestion(question);
    }
    fetchQuestions();
  };
  const handleDeleteQuestion = async (question) => {
    await ApiService.deleteQuestion(question.id);
    fetchQuestions();
  };

  return (
    <div className="container adminPage">
      <button className="btn btn-primary mb-3" onClick={handleAddQuestion}>
        Add Question
      </button>
      <div id="app">
        {questions.map((question, index) => (
          <div key={question.id} className="mb-3">
            <h5>{question.question}</h5>
            <button
              className="btn btn-secondary"
              onClick={() => handleEditQuestion(question)}
            >
              Edit
            </button>
            <DeleteButton
              onDelete={handleDeleteQuestion}
              item={question}
              label="Delete Question"
            />
          </div>
        ))}
      </div>
      <QuestionForm
        show={showForm}
        handleClose={() => setShowForm(false)}
        onSave={handleSaveQuestion}
        questionToEdit={questionToEdit}
      />
    </div>
  );
};

export default EditQuestionsPage;