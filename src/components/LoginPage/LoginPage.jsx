import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }))
    .then(() => {
      navigate('../ContactsPage/ContactsPage.jsx');  
    })
    .catch((err) => {
      console.error("Login failed", err);
    });
  };
  

  return (
    <div className={styles.loginPage}>
      <h2 className={styles.formHeader}>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Email:
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className={styles.input}
          />
        </label>
        <label className={styles.label}>Password:
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className={styles.input}
          />
        </label>
        {loading && <p>Loading...</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
};


export default LoginPage;
