import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);
  const [todayOrders, setTodayOrders] = useState(0);
  const [todayShippedQty, setTodayShippedQty] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderStats = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const response = await axios.get("https://shrishivay-4.onrender.com/api/order/seller", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success && response.data.orders) {
          const orders = response.data.orders;

          setTotalOrders(orders.length);
          setTotalAmount(orders.reduce((acc, order) => acc + order.amount, 0));
          setRecentOrders(orders.slice(0, 5));

          const shippedOrders = orders.filter((order) => order.isShipped);
          const shippedQty = shippedOrders.reduce((acc, order) => {
            return acc + order.items.reduce((qAcc, item) => qAcc + (item.quantity || 0), 0);
          }, 0);
          setTotalQuantity(shippedQty);

          const today = new Date().toDateString();
          const todayOrdersList = orders.filter(
            (order) => new Date(order.createdAt).toDateString() === today
          );
          setTodayOrders(todayOrdersList.length);

          const todayShipped = todayOrdersList.filter((order) => order.isShipped);
          const todayShippedQtyCalc = todayShipped.reduce((acc, order) => {
            return acc + order.items.reduce((qAcc, item) => qAcc + (item.quantity || 0), 0);
          }, 0);
          setTodayShippedQty(todayShippedQtyCalc);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderStats();
  }, []);

  // 🔹 Stat Card Component (Dark Blue Style)
  const StatCard = ({ title, value, icon }) => (
    <div
      className="rounded-2xl p-6 flex items-center gap-5 
      bg-gradient-to-r from-blue-800 to-blue-900 shadow-lg border border-blue-700
      hover:shadow-blue-500/50 hover:-translate-y-1 transform transition-all duration-300"
    >
      <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-5 rounded-xl text-white text-2xl shadow">
        {icon}
      </div>
      <div>
        <p className="text-sm text-blue-200">{title}</p>
        <h2 className="text-2xl font-extrabold text-white">{value}</h2>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white py-12 px-6 lg:px-16 text-gray-900">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
        Seller Dashboard
        <span className="block w-40 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mt-3 rounded-full"></span>
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
        <StatCard title="Total Orders" value={totalOrders} icon={<i className="fas fa-shopping-cart"></i>} />
        <StatCard title="Total Shipped Qty" value={totalQuantity} icon={<i className="fas fa-truck"></i>} />
        <StatCard title="Today’s Orders" value={todayOrders} icon={<i className="fas fa-calendar-day"></i>} />
        <StatCard title="Today’s Shipped Qty" value={todayShippedQty} icon={<i className="fas fa-shipping-fast"></i>} />
        <StatCard title="Total Revenue" value={`₹ ${totalAmount.toLocaleString()}`} icon={<i className="fas fa-rupee-sign"></i>} />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-700">
          🕒 Recent Orders
        </h3>

        {loading ? (
          <p className="text-gray-500 text-center py-8">Loading...</p>
        ) : recentOrders.length === 0 ? (
          <p className="text-center py-6 text-gray-500">No recent orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
                  <th className="py-3 px-4 text-left">Customer</th>
                  <th className="py-3 px-4 text-left">Amount</th>
                  <th className="py-3 px-4 text-left">Quantity</th>
                  <th className="py-3 px-4 text-left">Payment</th>
                  <th className="py-3 px-4 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr
                    key={index}
                    className="bg-gray-50 border-b border-gray-200 hover:bg-blue-50 transition"
                  >
                    <td className="py-3 px-4 font-medium text-gray-700">{order.userId?.name || "Guest"}</td>
                    <td className="py-3 px-4 font-semibold text-green-600">₹ {order.amount.toLocaleString()}</td>
                    <td className="py-3 px-4 text-gray-700">
                      {order.items.reduce((acc, item) => acc + (item.quantity || 0), 0)}
                    </td>
                    <td className="py-3 px-4">
                      {order.isPaid ? (
                        <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                          Paid
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-semibold">
                          Unpaid
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
