import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, updateCartItem, removeFromCart } = useContext(AuthContext);
  const navigate = useNavigate();

  // Format price in LKR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2
    }).format(price);
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartItem(productId, newQuantity);
  };

  const handleRemove = (productId) => {
    if (window.confirm('Remove this item from cart?')) {
      removeFromCart(productId);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div style={styles.empty}>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/products')} style={styles.shopButton}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Shopping Cart</h2>

      <div style={styles.cartItems}>
        {cart.map((item) => (
          <div key={item.productId} style={styles.cartItem}>
            <div style={styles.itemDetails}>
              <h4>{item.name}</h4>
              <p style={styles.price}>{formatPrice(item.price)}</p>
              <div style={styles.quantity}>
                <button
                  onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                  style={styles.qtyButton}
                >
                  -
                </button>
                <span style={styles.qtyText}>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                  style={styles.qtyButton}
                >
                  +
                </button>
              </div>
            </div>

            <div style={styles.subtotal}>{formatPrice(item.price * item.quantity)}</div>

            <button
              onClick={() => handleRemove(item.productId)}
              style={styles.removeButton}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div style={styles.summary}>
        <h3>Order Summary</h3>
        <div style={styles.summaryRow}>
          <span>Subtotal:</span>
          <span>{formatPrice(calculateTotal())}</span>
        </div>
        <div style={styles.summaryRow}>
          <span>Shipping:</span>
          <span>{formatPrice(50)}</span>
        </div>
        <div style={styles.totalRow}>
          <span>Total:</span>
          <span>{formatPrice(calculateTotal() + 50)}</span>
        </div>
        <button style={styles.checkoutButton} onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '1200px', margin: '2rem auto', padding: '0 2rem' },
  empty: { textAlign: 'center', padding: '3rem' },
  shopButton: { backgroundColor: '#2ecc71', color: 'white', border: 'none', padding: '0.75rem 2rem', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', marginTop: '1rem' },
  cartItems: { marginBottom: '2rem' },
  cartItem: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'white', borderRadius: '8px', marginBottom: '1rem', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  itemDetails: { flex: 1 },
  price: { color: '#666', marginTop: '0.5rem' },
  quantity: { display: 'flex', alignItems: 'center', gap: '0.5rem' },
  qtyButton: { width: '30px', height: '30px', border: '1px solid #ddd', backgroundColor: 'white', cursor: 'pointer', borderRadius: '4px' },
  qtyText: { minWidth: '30px', textAlign: 'center' },
  subtotal: { fontWeight: 'bold', minWidth: '100px', textAlign: 'right' },
  removeButton: { backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' },
  summary: { backgroundColor: 'white', padding: '2rem', borderRadius: '8px', maxWidth: '400px', marginLeft: 'auto' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' },
  totalRow: { display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '1rem', paddingTop: '1rem', borderTop: '2px solid #eee' },
  checkoutButton: { width: '100%', backgroundColor: '#2ecc71', color: 'white', border: 'none', padding: '1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', marginTop: '1rem' }
};

export default Cart;
