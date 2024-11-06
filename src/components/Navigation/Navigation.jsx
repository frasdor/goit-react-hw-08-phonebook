import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserMenu from '../UserMenu/UserMenu';

const Navigation = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Sprawdzenie, czy użytkownik jest zalogowany

  return (
    <nav>
      <Link to="/contacts">Contacts</Link>
      {!isAuthenticated ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <UserMenu /> 
      )}
    </nav>
  );
};

export default Navigation;
