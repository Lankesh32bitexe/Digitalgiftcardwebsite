import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { projectId } from '../../utils/supabase/info';

export function AdminGiftCards() {
  const [giftCards, setGiftCards] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCard, setEditingCard] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'shopping',
    price: 0,
    denominations: '',
    image: '',
    featured: false,
    discount: 0,
  });

  useEffect(() => {
    fetchGiftCards();
  }, []);

  const fetchGiftCards = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-16edd231/gift-cards`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.giftCards) {
        setGiftCards(data.giftCards);
      }
    } catch (error) {
      console.log('Error fetching gift cards:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');

    const cardData = {
      ...formData,
      denominations: formData.denominations
        ? formData.denominations.split(',').map((d) => parseInt(d.trim()))
        : [formData.price],
    };

    try {
      if (editingCard) {
        // Update
        await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-16edd231/gift-cards/${editingCard.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(cardData),
          }
        );
      } else {
        // Create
        await fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-16edd231/gift-cards`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(cardData),
          }
        );
      }

      setShowModal(false);
      setEditingCard(null);
      setFormData({
        name: '',
        description: '',
        category: 'shopping',
        price: 0,
        denominations: '',
        image: '',
        featured: false,
        discount: 0,
      });
      fetchGiftCards();
    } catch (error) {
      console.log('Error saving gift card:', error);
    }
  };

  const handleEdit = (card: any) => {
    setEditingCard(card);
    setFormData({
      name: card.name,
      description: card.description,
      category: card.category,
      price: card.price,
      denominations: card.denominations?.join(', ') || '',
      image: card.image,
      featured: card.featured || false,
      discount: card.discount || 0,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gift card?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-16edd231/gift-cards/${id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchGiftCards();
    } catch (error) {
      console.log('Error deleting gift card:', error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl text-gray-900">Gift Cards</h1>
          <button
            onClick={() => {
              setEditingCard(null);
              setFormData({
                name: '',
                description: '',
                category: 'shopping',
                price: 0,
                denominations: '',
                image: '',
                featured: false,
                discount: 0,
              });
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition"
          >
            <Plus className="w-5 h-5" />
            Add Gift Card
          </button>
        </div>

        {/* Gift Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {giftCards.map((card) => (
            <div key={card.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img
                src={card.image}
                alt={card.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl text-gray-900 mb-2">{card.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {card.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-purple-600 text-xl">₹{card.price}</span>
                  {card.featured && (
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(card)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(card.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {giftCards.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-600 mb-4">No gift cards added yet</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition"
            >
              Add Your First Gift Card
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-gray-900">
                {editingCard ? 'Edit Gift Card' : 'Add New Gift Card'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  placeholder="Amazon Gift Card"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  placeholder="Shop millions of products on Amazon"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  >
                    <option value="shopping">Shopping</option>
                    <option value="gaming">Gaming</option>
                    <option value="food">Food & Dining</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="travel">Travel</option>
                    <option value="digital">Digital Services</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Base Price</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                    placeholder="500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Denominations (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.denominations}
                  onChange={(e) => setFormData({ ...formData, denominations: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  placeholder="100, 250, 500, 1000"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Discount %</label>
                  <input
                    type="number"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                    placeholder="0"
                  />
                </div>

                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-5 h-5"
                    />
                    <span className="text-gray-700">Featured</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg hover:shadow-lg transition"
                >
                  {editingCard ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
