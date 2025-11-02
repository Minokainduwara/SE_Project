import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, cart, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const cartCount = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          🛒 Grocery Store
        </Link>

        <div style={styles.links}>
          <Link to="/products" style={styles.link}>
            Products
          </Link>

          {user ? (
            <>
              <Link to="/orders" style={styles.link}>
                My Orders
              </Link>

              <Link to="/cart" style={styles.link}>
                Cart ({cartCount})
              </Link>

              <span style={styles.username}>Hi, {user.name}</span>

              <button onClick={handleLogout} style={styles.button}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>
                Login
              </Link>
              <Link to="/register" style={styles.link}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#2ecc71',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem'
  },
  logo: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none'
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: '0.2s ease-in-out'
  },
  username: {
    color: 'white',
    fontSize: '0.9rem'
  },
  button: {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.2s ease'
  }
};

export default Navbar;
