import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-2 rounded-lg">
              <span className="text-xl">🎁</span>
            </div>
            <span className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              RegalaSends
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-purple-600 transition">
              Home
            </Link>
            <Link to="/category/shopping" className="text-gray-700 hover:text-purple-600 transition">
              Shopping
            </Link>
            <Link to="/category/gaming" className="text-gray-700 hover:text-purple-600 transition">
              Gaming
            </Link>
            <Link to="/category/food" className="text-gray-700 hover:text-purple-600 transition">
              Food
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-purple-600 transition">
              Contact
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition hidden sm:block">
              <Search className="w-5 h-5 text-gray-600" />
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="px-4 py-2 hover:bg-gray-100 rounded transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/category/shopping"
                className="px-4 py-2 hover:bg-gray-100 rounded transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shopping
              </Link>
              <Link
                to="/category/gaming"
                className="px-4 py-2 hover:bg-gray-100 rounded transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Gaming
              </Link>
              <Link
                to="/category/food"
                className="px-4 py-2 hover:bg-gray-100 rounded transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Food
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 hover:bg-gray-100 rounded transition"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
