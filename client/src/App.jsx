import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './components/Login';
import Register from './pages/Register';
import Cart from './components/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import AboutUsPage from './pages/AboutUsPage';
import ContactUs from './pages/Contactus';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={styles.app}>
          <Navbar />
          <main style={styles.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/AboutUsPage" element={<AboutUsPage/>} />
              <Route path="/ContactUS" element={<ContactUs/>}/>
            </Routes>
          </main>
          

              {/* 🧩 Admin Dashboard (Protected) */}
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                }
              />
            </Routes>
          </main>

          <footer style={styles.footer}>
            &copy; 2024 Grocery Store. All rights reserved.
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8f9fa',
  },
  main: {
    flex: 1,
    padding: '1rem',
  },
  footer: {
    backgroundColor: '#2c3e50',
    color: 'white',
    textAlign: 'center',
    padding: '2rem',
    marginTop: '3rem',
  },
};

export default App;
