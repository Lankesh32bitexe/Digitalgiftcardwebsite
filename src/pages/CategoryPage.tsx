import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { GiftCardComponent } from '../components/GiftCardComponent';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function CategoryPage() {
  const { categoryId } = useParams();
  const [giftCards, setGiftCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGiftCards();
  }, [categoryId]);

  const fetchGiftCards = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-16edd231/gift-cards?category=${categoryId}`,
        {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        }
      );
      const data = await response.json();
      if (data.giftCards) {
        setGiftCards(data.giftCards);
      }
    } catch (error) {
      console.log('Error fetching gift cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryNames: Record<string, string> = {
    shopping: 'Shopping',
    gaming: 'Gaming',
    food: 'Food & Dining',
    entertainment: 'Entertainment',
    travel: 'Travel & Transport',
    digital: 'Digital Services',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <p className="text-gray-600">
            Home / Categories / {categoryNames[categoryId || ''] || 'All'}
          </p>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl text-gray-900 mb-4">
            {categoryNames[categoryId || ''] || 'All Gift Cards'}
          </h1>
          <p className="text-gray-600 text-lg">
            Browse our collection of digital gift cards
          </p>
        </div>

        {/* Gift Cards Grid */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">Loading gift cards...</p>
          </div>
        ) : giftCards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {giftCards.map((card) => (
              <GiftCardComponent
                key={card.id}
                id={card.id}
                name={card.name}
                image={card.image}
                price={card.price}
                discount={card.discount}
                category={card.category}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl">
            <p className="text-gray-600 text-lg mb-4">
              No gift cards available in this category yet.
            </p>
            <p className="text-gray-500">Check back soon for new additions!</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
