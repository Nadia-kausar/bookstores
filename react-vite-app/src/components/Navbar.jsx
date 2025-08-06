// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo" onClick={() => navigate('/')}>MyStore</div>

        <div
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          {user ? (
            <>
              <li>
                <Link
                  to="/"
                  onClick={handleNavClick}
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  onClick={handleNavClick}
                  className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={handleNavClick}
                  className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  onClick={handleNavClick}
                  className={`nav-link ${location.pathname === '/cart' ? 'active' : ''}`}
                >
                  Cart
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="nav-link logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="nav-link" onClick={handleNavClick}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="nav-link" onClick={handleNavClick}>
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
