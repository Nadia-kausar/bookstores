// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

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

// ---------- Layout ----------
const Layout = ({ children }) => (
  <>
    <Navbar />
    <main className="main-content">{children}</main>
    <Footer />
  </>
);

// ---------- Protected Route ----------
const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" replace />;
};

// ---------- Main App ----------
const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const updateQuantity = (id, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const clearCart = () => setCartItems([]); // ✅ to clear after order

  return (
    <AuthProvider>
      <Router>
        <Routes>

          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={<Layout><HomePage /></Layout>}
              />
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute
                element={
                  <Layout>
                    <ProductsPage
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                    />
                  </Layout>
                }
              />
            }
          />
          <Route
            path="/about"
            element={
              <ProtectedRoute
                element={<Layout><AboutPage /></Layout>}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute
                element={
                  <Layout>
                    <CartPage
                      cartItems={cartItems}
                      updateQuantity={updateQuantity}
                      removeFromCart={removeFromCart}
                      getCartTotal={getCartTotal}
                      goToOrderPage={() => window.location.href = '/order'} // optional: useNavigate
                    />
                  </Layout>
                }
              />
            }
          />
          <Route
            path="/order"
            element={
              <ProtectedRoute
                element={
                  <Layout>
                    <OrderPage
                      cartItems={cartItems}
                      getCartTotal={getCartTotal}
                      clearCart={clearCart}
                    />
                  </Layout>
                }
              />
            }
          />

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
