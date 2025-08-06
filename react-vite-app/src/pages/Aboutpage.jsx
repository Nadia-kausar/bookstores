import React from 'react';
import '../styles/aboutpage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1 className="about-title">About BookHaven</h1>
      <div className="about-content">
        <section className="about-section">
          <h2>Our Story</h2>
          <p>
            Founded in 2020, BookHaven began as a small independent bookstore with a mission to share the love of books with the community. Over the years, we’ve grown into an online destination for book lovers across the globe.
          </p>
        </section>
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            To make quality literature accessible to everyone and foster a vibrant reading culture by offering curated selections and exceptional customer service.
          </p>
        </section>
        <section className="about-section">
          <h2>Why Choose Us?</h2>
          <ul className="about-list">
            <li>✅ Carefully curated book selection</li>
            <li>✅ Competitive prices</li>
            <li>✅ Fast and reliable shipping</li>
            <li>✅ Excellent customer service</li>
            <li>✅ Supporting local authors</li>
          </ul>
        </section>
        <section className="about-section">
          <h2>Contact Information</h2>
          <p>
            📧 <strong>Email:</strong> info@bookhaven.com<br />
            📞 <strong>Phone:</strong> (555) 123-4567<br />
            📍 <strong>Address:</strong> 123 Book Street, Reading City
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
