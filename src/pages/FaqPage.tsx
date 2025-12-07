import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FaqItemProps {
  question: string;
  answer: string;
}

function FaqItem({ question, answer }: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition"
      >
        <span className="text-lg text-gray-900">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="px-6 pb-6">
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export function FaqPage() {
  const faqs = [
    {
      question: 'How do I purchase a gift card?',
      answer: 'Simply browse our catalog, select your desired gift card, choose the denomination, and add it to cart. Complete the checkout process with your details and make payment. You\'ll receive your gift card code instantly via email.',
    },
    {
      question: 'How long does it take to receive my gift card?',
      answer: 'Gift cards are delivered instantly to your registered email address within 2-5 minutes of successful payment. If you don\'t receive it, please check your spam folder or contact our support team.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major payment methods including Credit/Debit Cards, UPI, Net Banking, and Digital Wallets through our secure PayU payment gateway.',
    },
    {
      question: 'Can I get a refund for my gift card?',
      answer: 'Due to the digital nature of gift cards, all sales are final. However, if you receive an invalid or non-working code, please contact our support team within 24 hours for assistance.',
    },
    {
      question: 'How do I redeem my gift card?',
      answer: 'Visit the website or app of the brand, go to the gift card or wallet section, enter your code and PIN, and the balance will be added to your account instantly.',
    },
    {
      question: 'Do gift cards expire?',
      answer: 'Most gift cards on our platform do not expire. However, specific terms and conditions may vary by brand. Please check the gift card details page for specific information.',
    },
    {
      question: 'Can I use multiple gift cards for a single purchase?',
      answer: 'Yes, most brands allow you to combine multiple gift cards. Check with the specific brand\'s terms for details on combining gift card balances.',
    },
    {
      question: 'Is my payment information secure?',
      answer: 'Absolutely! We use industry-standard SSL encryption and partner with PayU Biz, a PCI-DSS compliant payment gateway, to ensure your payment information is completely secure.',
    },
    {
      question: 'Can I send a gift card to someone else?',
      answer: 'Yes! During checkout, you can enter the recipient\'s email address, and the gift card will be sent directly to them with your personalized message.',
    },
    {
      question: 'What if I enter the wrong email address?',
      answer: 'Please double-check the email address before completing your purchase. If you\'ve made an error, contact our support team immediately with your order details.',
    },
    {
      question: 'Do you offer discounts or promotional offers?',
      answer: 'Yes! We regularly offer discounts and promotional deals. Subscribe to our newsletter or check our homepage for current offers. You can also apply coupon codes at checkout.',
    },
    {
      question: 'Can I track my order?',
      answer: 'Since gift cards are delivered digitally and instantly, there\'s no tracking required. You\'ll receive an email confirmation with your gift card details immediately after purchase.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl text-gray-900 mb-6">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-600 mb-12">
          Find answers to common questions about buying and using digital gift cards
        </p>

        <div>
          {faqs.map((faq, index) => (
            <FaqItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl mb-4">Still have questions?</h2>
          <p className="text-xl text-purple-100 mb-6">
            Our support team is here to help you
          </p>
          <a
            href="/contact"
            className="bg-white text-purple-600 px-8 py-4 rounded-lg inline-block hover:shadow-xl transition"
          >
            Contact Support
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
