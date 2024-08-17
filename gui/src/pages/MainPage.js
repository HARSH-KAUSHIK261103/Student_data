import React from 'react';
import Card from '../components/Card';
import Header from '../components/Header';
import './MainPage.css'; // Create CSS file for styling

const MainPage = () => {
  return (
    <div className="main-page">
      <Header />
      <div className="cards-container">
        <Card title="Add a Student" path="/add-student" />
        <Card title="Retrieve All Students" path="/retrieve-all-students" />
        {/* <Card title="Retrieve a Student" path="/retrieve-student" /> */}
        <Card title="Delete Student" path="/delete-student" />
        <Card title="Update Student" path="/update-student" />
      </div>
    </div>
  );
};

export default MainPage;