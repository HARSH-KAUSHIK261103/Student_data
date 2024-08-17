import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import AddStudent from './pages/AddStudent';
import RetrieveAllStudents from './pages/RetrieveAllStudents';
import RetrieveStudent from './pages/RetrieveStudent';
import DeleteStudent from './pages/DeleteStudent';
import UpdateStudent from './pages/UpdateStudent';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/retrieve-all-students" element={<RetrieveAllStudents />} />
        {/* <Route path="/retrieve-student" element={<RetrieveStudent />} /> */}
        <Route path="/delete-student" element={<DeleteStudent />} />
        <Route path="/update-student" element={<UpdateStudent />} />
      </Routes>
    </Router>
  );
};

export default App;