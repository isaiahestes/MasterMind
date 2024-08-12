import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import QuizPage from './components/QuizPage';
import EditQuestionsPage from './components/EditQuestionsPage';
import NavBar from './components/Nav';
import Landing from './components/Landing';

const App = () => {
  return (
    <Router>
      <div className="container mt-3">
        {/* Pulls over my navigation */}
        <NavBar />
        {/* This is my router section which allows us to navigate */}
        <Switch>
          <Route path="/take-quiz" component={QuizPage} />
          <Route path="/edit-questions" component={EditQuestionsPage} />
          <Route path="/" exact component={Landing} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;