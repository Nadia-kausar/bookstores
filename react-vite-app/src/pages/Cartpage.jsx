import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/cartpage.css';

const CartPage = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  getCartTotal,
  goToOrderPage,
}) => {
  const token = localStorage.getItem('token');
  const [isLoading, setIsLoading] = useState(false);

  const hasInvalidItems = cartItems.some(
    (item) => typeof item.price !== 'number' || isNaN(item.price)
  );

  const handleCheckout = async () => {
    if (!token) {
      alert('❌ You must be logged in to place an order.');
      return;
    }

    if (hasInvalidItems) {
      alert('❌ Invalid price detected.');
      return;
    }

    const payload = {
      cart: cartItems.map((item) => ({
        book_id: item.id,
        quantity: item.quantity,
      })),
    };

    setIsLoading(true);
    try {
      await axios.post('http://localhost:8000/api/place-order/', payload, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      alert('✅ Order placed successfully!');
      goToOrderPage(); // navigate to order page
    } catch (error) {
      console.error('Order failed:', error);
      alert('❌ Failed to place order. Check console.');
    } finally {
      setIsLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1 className="cart-title">Shopping Cart</h1>
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some books to your cart to see them here!</p>
          <Link to="/products" className="continue-link">
            ← Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img
                src={item.image || 'https://via.placeholder.com/100x150?text=No+Image'}
                alt={item.title}
                className="cart-item-image"
              />
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>by {item.author}</p>
                <p className="cart-item-price">
                  ${typeof item.price === 'number' ? item.price.toFixed(2) : 'N/A'}
                </p>
              </div>
              <div className="cart-item-controls">
                <button
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  title="Decrease quantity"
                >
                  −
                </button>
                <span className="quantity">{item.quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  title="Increase quantity"
                >
                  +
                </button>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                  title="Remove from cart"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h3>Order Summary</h3>
          <p>Total: ${getCartTotal().toFixed(2)}</p>
          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={hasInvalidItems || isLoading}
            title={hasInvalidItems ? 'Fix invalid prices' : ''}
          >
            {isLoading ? 'Processing...' : 'Proceed to Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
