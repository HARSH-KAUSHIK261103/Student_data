import React, { useState, useEffect } from 'react';
import { getAllStudents, updateStudent } from '../services/api'; // Import necessary API functions
import './UpdateStudent.css'; // Ensure this CSS file exists for styling

const UpdateStudent = () => {
  const [students, setStudents] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [studentDetails, setStudentDetails] = useState({
    fullname: '',
    email: '',
    course_of_study: '',
    year: '',
    gpa: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const result = await getAllStudents(); // Call the API function to get all students
        if (result.data.length > 0) {
          setStudents(result.data[0]); // Set the student list
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

  useEffect(() => {
    if (selectedId) {
      const student = students.find(student => student.id === selectedId);
      if (student) {
        setStudentDetails(student);
      }
    }
  }, [selectedId, students]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    if (!selectedId) return;
    try {
      await updateStudent(selectedId, studentDetails); // Call API function to update student
      setMessage('Student updated successfully!');
    } catch (error) {
      console.error('Error updating student:', error);
      setError('Error updating student. Please try again later.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="update-student">
      <h2>Update Student</h2>
      <div>
        <label htmlFor="student-select">Select Student: </label>
        <select id="student-select" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          <option value="">Select a student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.fullname}
            </option>
          ))}
        </select>
      </div>
      {selectedId && (
        <div>
          <label>
            Full Name:
            <input type="text" name="fullname" value={studentDetails.fullname} onChange={handleInputChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={studentDetails.email} onChange={handleInputChange} />
          </label>
          <label>
            Course of Study:
            <input type="text" name="course_of_study" value={studentDetails.course_of_study} onChange={handleInputChange} />
          </label>
          <label>
            Year:
            <input type="number" name="year" value={studentDetails.year} onChange={handleInputChange} />
          </label>
          <label>
            GPA:
            <input type="number" step="0.1" name="gpa" value={studentDetails.gpa} onChange={handleInputChange} />
          </label>
          <button onClick={handleUpdate}>Update Student</button>
        </div>
      )}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default UpdateStudent;
