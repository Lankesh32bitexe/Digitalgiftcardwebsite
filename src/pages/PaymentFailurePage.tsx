import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { XCircle, RefreshCcw, Home } from 'lucide-react';

export function PaymentFailurePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <XCircle className="w-24 h-24 text-red-500 mx-auto mb-6" />
          <h1 className="text-4xl text-gray-900 mb-4">Payment Failed</h1>
          <p className="text-gray-600 text-lg mb-8">
            We encountered an issue processing your payment. Please try again.
          </p>

          <div className="bg-red-50 rounded-xl p-6 mb-8">
            <h2 className="text-xl text-gray-900 mb-3">Common Issues</h2>
            <ul className="text-left text-gray-700 space-y-2">
              <li>• Insufficient balance in your account</li>
              <li>• Incorrect card details or expired card</li>
              <li>• Payment gateway timeout</li>
              <li>• Bank security restrictions</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/checkout"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg hover:shadow-xl transition"
            >
              <RefreshCcw className="w-5 h-5" />
              Try Again
            </Link>
            <Link
              to="/"
              className="flex items-center justify-center gap-2 bg-gray-200 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-300 transition"
            >
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t">
            <p className="text-gray-600 mb-4">Need help?</p>
            <Link to="/contact" className="text-purple-600 hover:text-purple-700">
              Contact our support team
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
