// src/pages/AddStudent.js
import React, { useState } from 'react';
import axios from 'axios';
import './AddStudent.css';

const AddStudent = () => {
  const [data, setData] = useState({
    fullname: '',
    email: '',
    course_of_study: '',
    year: '',
    gpa: ''
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/student/', data);
      alert('Student added successfully');
    } catch (error) {
      console.error('Error while saving student', error);
      alert('Error while saving student');
    }
  };

  return (
    <div className="add-student">
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullname" value={data.fullname} onChange={handleChange} placeholder="Full Name" />
        <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="Email" />
        <input type="text" name="course_of_study" value={data.course_of_study} onChange={handleChange} placeholder="Course of Study" />
        <input type="number" name="year" value={data.year} onChange={handleChange} placeholder="Year" min="1" max="8" />
        <input type="number" name="gpa" value={data.gpa} onChange={handleChange} placeholder="GPA" step="0.1" min="0" max="4" />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
