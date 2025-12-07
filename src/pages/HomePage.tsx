import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { GiftCardComponent } from '../components/GiftCardComponent';
import { Search, ChevronRight, Star, TrendingUp, Zap } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function HomePage() {
  const [giftCards, setGiftCards] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchGiftCards();
  }, []);

  const fetchGiftCards = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-16edd231/gift-cards?featured=true`,
        {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }
      );
      const data = await response.json();
      if (data.giftCards) {
        setGiftCards(data.giftCards);
      }
    } catch (error) {
      console.log('Error fetching gift cards:', error);
    }
  };

  const categories = [
    { id: 'shopping', name: 'Shopping', icon: '🛍️', color: 'from-blue-500 to-cyan-500' },
    { id: 'gaming', name: 'Gaming', icon: '🎮', color: 'from-purple-500 to-pink-500' },
    { id: 'food', name: 'Food & Dining', icon: '🍔', color: 'from-orange-500 to-red-500' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: 'from-indigo-500 to-purple-500' },
    { id: 'travel', name: 'Travel', icon: '✈️', color: 'from-green-500 to-teal-500' },
    { id: 'digital', name: 'Digital Services', icon: '💳', color: 'from-pink-500 to-rose-500' },
  ];

  const brands = [
    'Amazon', 'Flipkart', 'Google Play', 'Steam', 'Xbox', 'PlayStation',
    'Swiggy', 'Zomato', 'Uber', 'Myntra', 'PhonePe', 'Paytm'
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      rating: 5,
      text: 'Super fast delivery! Got my Amazon gift card within minutes. Highly recommended!',
    },
    {
      name: 'Rahul Verma',
      rating: 5,
      text: 'Best prices and instant delivery. This is my go-to platform for all gift cards.',
    },
    {
      name: 'Sneha Patel',
      rating: 5,
      text: 'Excellent service! Used it for gifting and my friend loved it. Will use again.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl mb-6">
                Send Digital Gifts Instantly
              </h1>
              <p className="text-xl mb-8 text-pink-100">
                Choose from 500+ gift cards. Delivered instantly to email. Best prices guaranteed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/category/shopping"
                  className="bg-white text-purple-600 px-8 py-4 rounded-lg text-center hover:shadow-xl transition"
                >
                  Browse Gift Cards
                </Link>
                <Link
                  to="/about"
                  className="bg-purple-700 text-white px-8 py-4 rounded-lg text-center hover:bg-purple-800 transition"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1762470550094-c2474b0c5a31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwY2FyZCUyMHNob3BwaW5nfGVufDF8fHx8MTc2NTEzNTIzN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Gift Cards"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center gap-4">
            <Search className="w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search for gift cards (Amazon, Flipkart, Steam, etc.)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 outline-none text-lg"
            />
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:shadow-lg transition">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl text-gray-900">Popular Categories</h2>
          <Link to="/category/shopping" className="text-purple-600 flex items-center gap-2 hover:gap-3 transition-all">
            View All <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="group"
            >
              <div className={`bg-gradient-to-br ${cat.color} text-white rounded-xl p-6 text-center hover:shadow-xl hover:scale-105 transition-all`}>
                <div className="text-4xl mb-2">{cat.icon}</div>
                <div className="text-sm">{cat.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Gift Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp className="w-8 h-8 text-pink-600" />
          <h2 className="text-3xl text-gray-900">Trending Gift Cards</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {giftCards.length > 0 ? (
            giftCards.slice(0, 8).map((card) => (
              <GiftCardComponent
                key={card.id}
                id={card.id}
                name={card.name}
                image={card.image}
                price={card.price}
                discount={card.discount}
                category={card.category}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              <p>Loading gift cards...</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Deals */}
      <section className="bg-gradient-to-r from-orange-500 to-pink-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Zap className="w-10 h-10" />
              <h2 className="text-4xl">Flash Deals</h2>
            </div>
            <p className="text-xl text-orange-100">Limited time offers - Grab them before they're gone!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Amazon ₹500', discount: '10% OFF', price: '₹450' },
              { name: 'Flipkart ₹1000', discount: '15% OFF', price: '₹850' },
              { name: 'Swiggy ₹200', discount: '20% OFF', price: '₹160' },
            ].map((deal, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 text-center hover:shadow-2xl transition">
                <div className="bg-red-500 text-white text-sm px-3 py-1 rounded-full inline-block mb-4">
                  {deal.discount}
                </div>
                <h3 className="text-2xl text-gray-900 mb-2">{deal.name}</h3>
                <p className="text-3xl text-purple-600 mb-4">{deal.price}</p>
                <Link
                  to="/category/shopping"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg inline-block hover:shadow-lg transition"
                >
                  Buy Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Logos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl text-gray-900 text-center mb-8">Supported Brands</h2>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <div
              key={brand}
              className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center hover:shadow-xl transition"
            >
              <span className="text-gray-700 text-center">{brand}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl text-gray-900 text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">{testimonial.text}</p>
                <p className="text-purple-600">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl mb-4">Ready to Send the Perfect Gift?</h2>
          <p className="text-xl mb-8 text-pink-100">
            Join thousands of happy customers. Fast, secure, and instant delivery.
          </p>
          <Link
            to="/category/shopping"
            className="bg-white text-purple-600 px-10 py-4 rounded-lg inline-block text-lg hover:shadow-xl transition"
          >
            Start Shopping Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
