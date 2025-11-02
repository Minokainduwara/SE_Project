import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await register(formData);
      navigate('/products');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2 style={styles.title}>Register</h2>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="name" style={styles.label}>Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              style={styles.input}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              style={styles.input}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="phone" style={styles.label}>Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              style={styles.input}
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              style={styles.input}
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" style={styles.button}>Register</button>
        </form>

        <p style={styles.linkText}>
          Already have an account?{' '}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem'
  },
  formWrapper: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px'
  },
  title: {
    textAlign: 'center',
    marginBottom: '2rem'
  },
  error: {
    backgroundColor: '#fee',
    color: '#c33',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: '500'
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  button: {
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem'
  },
  linkText: {
    textAlign: 'center',
    marginTop: '1rem'
  },
  link: {
    color: '#2ecc71',
    textDecoration: 'none'
  }
};

export default Register;
