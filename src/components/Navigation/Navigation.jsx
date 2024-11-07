import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserMenu from '../UserMenu/UserMenu';
import styles from'./Navigation.module.css'

const Navigation = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Sprawdzenie, czy użytkownik jest zalogowany

  return (
    <nav className={styles.nav}>
      <Link to="/contacts" className={styles.navLink}>Contacts</Link>
      {!isAuthenticated ? (
        <>
          <Link to="/login" className={styles.navLink}>Login</Link>
          <Link to="/register" className={styles.navLink}>Register</Link>
        </>
      ) : (
        <UserMenu />
      )}
    </nav>
  );
};

export default Navigation;
