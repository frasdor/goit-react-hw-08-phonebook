import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';
import ContactsPage from '../ContactsPage/ContactsPage';
import Navigation from '../Navigation/Navigation'; 
import { useSelector } from 'react-redux';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user); 

  return (
    <Router>
      <Navigation /> 
      <div>
        {isAuthenticated && user && (
          <div>
            <p>Welcome, {user.name}</p> 
          </div>
        )}
      </div>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/contacts"
          element={isAuthenticated ? <ContactsPage /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};


export default App;
