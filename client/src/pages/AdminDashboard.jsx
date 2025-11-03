import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("users");

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "admin") return <Navigate to="/products" />;

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Admin Panel 👑</h2>
        <button
          style={activeTab === "users" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
        <button
          style={activeTab === "products" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>
        <button
          style={activeTab === "orders" ? styles.activeTab : styles.tab}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>
      </div>

      <div style={styles.content}>
        {activeTab === "users" && <UserManagement />}
        {activeTab === "products" && <ProductManagement />}
        {activeTab === "orders" && <OrderOverview />}
      </div>
    </div>
  );
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("/api/admin/users");
    setUsers(res.data.users);
  };

  const changeRole = async (id, newRole) => {
    await axios.put(`/api/admin/users/${id}`, { role: newRole });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Manage Users</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {u.role === "admin" ? (
                  <button
                    style={styles.demote}
                    onClick={() => changeRole(u._id, "user")}
                  >
                    Demote
                  </button>
                ) : (
                  <button
                    style={styles.promote}
                    onClick={() => changeRole(u._id, "admin")}
                  >
                    Promote
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    const res = await axios.get("/api/admin/products");
    setProducts(res.data.products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`/api/admin/products/${editId}`, form);
    } else {
      await axios.post("/api/admin/products", form);
    }
    setForm({ name: "", price: "", description: "" });
    setEditId(null);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/admin/products/${id}`);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
    });
    setEditId(product._id);
  };

  return (
    <div>
      <h2>Manage Products</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (Rs)</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.description}</td>
              <td>
                <button style={styles.edit} onClick={() => handleEdit(p)}>
                  Edit
                </button>
                <button style={styles.delete} onClick={() => handleDelete(p._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const OrderOverview = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await axios.get("/api/admin/orders");
    setOrders(res.data.orders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Order Overview</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((o) => (
              <tr key={o._id}>
                <td>{o._id}</td>
                <td>{o.user?.email}</td>
                <td>{o.total} Rs</td>
                <td>{o.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No orders found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// 💅 Styling
const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
  },
  sidebar: {
    width: "220px",
    backgroundColor: "#2c3e50",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem",
  },
  logo: {
    marginBottom: "2rem",
    fontSize: "1.5rem",
  },
  tab: {
    background: "none",
    color: "white",
    border: "none",
    margin: "0.5rem 0",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
  },
  activeTab: {
    backgroundColor: "#34495e",
    color: "#ecf0f1",
    border: "none",
    margin: "0.5rem 0",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    width: "100%",
    textAlign: "left",
  },
  content: {
    flex: 1,
    padding: "2rem",
    backgroundColor: "#f8f9fa",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
  },
  form: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  edit: {
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    padding: "5px 10px",
    marginRight: "5px",
    cursor: "pointer",
  },
  delete: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
  promote: {
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
  demote: {
    backgroundColor: "#e67e22",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default AdminDashboard;
