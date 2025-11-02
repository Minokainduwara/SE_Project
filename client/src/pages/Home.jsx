import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
        <>
      
        Welcome to Fresh Grocery Store
        
          Fresh vegetables, fruits, and daily essentials delivered to your doorstep
        
        
          Shop Now
        
      

      
        
          🥬
          Fresh Products
          Daily fresh vegetables and fruits
        
        
          🚚
          Fast Delivery
          Get your order delivered in 2-3 hours
        
        
          💳
          Secure Payment
          Multiple payment options available
        
      
          </>
    
  );
};

const styles = {
  container: {
    minHeight: '80vh'
  },
  hero: {
    textAlign: 'center',
    padding: '4rem 2rem',
    backgroundColor: '#f8f9fa'
  },
  title: {
    fontSize: '2.5rem',
    color: '#2ecc71',
    marginBottom: '1rem'
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '2rem'
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#2ecc71',
    color: 'white',
    padding: '1rem 3rem',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '1.1rem'
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    margin: '4rem auto',
    padding: '0 2rem'
  },
  feature: {
    textAlign: 'center',
    padding: '2rem'
  },
  icon: {
    fontSize: '3rem',
    display: 'block',
    marginBottom: '1rem'
  }
};

export default Home;