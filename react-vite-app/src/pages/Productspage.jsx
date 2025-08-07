import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/productspage.css';

const ProductsPage = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/books/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      const updatedCart = cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
    } else {
      const newItem = {
        ...product,
        quantity: 1,
        image: product.cover_image // ensure image for CartPage
      };
      setCartItems([...cartItems, newItem]);
    }

    alert(`${product.title} added to cart!`);
  };

  return (
    <div className="products-page">
      <h2 className="products-title">All Products</h2>
      {products.length === 0 ? (
        <p className="no-products">No products found.</p>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <div className="product-card" key={product.id}>
              <img
                src={product.cover_image || 'https://via.placeholder.com/150'}
                alt={product.title}
                className="product-image"
              />
              <h3 className="product-title">{product.title}</h3>
              <p className="product-author">by {product.author || "Unknown"}</p>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Rs {product.price}</p>
              <button
                className="add-to-cart-btn"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
