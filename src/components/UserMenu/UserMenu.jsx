import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/auth/authSlice';
import styles from './UserMenu.module.css';

const UserMenu = () => {
  const email = useSelector((state) => state.auth.user?.email); 
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={styles.userMenu}>
      {email && (
        <>
          <p className={styles.userEmail}>{email}</p>
          <button className={styles.logoutButton} onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default UserMenu;
