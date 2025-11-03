import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { addToCart, user } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const handleAddToCart = async () => {
    if (!user) {
      setMessage('Please login to add items to cart');
      return;
    }

    try {
      await addToCart(product._id, quantity);
      setMessage('Added to cart!');
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      setMessage('Failed to add to cart');
    }
  };

  return (
    
      <>
      
        {product.name}
        {product.description}
        
          {product.category}
          ₹{product.price}/{product.unit}
        
        Stock: {product.stock}
        
        
          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            style={styles.input}
          />
          
            Add to Cart
          
        
        
        {message && {message}}
        </>
    
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    transition: 'transform 0.2s',
    backgroundColor: 'white'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  content: {
    padding: '1rem'
  },
  name: {
    fontSize: '1.2rem',
    margin: '0 0 0.5rem 0'
  },
  description: {
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '0.5rem'
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem'
  },
  category: {
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontSize: '0.8rem'
  },
  price: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#2ecc71'
  },
  stock: {
    fontSize: '0.9rem',
    color: '#666',
    marginBottom: '1rem'
  },
  actions: {
    display: 'flex',
    gap: '0.5rem'
  },
  input: {
    width: '60px',
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  button: {
    flex: 1,
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '0.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  message: {
    marginTop: '0.5rem',
    color: '#2ecc71',
    fontSize: '0.9rem'
  }
};

export default ProductCard;