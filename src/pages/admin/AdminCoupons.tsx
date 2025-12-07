import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Plus, Trash2, X, Tag } from 'lucide-react';
import { projectId } from '../../utils/supabase/info';

export function AdminCoupons() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    discountPercent: 0,
    expiryDate: '',
    active: true,
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-16edd231/coupons`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.coupons) {
        setCoupons(data.coupons);
      }
    } catch (error) {
      console.log('Error fetching coupons:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');

    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-16edd231/coupons`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      setShowModal(false);
      setFormData({
        code: '',
        discountPercent: 0,
        expiryDate: '',
        active: true,
      });
      fetchCoupons();
    } catch (error) {
      console.log('Error creating coupon:', error);
    }
  };

  const handleDelete = async (code: string) => {
    if (!confirm('Are you sure you want to delete this coupon?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-16edd231/coupons/${code}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCoupons();
    } catch (error) {
      console.log('Error deleting coupon:', error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl text-gray-900">Coupons & Offers</h1>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition"
          >
            <Plus className="w-5 h-5" />
            Create Coupon
          </button>
        </div>

        {/* Coupons Grid */}
        {coupons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.map((coupon) => (
              <div key={coupon.code} className="bg-white rounded-xl shadow-md p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 opacity-10 rounded-bl-full" />
                
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Tag className="w-6 h-6 text-purple-600" />
                    </div>
                    {coupon.active ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Active
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        Inactive
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl text-gray-900 mb-2 break-all">
                    {coupon.code}
                  </h3>

                  <div className="mb-4">
                    <p className="text-3xl text-purple-600">
                      {coupon.discountPercent}% OFF
                    </p>
                  </div>

                  {coupon.expiryDate && (
                    <p className="text-gray-600 text-sm mb-4">
                      Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
                    </p>
                  )}

                  <p className="text-gray-500 text-xs mb-4">
                    Created: {new Date(coupon.createdAt).toLocaleDateString()}
                  </p>

                  <button
                    onClick={() => handleDelete(coupon.code)}
                    className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Tag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No coupons created yet</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition"
            >
              Create Your First Coupon
            </button>
          </div>
        )}
      </div>

      {/* Create Coupon Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-gray-900">Create New Coupon</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Coupon Code</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 uppercase"
                  placeholder="WELCOME10"
                  pattern="[A-Z0-9]+"
                  title="Only uppercase letters and numbers allowed"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Discount Percentage</label>
                <input
                  type="number"
                  value={formData.discountPercent}
                  onChange={(e) => setFormData({ ...formData, discountPercent: parseInt(e.target.value) })}
                  required
                  min="1"
                  max="100"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  placeholder="10"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Expiry Date (Optional)</label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-600"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-5 h-5"
                />
                <label htmlFor="active" className="text-gray-700 cursor-pointer">
                  Active (users can use this coupon)
                </label>
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
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
