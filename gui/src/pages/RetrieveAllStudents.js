import React, { useState, useEffect } from 'react';
import { getAllStudents } from '../services/api'; // Import the API function
import './RetrieveAllStudents.css'; // Ensure this CSS file exists for styling

const RetrieveAllStudents = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const result = await getAllStudents(); // Call the API function
        console.log('API Response:', result); // Log the response to verify structure
        // Access the first element of the data array, which contains student objects
        if (result.data.length > 0) {
          setStudents(result.data[0]); 
        } else {
          setStudents([]); // Set to empty array if no data
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching students:', error); // Detailed error logging
        setError('Error fetching students. Please try again later.');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div>Loading...</div>; // Handle loading state
  if (error) return <div className="error-message">{error}</div>; // Display error if any

  return (
    <div className="retrieve-all-students">
      <h2>All Students</h2>
      <ul>
        {students.length > 0 ? (
          students.map((student) => (
            <li key={student.id}>
              {student.fullname || 'N/A'} - {student.email || 'N/A'} - {student.course_of_study || 'N/A'} - Year: {student.year || 'N/A'} - GPA: {student.GPA || 'N/A'}
            </li>
          ))
        ) : (
          <li>No students found</li> // Handle empty list scenario
        )}
      </ul>
    </div>
  );
};

export default RetrieveAllStudents;
