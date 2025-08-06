// src/pages/OrderPage.js
import React from 'react';
import '../styles/OrderPage.css';

const OrderPage = ({ cartItems, getCartTotal }) => {
  return (
    <div className="order-page-container">
      <h1 className="order-title">Thank you for your order!</h1>
      <p className="order-message">
        Your order has been placed successfully. Here is your order summary:
      </p>

      <table className="order-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Author</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.author}</td>
              <td className="center">{item.quantity}</td>
              <td className="right">${item.price.toFixed(2)}</td>
              <td className="right">${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4" className="right total-label">Total:</td>
            <td className="right total-amount">${getCartTotal().toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <p className="thank-you-note">
        We appreciate your business and hope you enjoy your purchase!
      </p>
    </div>
  );
};

export default OrderPage;
