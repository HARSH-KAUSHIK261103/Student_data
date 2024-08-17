import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css'; // Create CSS file for styling

const Card = ({ title, path }) => {
  return (
    <div className="card">
      <Link to={path}>{title}</Link>
    </div>
  );
};

export default Card;