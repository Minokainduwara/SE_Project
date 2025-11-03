import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/orders/my-orders', {
        withCredentials: true,
      });
      setOrders(res.data.orders || []);
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
      cancelled: '#e74c3c',
    };
    return colors[status?.toLowerCase()] || '#95a5a6';
  };

  const formatLKR = (amount) =>
    new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR' }).format(amount);

  // ✅ Cancel order function
  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await axios.patch(
        `http://localhost:5001/api/orders/cancel/${orderId}`,
        {},
        { withCredentials: true }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: 'cancelled' } : order
        )
      );
    } catch (error) {
      console.error('Error cancelling order:', error);
      alert('Failed to cancel order. Please try again.');
    }
  };

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading orders...</p>;
  }

  if (orders.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>No orders yet.</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Orders</h2>
      <div style={styles.orders}>
        {orders.map((order) => (
          <div key={order._id} style={styles.orderCard}>
            <div style={styles.orderHeader}>
              <div>
                <h3 style={styles.orderId}>Order #{order._id.slice(-8)}</h3>
                <p style={styles.date}>{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div
                  style={{
                    ...styles.status,
                    backgroundColor: getStatusColor(order.status),
                  }}
                >
                  {order.status.toUpperCase()}
                </div>
                {order.status.toLowerCase() !== 'cancelled' &&
                  order.status.toLowerCase() !== 'delivered' && (
                    <button
                      onClick={() => cancelOrder(order._id)}
                      style={{
                        padding: '0.3rem 0.7rem',
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                      }}
                    >
                      Cancel
                    </button>
                  )}
              </div>
            </div>

            <div style={styles.orderItems}>
              {order.items.map((item, idx) => (
                <div key={idx} style={styles.orderItem}>
                  <span>
                    {item.product?.name || 'Unknown Product'} x {item.quantity}
                  </span>
                  <span>{formatLKR(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div style={styles.orderFooter}>
              <div style={styles.shipping}>
                <strong>Shipping Address:</strong>
                <p>
                  {order.shippingAddress?.street || '-'}, {order.shippingAddress?.city || '-'},
                  {order.shippingAddress?.state || '-'} - {order.shippingAddress?.zipCode || '-'}
                </p>
              </div>
              <div style={styles.total}>
                <strong>Total:</strong> {formatLKR(order.totalAmount)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1100px',
    margin: '2rem auto',
    padding: '0 1rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2rem',
    color: '#333',
  },
  orders: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.8rem',
  },
  orderCard: {
    backgroundColor: '#fefefe',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s',
  },
  orderHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: '1rem',
    paddingBottom: '0.8rem',
    borderBottom: '1px solid #eee',
  },
  orderId: {
    fontSize: '1.1rem',
    color: '#222',
  },
  date: {
    color: '#888',
    fontSize: '0.85rem',
    marginTop: '0.25rem',
  },
  status: {
    padding: '0.4rem 0.9rem',
    borderRadius: '6px',
    color: 'white',
    fontSize: '0.85rem',
    fontWeight: '600',
    textAlign: 'center',
  },
  orderItems: {
    marginBottom: '1rem',
  },
  orderItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    borderBottom: '1px dashed #ddd',
  },
  orderFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: '1rem',
    borderTop: '1px solid #eee',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  shipping: {
    maxWidth: '70%',
    fontSize: '0.9rem',
    color: '#555',
  },
  total: {
    fontSize: '1.2rem',
    color: '#27ae60',
    fontWeight: '600',
  },
};

export default Orders;
