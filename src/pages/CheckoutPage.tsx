import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useCart } from '../context/CartContext';
import { CreditCard, Smartphone, Wallet } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-16edd231/coupons/validate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ code: couponCode }),
        }
      );
      const data = await response.json();
      if (data.valid) {
        setDiscount(data.coupon.discountPercent || 0);
        alert(`Coupon applied! You saved ${data.coupon.discountPercent}%`);
      } else {
        alert(data.message || 'Invalid coupon');
      }
    } catch (error) {
      console.log('Error validating coupon:', error);
    }
  };

  const handleCheckout = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all fields');
      return;
    }

    setProcessing(true);

    try {
      // Create order
      const orderResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-16edd231/orders`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            customerName: formData.name,
            email: formData.email,
            phone: formData.phone,
            items: cart,
            subtotal: cartTotal,
            discount,
            total: cartTotal * (1 - discount / 100),
            paymentMethod,
          }),
        }
      );

      const orderData = await orderResponse.json();

      if (orderData.success) {
        // Initiate payment
        const paymentResponse = await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-16edd231/payment/initiate`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({
              orderId: orderData.order.id,
              amount: cartTotal * (1 - discount / 100),
              email: formData.email,
              phone: formData.phone,
            }),
          }
        );

        const paymentData = await paymentResponse.json();

        if (paymentData.success) {
          // Simulate payment processing (in production, redirect to PayU)
          setTimeout(async () => {
            // Verify payment
            await fetch(
              `https://${projectId}.supabase.co/functions/v1/make-server-16edd231/payment/verify`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${publicAnonKey}`,
                },
                body: JSON.stringify({
                  txnId: paymentData.txnId,
                  status: 'success',
                }),
              }
            );

            clearCart();
            navigate(`/payment/success?orderId=${orderData.order.id}`);
          }, 2000);
        }
      }
    } catch (error) {
      console.log('Error processing checkout:', error);
      setProcessing(false);
      navigate('/payment/failure');
    }
  };

  const finalTotal = cartTotal * (1 - discount / 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl text-gray-900 mb-6">Payment Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-lg border-2 transition flex flex-col items-center gap-2 ${
                    paymentMethod === 'card'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-300 hover:border-purple-400'
                  }`}
                >
                  <CreditCard className="w-8 h-8" />
                  <span>Card</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-lg border-2 transition flex flex-col items-center gap-2 ${
                    paymentMethod === 'upi'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-300 hover:border-purple-400'
                  }`}
                >
                  <Smartphone className="w-8 h-8" />
                  <span>UPI</span>
                </button>
                <button
                  onClick={() => setPaymentMethod('wallet')}
                  className={`p-4 rounded-lg border-2 transition flex flex-col items-center gap-2 ${
                    paymentMethod === 'wallet'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-300 hover:border-purple-400'
                  }`}
                >
                  <Wallet className="w-8 h-8" />
                  <span>Wallet</span>
                </button>
              </div>
            </div>

            {/* Coupon Code */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl text-gray-900 mb-4">Apply Coupon</h2>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  placeholder="Enter coupon code"
                />
                <button
                  onClick={handleApplyCoupon}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h2 className="text-2xl text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-gray-900 text-sm">{item.name}</p>
                      <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-gray-900">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discount}%)</span>
                    <span>-₹{(cartTotal * discount / 100).toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl">
                  <span>Total</span>
                  <span className="text-purple-600">₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={processing}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg hover:shadow-xl transition disabled:opacity-50"
              >
                {processing ? 'Processing...' : 'Complete Purchase'}
              </button>

              <p className="text-gray-500 text-sm text-center mt-4">
                Your gift card codes will be sent to your email instantly
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
