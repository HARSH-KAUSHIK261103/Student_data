import React, { useState, useEffect } from 'react';
import { getAllStudents, getStudentById } from '../services/api'; // Import the necessary API functions
import './RetrieveStudent.css'; // Ensure this CSS file exists for styling

const RetrieveStudent = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(''); // State to hold selected student ID

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const result = await getAllStudents(); // Call the API function to get all students
        
        // Since the result.data contains an array inside an array, access it properly
        if (result.data && result.data.length > 0 && Array.isArray(result.data[0])) {
          setStudents(result.data[0]); // Set the student list from the inner array
        } else {
          setError('No students found.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error);
        setError('Error fetching students. Please try again later.');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleSelectChange = async (event) => {
    const id = event.target.value;
    setSelectedId(id); // Update the selected ID
    if (id) {
      try {
        const result = await getStudentById(id); // Fetch student details by ID

        // Access the student data directly
        if (result.data) {
          setSelectedStudent(result.data); // Set selected student details
          setError(''); // Clear any error message
        } else {
          setError('Student not found');
          setSelectedStudent(null);
        }
      } catch (error) {
        console.error('Error fetching student:', error);
        setError('Error fetching student details. Please try again later.');
        setSelectedStudent(null);
      }
    } else {
      setSelectedStudent(null); // Clear selection if no ID
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="retrieve-student">
      <h2>Retrieve Student</h2>
      <div>
        <label htmlFor="student-select">Select Student: </label>
        <select id="student-select" value={selectedId} onChange={handleSelectChange}>
          <option value="">Select a student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.fullname}
            </option>
          ))}
        </select>
      </div>
      {selectedStudent && (
        <div className="student-details">
          <h3>Student Details</h3>
          <p><strong>Full Name:</strong> {selectedStudent.fullname}</p>
          <p><strong>Email:</strong> {selectedStudent.email}</p>
          <p><strong>Course of Study:</strong> {selectedStudent.course_of_study}</p>
          <p><strong>Year:</strong> {selectedStudent.year}</p>
          <p><strong>GPA:</strong> {selectedStudent.GPA}</p>
        </div>
      )}
    </div>
  );
};

export default RetrieveStudent;
