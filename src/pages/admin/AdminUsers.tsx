import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Mail, Phone, ShoppingBag } from 'lucide-react';
import { projectId } from '../../utils/supabase/info';

export function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      
      // Get all orders
      const ordersResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-16edd231/orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const ordersData = await ordersResponse.json();
      
      if (ordersData.orders) {
        // Group orders by email to get unique users
        const userMap = new Map();
        
        ordersData.orders.forEach((order: any) => {
          if (!userMap.has(order.email)) {
            userMap.set(order.email, {
              email: order.email,
              name: order.customerName,
              phone: order.phone,
              orders: [],
              totalSpent: 0,
            });
          }
          
          const user = userMap.get(order.email);
          user.orders.push(order);
          user.totalSpent += order.total || 0;
        });
        
        setUsers(Array.from(userMap.values()));
      }
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl text-gray-900">Customers</h1>
          <div className="text-gray-600">
            Total Customers: {users.length}
          </div>
        </div>

        {/* Users Grid */}
        {users.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                    {user.orders.length} orders
                  </span>
                </div>

                <h3 className="text-xl text-gray-900 mb-4">{user.name}</h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <Phone className="w-4 h-4" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Total Spent: ₹{user.totalSpent.toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-gray-600 text-sm mb-2">Recent Orders:</p>
                  <div className="space-y-2">
                    {user.orders.slice(0, 3).map((order: any) => (
                      <div key={order.id} className="flex justify-between text-sm">
                        <code className="text-purple-600 text-xs">{order.id}</code>
                        <span
                          className={`px-2 py-0.5 rounded text-xs ${
                            order.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-600">No customers yet</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
