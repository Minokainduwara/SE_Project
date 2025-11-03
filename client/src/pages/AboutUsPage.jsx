import React from 'react';
import { Leaf } from 'lucide-react';
import Footer from './Footer';
import ContactUs from './Contactus';

export default function AboutUsPage() {
  return (
    <>
      <style>{`
        /* Page Background */
        .about-page {
          min-height: 100vh;
          background: linear-gradient(to bottom, #e8f5e9, #2e7d32);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 50px 20px;
          font-family: 'Poppins', sans-serif;
        }

        /* Main Container */
        .about-container {
          background: #26a65b;
          border-radius: 30px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          max-width: 1200px;
          width: 100%;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .about-container:hover {
          transform: scale(1.01);
        }

        /* Grid Layout */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          padding: 60px;
        }

        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Left Column */
        .about-left {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .about-section {
          background: #f1f8e9;
          padding: 25px;
          border-radius: 20px;
          border-left: 6px solid #2e7d32;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
        }

        /* Titles */
        .about-title {
          font-size: 42px;
          color: #26a65b;
          font-weight: 700;
          margin-bottom: 15px;
        }

        .section-title {
          font-size: 28px;
          color: #26a65b;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .value-title {
          font-size: 20px;
          color: #26a65b;
          font-weight: 600;
          margin-bottom: 5px;
        }

        /* Text */
        .about-text {
          color: #444;
          font-size: 16px;
          line-height: 1.7;
        }

        /* Values */
        .values-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .value-item {
          background: #e8f5e9;
          padding: 15px;
          border-radius: 12px;
          transition: background 0.3s;
        }

        .value-item:hover {
          background: #c8e6c9;
        }

        /* Right Column */
        .about-right {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .about-image-box {
          overflow: hidden;
          border-radius: 25px;
          box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
        }

        .about-image {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.4s ease;
        }

        .about-image:hover {
          transform: scale(1.05);
        }

        /* Contact Box */
        .contact-box {
          background: #f1f8e9;
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          border-top: 5px solid #388e3c;
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }

        .contact-button {
          margin-top: 15px;
          background-color: #2FCC71;
          color:white;
          color: white;
          font-size: 16px;
          font-weight: 600;
          border: none;
          padding: 12px 20px;
          border-radius: 10px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .contact-button:hover {
          background-color: #389c60ff;
          transform: scale(1.05);
          
        }
        
      `}</style>

      <div className="about-page">
        <main className="about-container">
          <div className="about-grid">
            
            {/* Left Column - Text Content */}
            <div className="about-left">
              <div className="about-section">
                <h1 className="about-title">About Us</h1>
                <p className="about-text">
                  We are an online grocery marketplace connecting customers with local farmers and vendors,
                  offering a wide selection of fresh, high-quality products delivered directly to your doorstep.
                </p>
              </div>

              <div className="about-section">
                <h2 className="section-title">Our Mission</h2>
                <p className="about-text">
                  Our mission is to make healthy eating accessible and convenient for everyone.
                  We strive to support local agriculture and provide a seamless online shopping experience.
                </p>
              </div>

              <div className="about-section">
                <h2 className="section-title">Our Values</h2>

                <div className="values-list">
                  <div className="value-item">
                    <h3 className="value-title">Quality</h3>
                    <p className="about-text">We prioritize fresh, high-quality products from trusted sources.</p>
                  </div>

                  <div className="value-item">
                    <h3 className="value-title">Sustainability</h3>
                    <p className="about-text">We promote sustainable farming practices and eco-friendly packaging.</p>
                  </div>

                  <div className="value-item">
                    <h3 className="value-title">Customer Focus</h3>
                    <p className="about-text">We are committed to providing excellent customer service and satisfaction.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Image and Contact */}
            <div className="about-right">
              <div className="about-image-box">
                <img
                  src="/assets/images/AboutusImage.webp"
                  alt="Delivery person with fresh groceries"
                  className="about-image"
                />
              </div>

              <div className="contact-box">
                <h2 className="section-title">Get in Touch</h2>
                <p className="about-text">
                  Have any questions or feedback? We'd love to hear from you!
                </p>
                <button className="contact-button">
                  
                  <Leaf size={18} style={{ marginRight: '8px' }} />
                  <a href="/ContactUs" Class="AboutUsBtn">Contact Us</a> 
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer/>
    </>
  );
}
