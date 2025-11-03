import React, { useState } from "react";
import { MapPin, Phone, Mail, AlertCircle, CheckCircle } from "lucide-react";
import Footer from "./Footer";

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = (field, value) => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email";
        return "";
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10) return "Message must be at least 10 characters";
        if (value.trim().length > 500) return "Message must be less than 500 characters";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (touched[name]) setErrors({ ...errors, [name]: validate(name, value) });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors, [name]: validate(name, value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: validate("name", formData.name),
      email: validate("email", formData.email),
      message: validate("message", formData.message),
    };
    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });

    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTouched({});
        setTimeout(() => setSubmitSuccess(false), 4000);
      }, 1000);
    }
  };

  return (
    <>
      <div className="contact-page">
        <style>{`
          .contact-page {
            background: #f9f9f9;
            min-height: 100vh;
            padding: 60px 20px;
            font-family: 'Poppins', sans-serif;
            color: #222;
          }
          .contact-header {
            text-align: center;
            margin-bottom: 40px;
          }
          .contact-header h1 {
            font-size: 2.8rem;
            color: #2FCC71;
            margin-bottom: 10px;
          }
          .contact-header p {
            color: #555;
            font-size: 1.1rem;
          }
          .success-message {
            max-width: 700px;
            margin: 0 auto 30px auto;
            background: #e9f9f0;
            border-left: 6px solid #2FCC71;
            border-radius: 8px;
            padding: 14px 20px;
            display: flex;
            align-items: center;
            gap: 10px;
            color: #207f4e;
            font-weight: 500;
          }
          .contact-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            max-width: 1100px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          @media (max-width: 900px) {
            .contact-container {
              grid-template-columns: 1fr;
            }
          }
          .contact-form {
            padding: 40px;
            display: flex;
            flex-direction: column;
            gap: 15px;
          }
          .contact-form label {
            font-weight: 600;
            color: #333;
          }
          .contact-form span {
            color: red;
          }
          .contact-form input,
          .contact-form textarea {
            padding: 12px 14px;
            border: 2px solid #ccc;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s ease;
          }
          .contact-form input:focus,
          .contact-form textarea:focus {
            border-color: #2FCC71;
            box-shadow: 0 0 6px rgba(47, 204, 113, 0.3);
            outline: none;
          }
          .contact-form input.error,
          .contact-form textarea.error {
            border-color: #e74c3c;
          }
          .error-text {
            display: flex;
            align-items: center;
            gap: 6px;
            color: #e74c3c;
            font-size: 0.9rem;
          }
          .submit-btn {
            margin-top: 10px;
            background-color: #2FCC71;
            color: white;
            border: none;
            padding: 14px;
            border-radius: 8px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }
          .submit-btn:hover {
            background-color: #27ae60;
          }
          .submit-btn:disabled {
            background-color: #b2b2b2;
            cursor: not-allowed;
          }
          .contact-info {
            background: #f6fef9;
            padding: 40px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .contact-info h2 {
            font-size: 1.8rem;
            color: #2FCC71;
            margin-bottom: 25px;
          }
          .info-item {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
            color: #333;
          }
          .icon {
            color: #2FCC71;
          }
        `}</style>

        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We’d love to hear from you! Fill out the form and we’ll get back soon.</p>
        </div>

        {submitSuccess && (
          <div className="success-message">
            <CheckCircle size={22} />
            <span>Message sent successfully! We’ll reply soon.</span>
          </div>
        )}

        <div className="contact-container">
          {/* 📧 Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name <span>*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.name && touched.name ? "error" : ""}
            />
            {errors.name && touched.name && (
              <p className="error-text">
                <AlertCircle size={15} /> {errors.name}
              </p>
            )}

            <label>
              Email <span>*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={errors.email && touched.email ? "error" : ""}
            />
            {errors.email && touched.email && (
              <p className="error-text">
                <AlertCircle size={15} /> {errors.email}
              </p>
            )}

            <label>
              Message <span>*</span>
            </label>
            <textarea
              name="message"
              placeholder="Your message..."
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              rows="5"
              className={errors.message && touched.message ? "error" : ""}
            ></textarea>
            {errors.message && touched.message && (
              <p className="error-text">
                <AlertCircle size={15} /> {errors.message}
              </p>
            )}

            <button type="submit" disabled={isSubmitting} className="submit-btn">
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* 📍 Contact Info */}
          <div className="contact-info">
            <h2>Our Contact Details</h2>
            <div className="info-item">
              <MapPin size={22} className="icon" />
              <p>No. 254, Kollupitiya, Colombo 03</p>
            </div>
            <div className="info-item">
              <Phone size={22} className="icon" />
              <p>0555 746 598</p>
            </div>
            <div className="info-item">
              <Mail size={22} className="icon" />
              <p>info@freshmarket.com</p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
