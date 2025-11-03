// AdminDashboard.jsx
import React, { useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";



// axios defaults
axios.defaults.baseURL = "http://localhost:5001/api";
axios.defaults.withCredentials = true;

/* ---------- Helper: try admin route then fallback ---------- */
async function apiTryAdmin(method, path, data = null, config = {}) {
    try {
        const adminPath = `/admin${path}`;
        return await axios.request({ method, url: adminPath, data, ...config });
    } catch (err) {

        try {
            return await axios.request({ method, url: path, data, ...config });
        } catch (err2) {
            throw err2;
        }
    }
}

/* ---------- Small Canvas Bar Chart for Orders by Status ---------- */
const OrdersStatusChart = ({ orders }) => {
    const canvasRef = React.useRef(null);

    const counts = useMemo(() => {
        const map = { Pending: 0, Processing: 0, Shipped: 0, Delivered: 0, Cancelled: 0 };
        orders.forEach((o) => {
            const s = o.status || "Pending";
            if (!map[s]) map[s] = 0;
            map[s]++;
        });
        return map;
    }, [orders]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const keys = Object.keys(counts);
        const values = keys.map((k) => counts[k]);

        // clear
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // simple bar chart
        const padding = 20;
        const w = canvas.width - padding * 2;
        const h = canvas.height - padding * 2;
        const barW = w / keys.length - 10;
        const max = Math.max(1, ...values);

        keys.forEach((key, i) => {
            const val = values[i];
            const barH = (val / max) * (h - 20);
            const x = padding + i * (barW + 10);
            const y = padding + (h - barH);

            // color by status
            const colorMap = {
                Pending: "#f1c40f",
                Processing: "#3498db",
                Shipped: "#6c8ebf",
                Delivered: "#2ecc71",
                Cancelled: "#e74c3c",
            };
            ctx.fillStyle = colorMap[key] || "#95a5a6";
            ctx.fillRect(x, y, barW, barH);

            // labels
            ctx.fillStyle = "#333";
            ctx.font = "12px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(key, x + barW / 2, padding + h + 14);
            ctx.fillText(String(val), x + barW / 2, y - 6);
        });
    }, [counts]);

    return <canvas ref={canvasRef} width={600} height={200} style={{ maxWidth: "100%" }} />;
};

/* ---------- Main Component ---------- */
const AdminDashboard = () => {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("dashboard");

    if (!user) return <Navigate to="/login" />;
    if (user.role !== "admin") return <Navigate to="/products" />;

    return (
        <div style={styles.container}>
            <aside style={styles.sidebar}>
                <h2 style={styles.logo}>Admin Panel 👑</h2>

                <button
                    style={activeTab === "dashboard" ? styles.activeTab : styles.tab}
                    onClick={() => setActiveTab("dashboard")}
                >
                    📊 Dashboard
                </button>

                <button
                    style={activeTab === "users" ? styles.activeTab : styles.tab}
                    onClick={() => setActiveTab("users")}
                >
                    👥 Users
                </button>

                <button
                    style={activeTab === "products" ? styles.activeTab : styles.tab}
                    onClick={() => setActiveTab("products")}
                >
                    📦 Products
                </button>

                <button
                    style={activeTab === "orders" ? styles.activeTab : styles.tab}
                    onClick={() => setActiveTab("orders")}
                >
                    🛒 Orders
                </button>
            </aside>

            <main style={styles.content}>
                {activeTab === "dashboard" && <DashboardView />}
                {activeTab === "users" && <UserManagement />}
                {activeTab === "products" && <ProductManagement />}
                {activeTab === "orders" && <OrderOverview />}
            </main>
        </div>
    );
};

