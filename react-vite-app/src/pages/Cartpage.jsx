import React from 'react';
import '../styles/cartpage.css';

const CartPage = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  getCartTotal,
  goToOrderPage, // navigation prop
}) => {
  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1 className="cart-title">Shopping Cart</h1>
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some books to your cart to see them here!</p>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    // Optionally validate or call API here
    goToOrderPage();
  };

  return (
    <div className="cart-page">
      <h1 className="cart-title">Shopping Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>by {item.author}</p>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
              </div>
              <div className="cart-item-controls">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="quantity-btn">-</button>
                <span className="quantity">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="quantity-btn">+</button>
                <button onClick={() => removeFromCart(item.id)} className="remove-btn">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h3>Order Summary</h3>
          <div className="total-section">
            <p className="total">Total: ${getCartTotal().toFixed(2)}</p>
            <button className="checkout-btn" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
