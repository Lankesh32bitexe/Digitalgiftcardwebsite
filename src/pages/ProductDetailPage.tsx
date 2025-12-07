import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Check } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [selectedDenomination, setSelectedDenomination] = useState<number>(0);
  const { addToCart } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-16edd231/gift-cards/${productId}`,
        {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }
      );
      const data = await response.json();
      if (data.giftCard) {
        setProduct(data.giftCard);
        if (data.giftCard.denominations && data.giftCard.denominations.length > 0) {
          setSelectedDenomination(data.giftCard.denominations[0]);
        }
      }
    } catch (error) {
      console.log('Error fetching product:', error);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: `${product.id}-${selectedDenomination || product.price}`,
        name: `${product.name} - ₹${selectedDenomination || product.price}`,
        image: product.image,
        price: selectedDenomination || product.price,
        denomination: selectedDenomination || product.price,
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <p className="text-gray-600">
            <Link to="/" className="hover:text-purple-600">Home</Link> / 
            <Link to={`/category/${product.category}`} className="hover:text-purple-600"> {product.category}</Link> / 
            {' '}{product.name}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-2xl shadow-xl"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-6">{product.description}</p>

            {/* Price Options */}
            <div className="mb-6">
              <h3 className="text-xl text-gray-900 mb-4">Select Denomination</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {product.denominations && product.denominations.length > 0 ? (
                  product.denominations.map((denom: number) => (
                    <button
                      key={denom}
                      onClick={() => setSelectedDenomination(denom)}
                      className={`p-4 rounded-lg border-2 transition ${
                        selectedDenomination === denom
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-300 hover:border-purple-400'
                      }`}
                    >
                      <span className="text-xl">₹{denom}</span>
                    </button>
                  ))
                ) : (
                  <div className="col-span-full">
                    <div className="p-4 rounded-lg border-2 border-purple-600 bg-purple-50">
                      <span className="text-xl">₹{product.price}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg hover:shadow-xl transition flex items-center justify-center gap-2"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-5 h-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>
              <Link
                to="/checkout"
                className="flex-1 bg-orange-500 text-white py-4 rounded-lg hover:shadow-xl transition text-center"
              >
                Buy Now
              </Link>
            </div>

            {/* How to Redeem */}
            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <h3 className="text-xl text-gray-900 mb-3">How to Redeem</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Complete your purchase and receive the gift card code via email</li>
                <li>Visit the {product.name} website or app</li>
                <li>Go to the redeem or add balance section</li>
                <li>Enter the code and PIN provided</li>
                <li>Your balance will be updated instantly</li>
              </ol>
            </div>

            {/* Terms */}
            <div className="bg-gray-100 rounded-xl p-6">
              <h3 className="text-xl text-gray-900 mb-3">Terms of Use</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                <li>Gift cards are non-refundable and cannot be exchanged for cash</li>
                <li>Valid for use on {product.name} platform only</li>
                <li>No expiry date unless specified</li>
                <li>Multiple gift cards can be combined</li>
                <li>Keep your code secure and do not share with others</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
