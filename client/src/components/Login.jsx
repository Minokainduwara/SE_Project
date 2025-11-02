import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
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
      await login(formData.email, formData.password);
      navigate('/products');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (

    <>
    
      
        Login
        
        {error && {error}}
        
        
          
            Email
            
          

          
            Password
            
          

          
            Login
          
        

        
          Don't have an account? Register
        
          </>
    
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

export default Login;