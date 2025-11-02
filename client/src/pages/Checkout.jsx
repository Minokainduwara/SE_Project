import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Checkout = () => {
  const { cart, user, clearCart } = useContext(AuthContext);
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || ''
  });

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleInputChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const orderData = {
        shippingAddress,
        paymentMethod,
        cart,
        total: calculateTotal() + 50
      };

      await axios.post('/api/orders', orderData);
      await clearCart();
      navigate('/orders', { state: { message: 'Order placed successfully!' } });
    } catch (error) {
      setError(error.response?.data?.message || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={styles.container}>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/products')} style={styles.button}>
          Go to Products
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Checkout</h2>

      <div style={styles.content}>
        {/* Shipping Form Section */}
        <div style={styles.formSection}>
          <h3>Shipping Address</h3>
          {error && <div style={styles.error}>{error}</div>}

          <form style={styles.form} onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Street Address</label>
              <input
                type="text"
                name="street"
                value={shippingAddress.street}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.row}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>City</label>
                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>State</label>
                <input
                  type="text"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleInputChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Zip Code</label>
              <input
                type="text"
                name="zipCode"
                value={shippingAddress.zipCode}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            {/* Payment Method */}
            <h3>Payment Method</h3>
            <div style={styles.paymentOptions}>
              {['cash', 'card', 'upi'].map((method) => (
                <label key={method} style={styles.radioLabel}>
                  <input
                    type="radio"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  {method === 'cash'
                    ? 'Cash on Delivery'
                    : method === 'card'
                    ? 'Debit/Credit Card'
                    : 'UPI'}
                </label>
              ))}
            </div>

            <button type="submit" style={styles.submitButton} disabled={loading}>
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
        </div>

        {/* Order Summary Section */}
        <div style={styles.summary}>
          <h3>Order Summary</h3>

          <div style={styles.items}>
            {cart.map((item) => (
              <div key={item.productId} style={styles.summaryItem}>
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>₹{calculateTotal().toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Shipping:</span>
            <span>₹50.00</span>
          </div>
          <div style={styles.totalRow}>
            <span>Total:</span>
            <span>₹{(calculateTotal() + 50).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '0 2rem'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
    marginTop: '2rem'
  },
  formSection: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
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
  paymentOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem'
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem'
  },
  summary: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    height: 'fit-content'
  },
  items: {
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #eee'
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem'
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '0.5rem'
  },
  totalRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '2px solid #eee'
  },
  error: {
    backgroundColor: '#fee',
    color: '#c33',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem'
  },
  button: {
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '0.75rem 2rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  }
};

export default Checkout;
