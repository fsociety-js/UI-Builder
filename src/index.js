// src/index.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import LoginForm from './Components/LoginForm';
import ProtectedPage from './Components/ProtectedPage'; // Ensure this path is correct
import reportWebVitals from './reportWebVitals';

const MainApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        {/* If user is not logged in, show LoginForm */}
        {!isLoggedIn ? (
          <Route path="/" element={<LoginForm onLoginSuccess={handleLoginSuccess} />} />
        ) : (
          <>
            {/* After login, show ProtectedPage */}
            <Route path="/protected" element={<ProtectedPage />} />
            <Route path="/" element={<ProtectedPage />} /> {/* Default route after login */}
          </>
        )}
      </Routes>
    </Router>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);

// Measure performance
reportWebVitals();
