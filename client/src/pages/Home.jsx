import React, { useState, useEffect } from 'react';
import { Leaf, Truck, Clock,ShoppingCart } from 'lucide-react';
import Footer from './Footer';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const images = [
    'assets/images/Home1.webp',
    'assets/images/Home2.avif',
    'assets/images/Home3.avif',
    'assets/images/Home4.jpg',
  ];

  // ✅ Category images
  const categories = [
    { img: 'assets/images/vegi.jpg', name: 'Vegetables' },
    { img: 'assets/images/fruits.jpg', name: 'Fruits' },
    { img: 'assets/images/dairy.jpg', name: 'Dairy' },
    { img: 'assets/images/bakery.webp', name: 'Bakery' },
    { img: 'assets/images/meat.webp', name: 'Meat' },
    { img: 'assets/images/beverage.png', name: 'Beverages' },
    { img: 'assets/images/snack.jpg', name: 'Snacks' },
  ];

  return (
    <div style={styles.container}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .card:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
                      0 10px 10px -5px rgba(0, 0, 0, 0.04);
          transform: translateY(-2px);
        }

        .category-card:hover {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                      0 4px 6px -2px rgba(0, 0, 0, 0.05);
          transform: scale(1.05);
        }
      `}</style>

      {/* 🖼️ Image Row */}
      <div style={styles.sliderContainer}>
        <div style={styles.staticImageGrid}>
          {images.map((img, index) => (
            <div
              key={index}
              style={{
                ...styles.sliderItem,
                background:
                  index % 2 === 0
                    ? 'linear-gradient(to bottom right, #bbf7d0, #86efac)'
                    : 'linear-gradient(to bottom right, #a7f3d0, #6ee7b7)',
              }}
            >
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 🌿 Hero Section */}
      <section style={styles.hero}>
        <div className={isVisible ? 'fade-in' : ''} style={styles.heroContent}>
          <h2 style={styles.heroTitle}>Fresh Groceries Delivered</h2>
          <p style={styles.heroDescription}>
            Quality produce, pantry staples, and everything you need for your kitchen, delivered straight to your doorstep.
          </p>
        </div>

        {/* 🚚 Features */}
        <div style={styles.featuresGrid}>
          <div className="card" style={styles.featureCard}>
            <div style={styles.featureIcon}>
              <Leaf style={styles.icon} />
            </div>
            <h3 style={styles.featureTitle}>Fresh & Organic</h3>
            <p style={styles.featureText}>
              Handpicked fresh produce from local farms. Organic options available for a healthier lifestyle.
            </p>
          </div>

          <div className="card" style={styles.featureCard}>
            <div style={styles.featureIcon}>
              <Truck style={styles.icon} />
            </div>
            <h3 style={styles.featureTitle}>Fast Delivery</h3>
            <p style={styles.featureText}>
              Same-day delivery available. Get your groceries delivered within hours of ordering.
            </p>
          </div>

          <div className="card" style={styles.featureCard}>
            <div style={styles.featureIcon}>
              <ShoppingCart style={styles.icon} />
            </div>
            <h3 style={styles.featureTitle}>Grocery Shopping</h3>
            <p style={styles.featureText}>
              Explore a wide range of grocery items, from fresh produce to daily essentials—all in one place.
              </p>
          </div>

          <div className="card" style={styles.featureCard}>
            <div style={styles.featureIcon}>
              <Clock style={styles.icon} />
            </div>
            <h3 style={styles.featureTitle}>24/7 Service</h3>
            <p style={styles.featureText}>
              Shop anytime, anywhere. Our online store is always open for your convenience.
            </p>
          </div>
        </div>
      </section>

      {/* 🛒 Categories Section */}
      <section style={styles.categoriesSection}>
        <h3 style={styles.categoriesTitle}>Popular Categories</h3>
        <div style={styles.categoriesGrid}>
          {categories.map((cat, index) => (
            <div key={index} className="category-card" style={styles.categoryCard}>
              <img src={cat.img} alt={cat.name} style={styles.categoryImage} />
              <h4 style={styles.categoryName}>{cat.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Footer */}
      <Footer />
    </div>
  );
};

// 🎨 Styles
const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #f0fdf4, #d1fae5)',
    display: 'flex',
    flexDirection: 'column',
  },
  sliderContainer: {
    background: 'white',
    padding: '32px 0',
  },
  staticImageGrid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  sliderItem: {
    width: '20%',
    minWidth: '180px',
    height: '250px',
    borderRadius: '8px',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '64px 16px',
  },
  heroContent: {
    textAlign: 'center',
    marginBottom: '48px',
  },
  heroTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: '16px',
  },
  heroDescription: {
    fontSize: '20px',
    color: '#15803d',
    maxWidth: '672px',
    margin: '0 auto',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '32px',
    marginTop: '64px',
  },
  featureCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
  featureIcon: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: '#dcfce7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  icon: {
    width: '32px',
    height: '32px',
    color: '#16a34a',
  },
  featureTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: '12px',
  },
  featureText: {
    color: '#4b5563',
  },
  categoriesSection: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '64px 16px',
    flexGrow: 1,
  },
  categoriesTitle: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#166534',
    textAlign: 'center',
    marginBottom: '48px',
  },
  categoriesGrid: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '24px',
  overflowX: 'auto',        // Enables side scrolling
  paddingBottom: '10px',
  scrollbarWidth: 'thin',   // Firefox scrollbar
  scrollBehavior: 'smooth',
},

  categoryCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
  },
  categoryImage: {
    width: '150px',
    height: '150px',
    borderRadius: '10%',
    objectFit: 'cover',
    marginBottom: '12px',
  },
  categoryName: {
    fontWeight: '600',
    color: '#166534',
    margin: 0,
    fontSize: '16px',
  },
};

export default Home;
