import React from 'react';
import booksData from '../data/booksData';
import '../styles/homepage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to <span>BookHaven</span></h1>
          <p className="hero-subtitle">Discover your next favorite book from our curated collection</p>
          <div className="hero-features">
            <div className="feature">
              <h3>📚 Vast Collection</h3>
              <p>Thousands of books across all genres</p>
            </div>
            <div className="feature">
              <h3>🚚 Fast Delivery</h3>
              <p>Delivered within 2–3 days nationwide</p>
            </div>
            <div className="feature">
              <h3>💰 Best Prices</h3>
              <p>Affordable options for every reader</p>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <h2 className="section-title">Featured Books</h2>
        <div className="featured-books">
          {booksData.slice(0, 3).map(book => (
            <div className="featured-book" key={book.id}>
              <img src={book.image} alt={book.title} className="featured-book-image" />
              <div className="book-info">
                <h4 className="book-title">{book.title}</h4>
                <p className="book-author">by {book.author}</p>
                <p className="book-price">${book.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
