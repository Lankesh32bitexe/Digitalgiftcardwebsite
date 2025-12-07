import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-8">Last updated: December 7, 2025</p>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <section>
            <h2 className="text-2xl text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to RegalaSends.com ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">2. Information We Collect</h2>
            <h3 className="text-xl text-gray-900 mb-3">Personal Information</h3>
            <p className="text-gray-700 mb-3 leading-relaxed">
              We collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Register for an account</li>
              <li>Make a purchase</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact customer support</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              This information may include your name, email address, phone number, and payment information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-700 mb-3 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Process and deliver your orders</li>
              <li>Send you gift card codes and receipts</li>
              <li>Provide customer support</li>
              <li>Improve our website and services</li>
              <li>Send promotional emails (with your consent)</li>
              <li>Prevent fraud and enhance security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-3 leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Payment processors to complete transactions</li>
              <li>Service providers who assist in our operations</li>
              <li>Law enforcement when required by law</li>
              <li>Business partners with your explicit consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">5. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement industry-standard security measures to protect your personal information. This includes SSL encryption, secure servers, and PCI-DSS compliant payment processing. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">6. Cookies and Tracking</h2>
            <p className="text-gray-700 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user behavior. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">7. Your Rights</h2>
            <p className="text-gray-700 mb-3 leading-relaxed">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">8. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-gray-900 mb-4">10. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700">Email: privacy@regalosends.com</p>
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
