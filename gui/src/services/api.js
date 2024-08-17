// src/services/api.js
import axios from 'axios';

const API_URL = ' http://127.0.0.1:8000/student/';  // Your FastAPI backend URL

// Function to add a student
export const addStudent = async (studentData) => {
  try {
    const response = await axios.post(API_URL, studentData);
    return response.data;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
};



// Function to retrieve all students
export const getAllStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data; // Ensure the response structure matches the expected format
    } catch (error) {
      console.error('Error retrieving students:', error);
      throw error; // Rethrow error to be caught in the component
    }
  };

// Function to retrieve a single student by ID
export const getStudentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving student:', error);
    throw error;
  }
};

// Function to update a student by ID
export const updateStudent = async (id, studentData) => {
  try {
    const response = await axios.put(`${API_URL}${id}`, studentData);
    return response.data;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

// Function to delete a student by ID
export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};
