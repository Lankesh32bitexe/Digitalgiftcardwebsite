import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CheckCircle, Download, Mail, Copy } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-16edd231/orders/${orderId}`,
        {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }
      );
      const data = await response.json();
      if (data.order) {
        setOrder(data.order);
      }
    } catch (error) {
      console.log('Error fetching order:', error);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-gray-600 text-lg mb-8">
            Thank you for your purchase. Your gift card codes are ready!
          </p>

          {order && (
            <>
              <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="text-gray-900">{order.id}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Email:</span>
                  <span className="text-gray-900">{order.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Paid:</span>
                  <span className="text-purple-600 text-xl">₹{order.total}</span>
                </div>
              </div>

              {/* Gift Card Codes */}
              {order.giftCardCodes && order.giftCardCodes.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl text-gray-900 mb-6">Your Gift Card Codes</h2>
                  <div className="space-y-4">
                    {order.giftCardCodes.map((item: any, idx: number) => (
                      <div key={idx} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
                        <h3 className="text-xl text-gray-900 mb-4">{item.cardName}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-600 text-sm mb-2">Gift Card Code</label>
                            <div className="flex items-center gap-2 bg-white p-3 rounded-lg border">
                              <code className="flex-1 text-purple-600">{item.code}</code>
                              <button
                                onClick={() => copyToClipboard(item.code)}
                                className="p-2 hover:bg-gray-100 rounded transition"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-gray-600 text-sm mb-2">PIN</label>
                            <div className="flex items-center gap-2 bg-white p-3 rounded-lg border">
                              <code className="flex-1 text-purple-600">{item.pin}</code>
                              <button
                                onClick={() => copyToClipboard(item.pin.toString())}
                                className="p-2 hover:bg-gray-100 rounded transition"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                  <Download className="w-5 h-5" />
                  Download Receipt
                </button>
                <button className="flex items-center justify-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
                  <Mail className="w-5 h-5" />
                  Resend to Email
                </button>
              </div>
            </>
          )}

          <div className="mt-8 pt-8 border-t">
            <Link
              to="/"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg inline-block hover:shadow-xl transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
