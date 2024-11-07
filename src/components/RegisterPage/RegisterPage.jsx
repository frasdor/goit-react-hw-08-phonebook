import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/authSlice';
import styles from './RegisterPage.module.css';

function RegisterPage() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
        name: name,
        email: email,
        password: password,
      };
    dispatch(registerUser(userData));
  };

  return (
    <div className={styles.registerPage}>
      <h2 className={styles.formHeader}>Register</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
