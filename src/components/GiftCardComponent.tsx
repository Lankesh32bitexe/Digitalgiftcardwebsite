import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface GiftCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  discount?: number;
  category: string;
}

export function GiftCardComponent({ id, name, image, price, discount, category }: GiftCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, name, image, price });
  };

  return (
    <Link to={`/product/${id}`} className="group">
      <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-sm">
              {discount}% OFF
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-gray-800 mb-2 line-clamp-2 min-h-[3rem]">
            {name}
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-purple-600 text-xl">₹{price}</span>
              {discount && (
                <span className="text-gray-400 line-through ml-2 text-sm">
                  ₹{Math.round(price / (1 - discount / 100))}
                </span>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-lg hover:shadow-lg transition"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
