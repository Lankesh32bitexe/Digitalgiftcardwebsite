import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl text-gray-900 mb-6">Contact Us</h1>
        <p className="text-xl text-gray-600 mb-12">
          Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <Mail className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">support@regalosends.com</p>
              <p className="text-gray-600">sales@regalosends.com</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <Phone className="w-10 h-10 text-pink-600 mb-4" />
              <h3 className="text-xl text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">+91 1800-123-4567</p>
              <p className="text-gray-600">Mon-Sat: 9 AM - 6 PM IST</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <MapPin className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl text-gray-900 mb-2">Office</h3>
              <p className="text-gray-600">
                123 Business Park<br />
                Andheri East<br />
                Mumbai, Maharashtra 400069<br />
                India
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl text-gray-900 mb-6">Send us a Message</h2>
              
              {submitted ? (
                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 text-center">
                  <h3 className="text-2xl text-green-700 mb-2">Thank You!</h3>
                  <p className="text-green-600">Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg hover:shadow-xl transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
