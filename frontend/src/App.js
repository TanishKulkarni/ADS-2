import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TeacherLogin from './components/TeacherLogin';
import StudentLogin from './components/StudentLogin';
import Dashboard from './components/Dashboard';
import ClassPage from './components/ClassPage';
import CreateQuiz from './components/CreateQuiz';
import StudentQuizPage from './components/StudentQuizPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/class/:classId" element={<ClassPage />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/student-quiz" element={<StudentQuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
