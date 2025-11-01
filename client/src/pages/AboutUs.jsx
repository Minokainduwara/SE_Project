import React from 'react';
import { Leaf } from 'lucide-react';
import Header from '../components/homePage/Header';
import Footer from '../components/homePage/footer';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-100 to-green-600">
      <Header/>
       <div className="space-y-4 p-5"></div>

      {/* Main Content */}
      <main className="bg-white rounded-3xl mx-4 mb-4 shadow-2xl">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              {/* About Us Section */}
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-6">About Us</h1>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We are an online grocery marketplace connecting customers with local farmer-and vendors, offering a wide selection of fresh, high-quality products delivered directly to your doorstep.
                </p>
              </div>

              {/* Our Mission Section */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our mission is to make healthy eating accessible and convenient for everyone. We strive to support local agriculture and provide a seamless online shopping experience.
                </p>
              </div>

              {/* Our Values Section */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
                
                <div className="space-y-6">
                  {/* Quality */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Quality</h3>
                    <p className="text-gray-700">
                      We prioritize fresh, high-quality products from trusted sources.
                    </p>
                  </div>

                  {/* Sustainability */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Sustainability</h3>
                    <p className="text-gray-700">
                      We promote sustainable farming practices and eco-friendly packaging.
                    </p>
                  </div>

                  {/* Customer Focus */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Focus</h3>
                    <p className="text-gray-700">
                      We are committed to providing excellent customer service and satisfaction.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Image and Contact */}
            <div className="space-y-8">
              {/* Image */}
              <div className="bg-gray-200 rounded-3xl overflow-hidden shadow-lg">
                <img
                  src="/assets/images/Deliverman.jpg"
                  alt="Delivery person with fresh groceries"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Get in Touch Section */}
              <div className="bg-gray-50 rounded-3xl p-8 shadow-md">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Have any questions or feedback? We'd love to hear from you!
                </p>
                <button className="w-full bg-green-700 text-white font-semibold py-4 rounded-xl hover:bg-green-800 transition-colors duration-300 shadow-md">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}