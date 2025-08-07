import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/orderpage.css"; // Make sure this path matches your project

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please login.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/api/my-orders/", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setOrders(response.data);
      } catch (err) {
        console.error("Order fetch failed:", err);
        setError("❌ Unauthorized. Your token may be invalid or expired.");
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="order-page-container">
      <h2 className="order-title">My Orders</h2>

      {error ? (
        <p className="no-orders">{error}</p>
      ) : orders.length === 0 ? (
        <p className="no-orders">You have no orders yet.</p>
      ) : (
        <>
          {orders.map((order) => (
            <div key={order.order_id} className="order-summary">
              <h3>Order #{order.order_id}</h3>
              <p className="order-meta">Date: {order.created_at}</p>
              <p className="order-meta">
                Status: <strong>{order.complete ? "✅ Complete" : "⏳ Pending"}</strong>
              </p>

              <table className="order-table">
                <thead>
                  <tr>
                    <th className="center">Title</th>
                    <th className="center">Author</th>
                    <th className="center">Quantity</th>
                    <th className="right">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td className="center">{item.title}</td>
                      <td className="center">{item.author}</td>
                      <td className="center">{item.quantity}</td>
                      <td className="right">${item.price}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="3" className="total-label right">Total:</td>
                    <td className="total-amount right">${order.total.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default OrderPage;
