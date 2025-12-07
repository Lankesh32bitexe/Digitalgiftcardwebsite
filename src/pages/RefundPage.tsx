import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function RefundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl text-gray-900 mb-6">Refund & Cancellation Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: December 7, 2025</p>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <section>
            <h2 className="text-2xl text-gray-900 mb-4">1. Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              At RegalaSends.com, we are committed to providing high-quality digital gift cards and excellent customer service. This Refund and Cancellation Policy outlines the circumstances under which refunds or cancellations may be issued.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">2. No Refund Policy</h2>
            <p className="text-gray-700 mb-3 leading-relaxed">
              Due to the digital and instant nature of gift card delivery, we maintain a strict no-refund policy. Once a gift card code has been delivered to your email, the sale is considered final and cannot be refunded or exchanged for cash.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This policy is in place because digital gift cards are delivered instantly and cannot be returned once the code has been revealed.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">3. Exceptions to the Refund Policy</h2>
            <p className="text-gray-700 mb-3 leading-relaxed">
              We will consider refund requests under the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Invalid Gift Card Code:</strong> If the gift card code provided is invalid or does not work</li>
              <li><strong>Duplicate Purchase:</strong> If you accidentally purchased the same gift card multiple times</li>
              <li><strong>Technical Error:</strong> If a technical issue resulted in payment being charged but no gift card delivered</li>
              <li><strong>Wrong Denomination:</strong> If you received a different denomination than what you ordered</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">4. Order Cancellation</h2>
            <h3 className="text-xl text-gray-900 mb-3">4.1 Before Delivery</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Orders can only be cancelled before the gift card code is generated and delivered. Since delivery is typically instant (within 2-5 minutes), cancellation windows are extremely limited. Contact our support team immediately if you need to cancel an order.
            </p>
            <h3 className="text-xl text-gray-900 mb-3">4.2 After Delivery</h3>
            <p className="text-gray-700 leading-relaxed">
              Once the gift card code has been delivered to your email, the order cannot be cancelled.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">5. How to Request a Refund</h2>
            <p className="text-gray-700 mb-3 leading-relaxed">
              If you believe you qualify for a refund under our exception policy:
            </p>
            <ol className="list-decimal list-inside text-gray-700 space-y-2">
              <li>Contact our customer support within 24 hours of purchase</li>
              <li>Provide your order ID and email address</li>
              <li>Explain the issue in detail with supporting evidence</li>
              <li>Wait for our team to investigate (typically 2-3 business days)</li>
              <li>Receive notification of approval or denial</li>
            </ol>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-700 mb-2">Contact Details:</p>
              <p className="text-gray-700">Email: support@regalosends.com</p>
              <p className="text-gray-700">Phone: +91 1800-123-4567</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">6. Refund Processing</h2>
            <p className="text-gray-700 mb-3 leading-relaxed">
              If your refund request is approved:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Refunds will be processed within 5-7 business days</li>
              <li>The refund will be credited to your original payment method</li>
              <li>Depending on your bank, it may take an additional 3-5 business days for the amount to reflect</li>
              <li>You will receive an email confirmation once the refund is processed</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">7. Non-Refundable Situations</h2>
            <p className="text-gray-700 mb-3 leading-relaxed">
              Refunds will NOT be issued for:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Change of mind after purchase</li>
              <li>Gift cards that have already been redeemed or partially used</li>
              <li>Loss or theft of gift card codes after delivery</li>
              <li>Sharing of gift card codes with unauthorized persons</li>
              <li>Failure to read product descriptions or terms before purchase</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">8. Replacement Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              In certain cases where a refund is not possible, we may offer a replacement gift card of equal value. This is at our sole discretion and will be evaluated on a case-by-case basis.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">9. Chargebacks</h2>
            <p className="text-gray-700 leading-relaxed">
              Initiating a chargeback without first contacting us may result in the suspension of your account. We encourage you to reach out to our support team first so we can resolve any issues promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">10. Policy Changes</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify this Refund and Cancellation Policy at any time. Any changes will be posted on this page with an updated "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">11. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about our Refund and Cancellation Policy, please contact:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">Email: refunds@regalosends.com</p>
              <p className="text-gray-700">Phone: +91 1800-123-4567</p>
              <p className="text-gray-700">Hours: Monday-Saturday, 9 AM - 6 PM IST</p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
