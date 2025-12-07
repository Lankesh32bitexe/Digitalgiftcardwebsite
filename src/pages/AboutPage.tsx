import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Target, Users, Shield, Zap } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl text-gray-900 mb-6">About RegalaSends</h1>
        <p className="text-xl text-gray-600 mb-12">
          India's most trusted platform for buying and sending digital gift cards
        </p>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            Founded in 2023, RegalaSends was created with a simple mission: make gifting easier, faster, and more convenient for everyone. We recognized that in today's digital age, people needed a reliable platform to purchase and send gift cards instantly.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            What started as a small initiative has now grown into India's leading digital gift card marketplace, serving thousands of customers every month. We partner with over 100+ top brands across categories like shopping, gaming, food, entertainment, and more.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our commitment to instant delivery, competitive pricing, and exceptional customer service has made us the go-to platform for digital gifting in India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6">
            <Target className="w-12 h-12 text-purple-600 mb-4" />
            <h3 className="text-2xl text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-700">
              To revolutionize the gifting experience by providing instant, secure, and affordable digital gift cards for every occasion.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <Users className="w-12 h-12 text-pink-600 mb-4" />
            <h3 className="text-2xl text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-700">
              To become the most trusted and preferred digital gifting platform across India and beyond.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <Shield className="w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="text-xl mb-2">100% Secure</h3>
                <p className="text-purple-100">
                  All transactions are encrypted and secure. Your data is protected with industry-standard security.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Zap className="w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="text-xl mb-2">Instant Delivery</h3>
                <p className="text-purple-100">
                  Get your gift card codes delivered to your email within minutes of purchase.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Target className="w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="text-xl mb-2">Best Prices</h3>
                <p className="text-purple-100">
                  We offer competitive prices and regular discounts to help you save more.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Users className="w-8 h-8 flex-shrink-0" />
              <div>
                <h3 className="text-xl mb-2">24/7 Support</h3>
                <p className="text-purple-100">
                  Our dedicated customer support team is always here to help you.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl text-gray-900 mb-6">Our Partners</h2>
          <p className="text-gray-700 mb-6">
            We've partnered with India's top brands to bring you the best selection of gift cards:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Amazon', 'Flipkart', 'Google Play', 'Steam', 'Xbox', 'PlayStation', 'Swiggy', 'Zomato', 'Uber', 'Ola', 'Myntra', 'PhonePe'].map((brand) => (
              <div key={brand} className="bg-gray-50 rounded-lg p-4 text-center text-gray-700">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
