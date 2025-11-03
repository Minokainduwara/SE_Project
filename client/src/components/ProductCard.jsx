import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { addToCart, user, cart } = useContext(AuthContext);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');
  const [stockLeft, setStockLeft] = useState(product.stock);

  // Show current quantity in cart
  useEffect(() => {
    const cartItem = cart.find((item) => item.productId === product._id);
    if (cartItem) setStockLeft(product.stock - cartItem.quantity);
    else setStockLeft(product.stock);
  }, [cart, product]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2
    }).format(price);
  };

  const handleAddToCart = async () => {
    if (!user) {
      setMessage('Please login to add items to cart');
      return;
    }
    if (quantity > stockLeft) {
      setMessage('Cannot add more than available stock');
      return;
    }
    try {
      await addToCart(product._id, quantity);
      setMessage('Added to cart!');
      setQuantity(1); // reset input
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to add to cart');
    }
  };

  return (
    <div style={styles.card}>
      <img
        src={product.image.startsWith('http') ? product.image : `http://localhost:5001/uploads/${product.image}`}
        alt={product.name}
        style={styles.image}
      />
      <div style={styles.content}>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.description}>{product.description}</p>
        <div style={styles.details}>
          <span style={styles.category}>{product.category}</span>
          <span style={styles.price}>{formatPrice(product.price)} / {product.unit}</span>
        </div>
        <p style={styles.stock}>Stock left: {stockLeft}</p>
        <div style={styles.actions}>
          <input
            type="number"
            min="1"
            max={stockLeft}
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            style={styles.input}
          />
          <button onClick={handleAddToCart} style={styles.button}>
            Add to Cart
          </button>
        </div>
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

const styles = {
  card: { border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', transition: 'transform 0.2s', backgroundColor: 'white' },
  image: { width: '100%', height: '200px', objectFit: 'cover' },
  content: { padding: '1rem' },
  name: { fontSize: '1.2rem', margin: '0 0 0.5rem 0' },
  description: { color: '#666', fontSize: '0.9rem', marginBottom: '0.5rem' },
  details: { display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' },
  category: { backgroundColor: '#e8f5e9', color: '#2e7d32', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' },
  price: { fontSize: '1.1rem', fontWeight: 'bold', color: '#2ecc71' },
  stock: { fontSize: '0.9rem', color: '#666', marginBottom: '1rem' },
  actions: { display: 'flex', gap: '0.5rem' },
  input: { width: '60px', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' },
  button: { flex: 1, backgroundColor: '#2ecc71', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' },
  message: { marginTop: '0.5rem', color: '#2ecc71', fontSize: '0.9rem' }
};

export default ProductCard;
