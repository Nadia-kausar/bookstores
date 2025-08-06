import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/productspage.css';

const ProductsPage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="products-page">
      <h2 className="products-title">All Products</h2>
      {products.length === 0 ? (
        <p className="no-products">No products found.</p>
      ) : (
        <div className="products-grid">
          {products.map(product => (
            <div className="product-card" key={product._id || product.id}>
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h3 className="product-title">{product.title}</h3>
              <p className="product-description">{product.description}</p>
              <p className="product-price">Rs {product.price}</p>
              <button
                className="add-to-cart-btn"
                onClick={() =>
                  addToCart({
                    id: product._id || product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    author: product.author || "Unknown", // Optional
                  })
                }
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
