import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/orders/my-orders');
      setOrders(res.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f39c12',
      processing: '#3498db',
      shipped: '#9b59b6',
      delivered: '#2ecc71',
      cancelled: '#e74c3c'
    };
    return colors[status] || '#95a5a6';
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div style={styles.container}>
      <h2>My Orders</h2>

      {location.state?.message && (
        <div style={styles.successMessage}>
          {location.state.message}
        </div>
      )}

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div style={styles.orders}>
          {orders.map((order) => (
            <div key={order._id} style={styles.orderCard}>
              <div style={styles.orderHeader}>
                <div>
                  <h3>Order #{order._id.slice(-8)}</h3>
                  <p style={styles.date}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div
                  style={{
                    ...styles.status,
                    backgroundColor: getStatusColor(order.status)
                  }}
                >
                  {order.status.toUpperCase()}
                </div>
              </div>

              <div style={styles.orderItems}>
                {order.items.map((item, index) => (
                  <div key={index} style={styles.orderItem}>
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div style={styles.orderFooter}>
                <div>
                  <strong>Shipping Address:</strong>
                  <p>
                    {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zipCode}
                  </p>
                </div>
                <div style={styles.total}>
                  <strong>Total:</strong> ₹{order.totalAmount.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '2rem auto',
    padding: '0 2rem'
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem'
  },
  orders: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem'
  },
  orderCard: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #eee'
  },
  date: {
    color: '#666',
    fontSize: '0.9rem',
    marginTop: '0.25rem'
  },
  status: {
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    color: 'white',
    fontSize: '0.9rem',
    fontWeight: 'bold'
  },
  orderItems: {
    marginBottom: '1rem'
  },
  orderItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0'
  },
  orderFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'end',
    paddingTop: '1rem',
    borderTop: '1px solid #eee'
  },
  total: {
    fontSize: '1.2rem',
    color: '#2ecc71'
  }
};

export default Orders;
