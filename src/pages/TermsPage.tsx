import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl text-gray-900 mb-6">Terms & Conditions</h1>
        <p className="text-gray-600 mb-8">Last updated: December 7, 2025</p>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <section>
            <h2 className="text-2xl text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using RegalaSends.com, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">2. Service Description</h2>
            <p className="text-gray-700 leading-relaxed">
              RegalaSends.com is a digital gift card marketplace that facilitates the purchase and delivery of gift cards from various brands. We act as an intermediary between customers and brand partners.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">3. User Accounts</h2>
            <p className="text-gray-700 mb-3 leading-relaxed">
              When creating an account, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">4. Purchases and Payments</h2>
            <h3 className="text-xl text-gray-900 mb-3">4.1 Pricing</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              All prices are displayed in Indian Rupees (INR) and are subject to change without notice. The price at the time of purchase will be honored.
            </p>
            <h3 className="text-xl text-gray-900 mb-3">4.2 Payment Methods</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              We accept various payment methods through our secure payment gateway. All transactions are encrypted and processed securely.
            </p>
            <h3 className="text-xl text-gray-900 mb-3">4.3 Payment Confirmation</h3>
            <p className="text-gray-700 leading-relaxed">
              Upon successful payment, you will receive an order confirmation and your gift card codes via email.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">5. Gift Card Delivery and Usage</h2>
            <p className="text-gray-700 mb-3 leading-relaxed">
              Gift cards are delivered digitally via email. You agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Provide a valid email address</li>
              <li>Check spam/junk folders if you don't receive your code</li>
              <li>Redeem gift cards according to the brand's terms</li>
              <li>Keep your gift card codes secure and confidential</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">6. Refunds and Returns</h2>
            <p className="text-gray-700 mb-3 leading-relaxed">
              Due to the digital nature of our products:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>All sales are final and non-refundable</li>
              <li>Gift cards cannot be exchanged for cash</li>
              <li>Exceptions may be made for invalid or non-working codes</li>
              <li>Refund requests must be submitted within 24 hours of purchase</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">7. Prohibited Activities</h2>
            <p className="text-gray-700 mb-3 leading-relaxed">
              You may not:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Use our services for fraudulent purposes</li>
              <li>Resell gift cards purchased from our platform</li>
              <li>Attempt to hack or compromise our systems</li>
              <li>Use automated systems to make purchases</li>
              <li>Violate any applicable laws or regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">8. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed">
              All content on RegalaSends.com, including logos, text, images, and design, is protected by intellectual property rights and belongs to us or our licensors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">
              We are not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our liability is limited to the amount paid for the gift card in question.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">10. Dispute Resolution</h2>
            <p className="text-gray-700 leading-relaxed">
              Any disputes arising from these terms will be governed by the laws of India and subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">11. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">12. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">
              For questions about these Terms and Conditions, please contact:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">Email: legal@regalosends.com</p>
              <p className="text-gray-700">Phone: +91 1800-123-4567</p>
              <p className="text-gray-700">Address: 123 Business Park, Mumbai, Maharashtra 400069, India</p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
