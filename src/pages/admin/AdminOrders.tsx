import { useEffect, useState } from 'react';
import { AdminLayout } from '../../components/AdminLayout';
import { Eye, CheckCircle, XCircle } from 'lucide-react';
import { projectId } from '../../utils/supabase/info';

export function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-16edd231/orders`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.orders) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log('Error fetching orders:', error);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const token = localStorage.getItem('admin_token');
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-16edd231/orders/${orderId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );
      fetchOrders();
      if (selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status });
      }
    } catch (error) {
      console.log('Error updating order:', error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl text-gray-900">Orders</h1>
          
          {/* Filter Tabs */}
          <div className="flex gap-2">
            {['all', 'pending', 'completed', 'failed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg transition capitalize ${
                  filter === status
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {filteredOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 text-gray-600">Order ID</th>
                    <th className="text-left py-4 px-6 text-gray-600">Customer</th>
                    <th className="text-left py-4 px-6 text-gray-600">Email</th>
                    <th className="text-left py-4 px-6 text-gray-600">Amount</th>
                    <th className="text-left py-4 px-6 text-gray-600">Status</th>
                    <th className="text-left py-4 px-6 text-gray-600">Date</th>
                    <th className="text-left py-4 px-6 text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-t hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <code className="text-purple-600 text-sm">{order.id}</code>
                      </td>
                      <td className="py-4 px-6">{order.customerName}</td>
                      <td className="py-4 px-6 text-gray-600 text-sm">{order.email}</td>
                      <td className="py-4 px-6">₹{order.total}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            order.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : order.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-600 text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center text-gray-600">
              No orders found
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl text-gray-900">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Order Info */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <code className="text-purple-600">{selectedOrder.id}</code>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Customer:</span>
                  <span className="text-gray-900">{selectedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="text-gray-900">{selectedOrder.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="text-gray-900">{selectedOrder.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="text-gray-900">
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="text-lg text-gray-900 mb-3">Items</h3>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <p className="text-gray-900">{item.name}</p>
                        <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-gray-900">₹{item.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-900">₹{selectedOrder.subtotal}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Discount:</span>
                    <span className="text-green-600">-₹{selectedOrder.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-xl border-t pt-2 mt-2">
                  <span>Total:</span>
                  <span className="text-purple-600">₹{selectedOrder.total}</span>
                </div>
              </div>

              {/* Gift Card Codes */}
              {selectedOrder.giftCardCodes && selectedOrder.giftCardCodes.length > 0 && (
                <div>
                  <h3 className="text-lg text-gray-900 mb-3">Gift Card Codes</h3>
                  <div className="space-y-3">
                    {selectedOrder.giftCardCodes.map((code: any, idx: number) => (
                      <div key={idx} className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                        <p className="text-gray-900 mb-2">{code.cardName}</p>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">Code: </span>
                            <code className="text-purple-600">{code.code}</code>
                          </div>
                          <div>
                            <span className="text-gray-600">PIN: </span>
                            <code className="text-purple-600">{code.pin}</code>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Update */}
              <div className="flex gap-3">
                {selectedOrder.status !== 'completed' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'completed')}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Mark as Completed
                  </button>
                )}
                {selectedOrder.status !== 'failed' && (
                  <button
                    onClick={() => updateOrderStatus(selectedOrder.id, 'failed')}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
                  >
                    <XCircle className="w-5 h-5" />
                    Mark as Failed
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
