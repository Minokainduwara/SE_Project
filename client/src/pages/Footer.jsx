import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import AboutUsPage from './AboutUsPage';    
import ContactUs from './Contactus';

export default function Footer() {
  return (
    <>
      <footer className="footer">
        {/* Main Footer */}
        <div className="footer-container">
          <div className="footer-grid">
            
            {/* Company Info */}
            <div className="footer-section">
              <div className="footer-logo">
                {/* <div className="logo-box">
                  <img src="assets/images/logo.png" alt="Logo" className="logo-img" />
                </div> */}
                <span className="logo-text">🛒 Grocery Store</span>
              </div>
              <p className="footer-description">
                Your trusted online shopping destination for quality products and exceptional service.
              </p>
              <div className="footer-social">
                <a href="#" className="social-icon"><Facebook size={18} /></a>
                <a href="#" className="social-icon"><Twitter size={18} /></a>
                <a href="#" className="social-icon"><Instagram size={18} /></a>
                <a href="#" className="social-icon"><Linkedin size={18} /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3 className="footer-title">Quick Links</h3>
              <ul className="footer-list">
                <li><a href="/">Home</a></li>
                <li><a href="/products">Products</a></li>
                <li><a href="/AboutUsPage">About Us</a></li>
                <li><a href="/ContactUs">Contact Us</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-section">
              <h3 className="footer-title">Customer Service</h3>
              <ul className="footer-list">
                <li><a href="#">My Account</a></li>
                <li><a href="#">Order Tracking</a></li>
                <li><a href="#">Shipping Info</a></li>
                <li><a href="#">Returns & Refunds</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h3 className="footer-title">Contact Info</h3>
              <ul className="footer-contact">
                <li><MapPin size={18} className="icon" />No. 254, Kollupitiya, Colombo 03</li>
                <li><Phone size={18} className="icon" />+91 2244657</li>
                <li><Mail size={18} className="icon" />GroceryStore@gmail.com</li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <p>© 2025 MERN Shop. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </footer>

      {/* Inline CSS */}
      <style>{`
        .footer {
          background-color: #1c6037ff;
          color: #ffffff;
          font-family: Arial, sans-serif;
        }
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px 20px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 40px;
        }
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .logo-box {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 4px;
        }
        .logo-img {
          width: 40px;
          height: 40px;
          border-radius: 6px;
        }
        .logo-text {
          font-weight: bold;
          font-size: 1.3rem;
        }
        .footer-description {
          color: #d1fae5;
          font-size: 0.9rem;
          line-height: 1.5;
          margin-bottom: 20px;
        }
        .footer-social {
          display: flex;
          gap: 10px;
        }
        .social-icon {
          background-color: #166534;
          color: white;
          padding: 8px;
          border-radius: 50%;
          transition: background-color 0.3s;
        }
        .social-icon:hover {
          background-color: #15803d;
        }
        .footer-title {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 16px;
        }
        .footer-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-list li {
          margin-bottom: 8px;
        }
        .footer-list a {
          color: #d1fae5;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s;
        }
        .footer-list a:hover {
          color: #ffffff;
        }
        .footer-contact {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-contact li {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #d1fae5;
          font-size: 0.9rem;
          margin-bottom: 10px;
        }
        .footer-contact .icon {
          color: #86efac;
        }
        .footer-bottom {
          border-top: 1px solid #166534;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }
        .footer-bottom p {
          color: #a7f3d0;
          font-size: 0.9rem;
          margin: 0;
        }
        .footer-links {
          display: flex;
          gap: 20px;
        }
        .footer-links a {
          color: #a7f3d0;
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s;
        }
        .footer-links a:hover {
          color: #ffffff;
        }
        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
          }
        }
      `}</style>
    </>
  );
}
