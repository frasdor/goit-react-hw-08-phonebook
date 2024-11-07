import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import RegisterPage from '../RegisterPage/RegisterPage';
import LoginPage from '../LoginPage/LoginPage';
import ContactsPage from '../ContactsPage/ContactsPage';
import Navigation from '../Navigation/Navigation'; 
import { useSelector } from 'react-redux';
import styles from './App.module.css';

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user); 

  return (
    <div className={styles.appContainer}>
      <Router>
        <Navigation />
        <header>
          {isAuthenticated && user && (
            <div className={styles.welcomeMessage}>
              <h1>Welcome, {user.name}</h1>
            </div>
          )}
        </header>
        <main>
          <Routes>
            <Route path="/register" element={<RegisterPage />} />
            {isAuthenticated ? (
              <Route
                path="/login"
                element={<Navigate to="/contacts" />} 
              />
            ) : (
              <Route path="/login" element={<LoginPage />} /> 
            )}
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/contacts"
              element={isAuthenticated ? <ContactsPage /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};


export default App;
