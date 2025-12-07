import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { DollarSign, ShoppingBag, Clock, Package } from 'lucide-react';
import { projectId } from '../../utils/supabase/info';

export function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-16edd231/admin/dashboard`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (!data.error) {
        setStats(data);
      }
    } catch (error) {
      console.log('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-20">
          <p className="text-gray-600 text-lg">Loading dashboard...</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl text-gray-900 mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <p className="text-gray-600 mb-1">Total Sales</p>
            <p className="text-3xl text-gray-900">
              ₹{stats?.totalSales?.toLocaleString() || 0}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-gray-600 mb-1">Today's Orders</p>
            <p className="text-3xl text-gray-900">{stats?.todayOrders || 0}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-gray-600 mb-1">Pending Orders</p>
            <p className="text-3xl text-gray-900">{stats?.pendingOrders || 0}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-gray-600 mb-1">Gift Cards</p>
            <p className="text-3xl text-gray-900">{stats?.giftCardsCount || 0}</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-2xl text-gray-900 mb-6">Recent Orders</h2>
          {stats?.recentOrders && stats.recentOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-gray-600">Order ID</th>
                    <th className="text-left py-3 px-4 text-gray-600">Customer</th>
                    <th className="text-left py-3 px-4 text-gray-600">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 text-gray-600">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order: any) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <code className="text-purple-600">{order.id}</code>
                      </td>
                      <td className="py-3 px-4">{order.customerName}</td>
                      <td className="py-3 px-4">₹{order.total}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            order.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-center py-8">No orders yet</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
