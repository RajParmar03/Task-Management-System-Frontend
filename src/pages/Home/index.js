import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Task Manager</h1>
      <p>Organize your tasks efficiently with our task management application. Keep track of your tasks, set priorities, and stay productive!</p>
      <Link to="/login" className="login-button">Login</Link>
    </div>
  );
};

export default Home;
