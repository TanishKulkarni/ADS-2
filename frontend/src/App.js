import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TeacherLogin from './components/TeacherLogin';
import StudentLogin from './components/StudentLogin';
import Dashboard from './components/Dashboard';
import ClassPage from './components/ClassPage';
import CreateQuiz from './components/CreateQuiz';
import StudentQuizPage from './components/StudentQuizPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/teacher-login" component={TeacherLogin} />
        <Route path="/student-login" component={StudentLogin} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/class/:classId" component={ClassPage} />
        <Route path="/create-quiz" component={CreateQuiz} />
        <Route path="/student-quiz" component={StudentQuizPage} />
      </Switch>
    </Router>
  );
}

export default App;
