import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="footer-col">
            <h4>Featured Links</h4>
            <ul>
              <li><a href="#">Find a Store</a></li>
              <li><a href="#">Become a Member</a></li>
              <li><a href="#">Sign Up for Email</a></li>
              <li><a href="#">Send Us Feedback</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Get Help</h4>
            <ul>
              <li><a href="#">Order Status</a></li>
              <li><a href="#">Shipping and Delivery</a></li>
              <li><a href="#">Returns</a></li>
              <li><a href="#">Payment Options</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            &copy; 2026 T-Bird, Inc. All Rights Reserved.
          </div>
          <div className="footer-legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">Sales Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}