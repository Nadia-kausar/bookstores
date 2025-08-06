import React from 'react';
import '../styles/footer.css'; // Ensure this path is correct

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>BookHaven</h3>
          <p>Your one-stop destination for books</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
            <span>📘 Facebook</span>
            <span>🐦 Twitter</span>
            <span>📷 Instagram</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 BookHaven. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
