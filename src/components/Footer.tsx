import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-2 rounded-lg">
                <span className="text-xl">🎁</span>
              </div>
              <span className="text-xl text-white">RegalaSends</span>
            </div>
            <p className="text-sm mb-4">
              India's most trusted digital gift card marketplace. Send joy instantly!
            </p>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-pink-500 transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-pink-500 transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-pink-500 transition">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-pink-500 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-pink-500 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-pink-500 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/category/gaming" className="hover:text-pink-500 transition">
                  Gaming Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="hover:text-pink-500 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-pink-500 transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refund" className="hover:text-pink-500 transition">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>support@regalosends.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>+91 1800-123-4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} RegalaSends.com. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