/* ---------- DASHBOARD VIEW (summary + small charts) ---------- */
const DashboardView = () => {
    const [counts, setCounts] = useState({
        users: 0,
        products: 0,
        orders: 0,
        revenue: 0,
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSummary = async () => {
        try {
            setLoading(true);

            // users
            const usersRes = await apiTryAdmin("get", "/users").catch(() => null);
            const users = usersRes?.data?.users || usersRes?.data || [];

            // products
            const productsRes = await apiTryAdmin("get", "/products").catch(() =>
                axios.get("/products").catch(() => null)
            );
            const products = productsRes?.data?.products || productsRes?.data?.product || [];

            // orders
            const ordersRes = await apiTryAdmin("get", "/orders").catch(() =>
                axios.get("/orders").catch(() => null)
            );
            const orders = ordersRes?.data?.orders || [];

            // calculate revenue (sum totalAmount or total)
            let revenue = 0;
            orders.forEach((o) => {
                revenue += o.totalAmount ?? o.total ?? 0;
            });

            setCounts({
                users: Array.isArray(users) ? users.length : 0,
                products: Array.isArray(products) ? products.length : 0,
                orders: Array.isArray(orders) ? orders.length : 0,
                revenue,
            });

            setRecentOrders(orders.slice(0, 6));
        } catch (err) {
            console.error("Summary fetch failed", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSummary();
    }, []);

    return (
        <div>
            <div style={styles.header}>
                <h2>Admin Dashboard</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 16, marginBottom: 20 }}>
                <SummaryCard title="Total Users" value={counts.users} />
                <SummaryCard title="Total Products" value={counts.products} />
                <SummaryCard title="Total Orders" value={counts.orders} />
                <SummaryCard title="Revenue (Rs)" value={counts.revenue} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 20 }}>
                <div style={{ background: "white", padding: 16, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                    <h3 style={{ marginTop: 0 }}>Recent Orders</h3>
                    <div style={{ overflowX: "auto" }}>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th>Order</th>
                                    <th>User</th>
                                    <th>Items</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.length > 0 ? (
                                    recentOrders.map((o) => (
                                        <tr key={o._id}>
                                            <td style={styles.orderId}>#{o._id.slice(-8)}</td>
                                            <td>{o.user?.email || o.user?.name || "N/A"}</td>
                                            <td>{o.items?.length ?? 0}</td>
                                            <td style={styles.price}>Rs {o.totalAmount ?? o.total ?? 0}</td>
                                            <td>
                                                <span style={{ ...styles.statusBadge, ...getStatusStyle(o.status) }}>{o.status}</span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="5" style={{ padding: 16 }}>No orders yet</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div style={{ background: "white", padding: 16, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                    <h3 style={{ marginTop: 0 }}>Orders by Status</h3>
                    <OrdersStatusChart orders={recentOrders} />
                </div>
            </div>
        </div>
    );
};

const SummaryCard = ({ title, value }) => (
    <div style={{ background: "white", padding: 16, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ fontSize: 14, color: "#7f8c8d" }}>{title}</div>
        <div style={{ fontSize: 24, fontWeight: "700", marginTop: 8 }}>{value}</div>
    </div>
);

/* ---------- USER MANAGEMENT ---------- */
const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await apiTryAdmin("get", "/users");
            // many admin endpoints return { users: [...] } — handle both shapes
            const data = res?.data?.users ?? res?.data ?? [];
            setUsers(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch users", err);
            alert("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const changeRole = async (id, newRole) => {
        try {
            await apiTryAdmin("put", `/users/${id}`, { role: newRole });
            await fetchUsers();
        } catch (err) {
            console.error("Change role failed", err);
            alert("Failed to change role");
        }
    };

    const deleteUser = async (id) => {
        if (!window.confirm("Delete user? This is permanent.")) return;
        try {
            await apiTryAdmin("delete", `/users/${id}`);
            await fetchUsers();
        } catch (err) {
            console.error("Delete user failed", err);
            alert("Failed to delete user");
        }
    };

    if (loading) return <div style={styles.loading}>Loading users...</div>;

    return (
        <div>
            <div style={styles.header}>
                <h2>Manage Users</h2>
                <span style={styles.badge}>{users.length} users</span>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Joined</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u._id}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>
                                    <span style={u.role === "admin" ? styles.adminBadge : styles.userBadge}>{u.role}</span>
                                </td>
                                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div style={styles.actionButtons}>
                                        {u.role === "admin" ? (
                                            <button style={styles.demote} onClick={() => changeRole(u._id, "user")}>Demote</button>
                                        ) : (
                                            <button style={styles.promote} onClick={() => changeRole(u._id, "admin")}>Promote</button>
                                        )}
                                        <button style={styles.delete} onClick={() => deleteUser(u._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

/* ---------- PRODUCT MANAGEMENT ---------- */
const ProductManagement = () => {
    const blank = { name: "", description: "", price: "", category: "", stock: "", image: "" };
    const [products, setProducts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState(blank);
    const [editId, setEditId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            // prefer admin products endpoint but fallback
            const res = await apiTryAdmin("get", "/products");
            const data = res?.data?.products ?? res?.data?.product ?? res?.data ?? [];
            setProducts(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Fetch products failed", err);
            alert("Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    const prepareFormData = () => {
        const fd = new FormData();
        fd.append("name", form.name);
        fd.append("description", form.description);
        fd.append("price", form.price);
        fd.append("category", form.category);
        fd.append("stock", form.stock ?? 0);
        // prefer file upload, else image URL
        if (imageFile) fd.append("image", imageFile);
        else if (form.image) fd.append("image", form.image);
        return fd;
    };

    const submitProduct = async (e) => {
        e?.preventDefault();
        try {
            setLoading(true);
            const fd = prepareFormData();
            if (editId) {
                // try /admin/products/:id then fallback to /products/:id
                await apiTryAdmin("put", `/products/${editId}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
                alert("Product updated");
            } else {
                await apiTryAdmin("post", "/products", fd, { headers: { "Content-Type": "multipart/form-data" } });
                alert("Product created");
            }
            resetForm();
            await fetchProducts();
        } catch (err) {
            console.error("Save product failed", err);
            alert("Failed to save product");
        } finally {
            setLoading(false);
        }
    };

    const editProduct = (p) => {
        setForm({
            name: p.name ?? "",
            description: p.description ?? "",
            price: p.price ?? "",
            category: p.category ?? "",
            stock: p.stock ?? "",
            image: p.image ?? "",
        });
        setImagePreview(p.image ?? null);
        setEditId(p._id);
        setShowForm(true);
    };

    const deleteProduct = async (id) => {
        if (!window.confirm("Delete this product?")) return;
        try {
            await apiTryAdmin("delete", `/products/${id}`);
            alert("Deleted");
            fetchProducts();
        } catch (err) {
            console.error("Delete product failed", err);
            alert("Failed to delete product");
        }
    };

    const resetForm = () => {
        setForm(blank);
        setEditId(null);
        setImageFile(null);
        setImagePreview(null);
        setShowForm(false);
    };

    if (loading) return <div style={styles.loading}>Loading products...</div>;

    return (
        <div>
            <div style={styles.header}>
                <h2>Product Management</h2>
                <button style={styles.addButton} onClick={() => setShowForm(!showForm)}>{showForm ? "✕ Cancel" : "+ Add Product"}</button>
            </div>

            {showForm && (
                <div style={styles.formCard}>
                    <h3>{editId ? "Edit Product" : "Add Product"}</h3>
                    <form onSubmit={submitProduct} style={styles.form}>
                        <div style={styles.formRow}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Name *</label>
                                <input required style={styles.input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Price (Rs) *</label>
                                <input required type="number" style={styles.input} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                            </div>
                        </div>

                        <div style={styles.formRow}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Category</label>
                                <input style={styles.input} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                            </div>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Stock</label>
                                <input type="number" style={styles.input} value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
                            </div>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Description *</label>
                            <textarea required style={{ ...styles.input, minHeight: 80 }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>Image (file or paste URL)</label>
                            <input type="file" name="image" accept="image/*" style={styles.fileInput} onChange={handleImageChange} />
                            <input placeholder="or image URL" style={{ ...styles.input, marginTop: 8 }} value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
                            {imagePreview && <div style={styles.imagePreviewContainer}><img src={imagePreview} alt="preview" style={styles.imagePreview} /></div>}
                        </div>

                        <div style={styles.formActions}>
                            <button type="submit" style={styles.submitButton}>{editId ? "Update Product" : "Add Product"}</button>
                            <button type="button" style={styles.cancelButton} onClick={resetForm}>Cancel</button>
                        </div>
                    </form>
                </div>
            )}

            <div style={styles.productGrid}>
                {products.map((p) => (
                    <div key={p._id} style={styles.productCard}>
                        <div style={styles.productImageContainer}>
                            {p.image ? (
                                <img
                                    src={p.image.startsWith("http") ? p.image : `http://localhost:5001/uploads/${p.image}`}
                                    alt={p.name}
                                    style={styles.productImage}
                                />
                            ) : (
                                <div style={styles.noImage}>No Image</div>
                            )}            </div>
                        <div style={styles.productInfo}>
                            <h3 style={styles.productName}>{p.name}</h3>
                            <p style={styles.productDescription}>{p.description}</p>
                            <div style={styles.productMeta}>
                                <span style={styles.productPrice}>Rs {p.price}</span>
                                <span style={styles.productStock}>Stock: {p.stock}</span>
                            </div>
                            {p.category && <span style={styles.categoryBadge}>{p.category}</span>}
                            <div style={styles.cardActions}>
                                <button style={styles.edit} onClick={() => editProduct(p)}>✏️ Edit</button>
                                <button style={styles.delete} onClick={() => deleteProduct(p._id)}>🗑️ Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

/* ---------- ORDER OVERVIEW ---------- */
const OrderOverview = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingStatus, setEditingStatus] = useState(null);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            // prefer admin orders endpoint
            const res = await apiTryAdmin("get", "/orders");
            const data = res?.data?.orders ?? res?.data ?? [];
            setOrders(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch orders", err);
            alert("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateOrderStatus = async (orderId, newStatus) => {
        try {
            // admin route uses /orders/:id/status (patch)
            // try the admin endpoint path first
            try {
                await axios.patch(`/orders/${orderId}/status`, { status: newStatus });
            } catch (e) {
                // fallback to admin namespaced endpoint
                await apiTryAdmin("patch", `/orders/${orderId}/status`, { status: newStatus });
            }
            await fetchOrders();
            setEditingStatus(null);
        } catch (err) {
            console.error("Update status failed", err);
            alert("Failed to update status");
        }
    };

    const deleteOrder = async (orderId) => {
        if (!window.confirm("Delete this order?")) return;
        try {
            await apiTryAdmin("delete", `/orders/${orderId}`);
            await fetchOrders();
        } catch (err) {
            console.error("Delete order failed", err);
            alert("Failed to delete order");
        }
    };

    if (loading) return <div style={styles.loading}>Loading orders...</div>;

    return (
        <div>
            <div style={styles.header}>
                <h2>Order Overview</h2>
                <span style={styles.badge}>{orders.length} orders</span>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>User</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.length > 0 ? orders.map((o) => (
                            <tr key={o._id}>
                                <td style={styles.orderId}>#{o._id.slice(-8)}</td>
                                <td>{o.user?.email || o.user?.name || "N/A"}</td>
                                <td>{o.items?.length || 0}</td>
                                <td style={styles.price}>Rs {o.totalAmount ?? o.total ?? 0}</td>
                                <td>
                                    {editingStatus === o._id ? (
                                        <select
                                            style={styles.statusSelect}
                                            defaultValue={o.status}
                                            onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                                            onBlur={() => setEditingStatus(null)}
                                            autoFocus
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    ) : (
                                        <span style={{ ...styles.statusBadge, ...getStatusStyle(o.status) }} onClick={() => setEditingStatus(o._id)}>
                                            {o.status}
                                        </span>
                                    )}
                                </td>
                                <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div style={styles.actionButtons}>
                                        <button style={styles.viewButton} onClick={() => alert("Implement modal to view details")}>View</button>
                                        <button style={styles.delete} onClick={() => deleteOrder(o._id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="7" style={{ padding: 20, textAlign: "center" }}>No orders found</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

/* ---------- UTILS ---------- */
const getStatusStyle = (status) => {
    const map = {
        Pending: { backgroundColor: "#fff3cd", color: "#856404" },
        Processing: { backgroundColor: "#cce5ff", color: "#004085" },
        Shipped: { backgroundColor: "#d1ecf1", color: "#0c5460" },
        Delivered: { backgroundColor: "#d4edda", color: "#155724" },
        Cancelled: { backgroundColor: "#f8d7da", color: "#721c24" },
    };
    return map[status] || map.Pending;
};

/* ---------- Styles (kept similar to your original) ---------- */
const styles = {
    container: { display: "flex", minHeight: "100vh", backgroundColor: "#f5f7fa" },
    sidebar: {
        width: "240px",
        backgroundColor: "#2c3e50",
        color: "white",
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem",
        boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
    },
    logo: { marginBottom: "2rem", fontSize: "1.25rem", textAlign: "center" },
    tab: {
        background: "none",
        color: "white",
        border: "none",
        margin: "0.5rem 0",
        padding: "0.75rem 1rem",
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
        borderRadius: "8px",
        transition: "all 0.2s",
    },
    activeTab: {
        backgroundColor: "#34495e",
        color: "#ecf0f1",
        border: "none",
        margin: "0.5rem 0",
        padding: "0.75rem 1rem",
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
        borderRadius: "8px",
        fontWeight: "bold",
    },
    content: { flex: 1, padding: "2rem", overflowY: "auto" },

    header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" },
    badge: { backgroundColor: "#3498db", color: "white", padding: "0.4rem 0.8rem", borderRadius: 20 },

    // forms / tables / cards -- reuse from your original styles
    formCard: { backgroundColor: "white", padding: "1.25rem", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", marginBottom: 16 },
    form: { display: "flex", flexDirection: "column", gap: 12 },
    formRow: { display: "flex", gap: 12 },
    formGroup: { flex: 1, display: "flex", flexDirection: "column" },
    label: { marginBottom: 6, fontWeight: 600 },
    input: { padding: 10, border: "1px solid #ddd", borderRadius: 6 },
    fileInput: { padding: 8, border: "1px solid #ddd", borderRadius: 6 },
    imagePreviewContainer: { marginTop: 8 },
    imagePreview: { maxWidth: 180, maxHeight: 140, borderRadius: 8, border: "1px solid #eee" },
    formActions: { display: "flex", gap: 8, marginTop: 8 },
    submitButton: { backgroundColor: "#3498db", color: "white", padding: "8px 14px", borderRadius: 8, border: "none" },
    cancelButton: { backgroundColor: "#95a5a6", color: "white", padding: "8px 14px", borderRadius: 8, border: "none" },

    productGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16, marginTop: 16 },
    productCard: { backgroundColor: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
    productImageContainer: { width: "100%", height: 160, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#fafafa" },
    productImage: { width: "100%", height: "100%", objectFit: "cover" },
    noImage: { color: "#999" },
    productInfo: { padding: 12 },
    productName: { margin: 0, fontSize: 16 },
    productDescription: { color: "#7f8c8d", fontSize: 13 },
    productMeta: { display: "flex", justifyContent: "space-between", marginTop: 8 },
    productPrice: { color: "#27ae60", fontWeight: 700 },
    productStock: { color: "#7f8c8d", fontSize: 12 },
    categoryBadge: { display: "inline-block", backgroundColor: "#ecf0f1", color: "#34495e", padding: "4px 8px", borderRadius: 12, fontSize: 12 },

    cardActions: { display: "flex", gap: 8, marginTop: 10 },
    edit: { backgroundColor: "#3498db", color: "white", padding: "6px 10px", borderRadius: 6, border: "none" },
    delete: { backgroundColor: "#e74c3c", color: "white", padding: "6px 10px", borderRadius: 6, border: "none" },

    tableContainer: { backgroundColor: "white", padding: 12, borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
    table: { width: "100%", borderCollapse: "collapse" },
    orderId: { fontFamily: "monospace", color: "#7f8c8d" },
    price: { color: "#27ae60", fontWeight: 700 },
    statusBadge: { padding: "4px 8px", borderRadius: 8, cursor: "pointer", fontWeight: 600 },
    statusSelect: { padding: 6, borderRadius: 6 },
    actionButtons: { display: "flex", gap: 8 },
    viewButton: { backgroundColor: "#9b59b6", color: "white", padding: "6px 10px", borderRadius: 6, border: "none" },

    adminBadge: { backgroundColor: "#e74c3c", color: "white", padding: "4px 8px", borderRadius: 8, fontSize: 12 },
    userBadge: { backgroundColor: "#3498db", color: "white", padding: "4px 8px", borderRadius: 8, fontSize: 12 },

    loading: { padding: 20, textAlign: "center" },

    addButton: { backgroundColor: "#27ae60", color: "white", padding: "8px 12px", borderRadius: 8, border: "none" },
    promote: { backgroundColor: "#27ae60", color: "white", padding: "6px 10px", borderRadius: 6, border: "none" },
    demote: { backgroundColor: "#e67e22", color: "white", padding: "6px 10px", borderRadius: 6, border: "none" },
};

/* ---------- Export ---------- */
export default AdminDashboard;
