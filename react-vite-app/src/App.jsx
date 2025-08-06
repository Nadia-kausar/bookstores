// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/Homepage';
import ProductsPage from './pages/Productspage';
import AboutPage from './pages/Aboutpage';
import CartPage from './pages/Cartpage';
import OrderPage from './pages/OrderPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

import { AuthProvider, useAuth } from './context/Authcontext';

// ✅ Layout with Navbar + Footer for all routes
const Layout = ({ children }) => (
  <>
    <Navbar />
    <main className="main-content">{children}</main>
    <Footer />
  </>
);

// 🔐 Protected Route Wrapper
const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 🔓 Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* 🔐 Protected Routes inside Layout */}
          <Route
            path="/"
            element={
              <ProtectedRoute element={<Layout><HomePage /></Layout>} />
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute element={<Layout><ProductsPage /></Layout>} />
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute element={<Layout><AboutPage /></Layout>} />
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute element={<Layout><CartPage /></Layout>} />
            }
          />
          <Route
            path="/order"
            element={
              <ProtectedRoute element={<Layout><OrderPage /></Layout>} />
            }
          />

          {/* Catch all: redirect to homepage if authenticated, else login */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
