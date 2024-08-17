import React, { useState, useEffect } from 'react';
import { getAllStudents, deleteStudent } from '../services/api';
import './DeleteStudent.css';

const DeleteStudent = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const result = await getAllStudents();
        setStudents(result.data[0]); // Adjusted for response structure
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async () => {
    if (selectedStudentId) {
      try {
        await deleteStudent(selectedStudentId);
        alert('Student deleted successfully!');
        setStudents(students.filter(student => student.id !== selectedStudentId));
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Error deleting student.');
      }
    } else {
      alert('Please select a student to delete.');
    }
  };

  return (
    <div className="delete-student">
      <h2>Delete Student</h2>
      <div className="select-box">
        <label htmlFor="student">Select Student:</label>
        <select
          id="student"
          value={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
        >
          <option value="">--Select a Student--</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>
              {student.fullname}
            </option>
          ))}
        </select>
      </div>
      <button onClick={handleDelete}>Delete Student</button>
    </div>
  );
};

export default DeleteStudent;
