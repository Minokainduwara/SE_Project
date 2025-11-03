import React from "react";

const OrderModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={styles.title}>Order Details</h2>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Customer:</strong> {order.customer}</p>
        <p><strong>Total:</strong> {order.total}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Date:</strong> {order.date}</p>

        <h3 style={{ marginTop: "15px" }}>Items:</h3>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>
              {item.name} - {item.qty} × {item.price}
            </li>
          ))}
        </ul>

        <button style={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    width: "400px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    fontFamily: "Poppins, sans-serif",
  },
  title: {
    marginBottom: "15px",
    fontWeight: "600",
    color: "#333",
  },
  closeBtn: {
    backgroundColor: "#4a90e2",
    color: "#fff",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "15px",
  },
};

export default OrderModal;
