import React from 'react';
import './Header.css'; // Create CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <img src="logo.png" alt="Logo" className="logo" />
      <h1>Student Management Software</h1>
    </header>
  );
};

export default Header;