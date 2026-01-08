import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Orderlist = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://shrishivay-4.onrender.com/api/order/seller", { withCredentials: true });
      if (res.data.success === false) {
        toast.error(res.data.message || "Failed to fetch orders");
        setOrders([]);
      } else {
        setOrders(res.data.orders || []);
      }
    } catch (err) {
      toast.error("Failed to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔎 Search filter
  const filteredOrders = orders.filter((order) =>
    order._id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCloseModal = () => setSelectedOrder(null);

  // ✅ Ship Order
  const handleShipOrder = async (orderId) => {
    try {
      const res = await axios.put(`https://shrishivay-4.onrender.com/api/order/${orderId}/ship`, {}, { withCredentials: true });
      if (res.data.success) {
        toast.success("Order marked as shipped!");
        const updatedOrder = res.data.order;
        setOrders((prev) =>
          prev.map((order) => (order._id === orderId ? updatedOrder : order))
        );
      } else {
        toast.error(res.data.message || "Failed to update order");
      }
    } catch (err) {
      toast.error("Error while shipping order");
    }
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12 text-gray-800">
      <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-10">
        📦 Orders List
      </h2>

      {/* 🔍 Search Box */}
      <div className="flex justify-end mb-6">
        <input
          type="text"
          placeholder="Search by Order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-72 px-4 py-2 rounded-lg bg-gray-50 text-gray-700 placeholder-gray-400 
          border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No orders found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left uppercase">Order ID</th>
                <th className="px-6 py-3 text-left uppercase">Customer</th>
                <th className="px-6 py-3 text-left uppercase">Payment</th>
                <th className="px-6 py-3 text-left uppercase">Status</th>
                <th className="px-6 py-3 text-left uppercase">Date</th>
                <th className="px-6 py-3 text-right uppercase">Total</th>
                <th className="px-6 py-3 text-center uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => {
                const subtotal = order.items.reduce((acc, item) => {
                  const price = item.product?.offerPrice || 0;
                  const qty = item.quantity || 0;
                  return acc + price * qty;
                }, 0);
                const gstAmount = (subtotal * 12) / 100;
                const shippingCharge = 39;
                const finalTotal = subtotal + gstAmount + shippingCharge;

                return (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 transition border-b border-gray-200"
                  >
                    <td className="px-6 py-4 font-semibold text-blue-600">
                      {order._id}
                    </td>
                    <td className="px-6 py-4">{order.userId?.name || "N/A"}</td>
                    <td className="px-6 py-4">
                      <span
                        className={
                          order.paymentType?.toLowerCase() === "cod"
                            ? "text-yellow-600 font-semibold"
                            : "text-green-600 font-semibold"
                        }
                      >
                        {order.paymentType || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={
                          order.isPaid
                            ? "px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs"
                            : "px-2 py-1 bg-red-100 text-red-600 rounded-lg text-xs"
                        }
                      >
                        {order.isPaid ? "Paid" : "Not Paid"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-blue-600">
                      ₹{finalTotal.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-center space-x-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-3 py-1 rounded-lg bg-blue-500 text-white shadow hover:bg-blue-600 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleShipOrder(order._id)}
                        disabled={order.status === "packed"}
                        className={`px-3 py-1 rounded-lg shadow transition ${
                          order.status === "packed"
                            ? "bg-green-400/60 text-white cursor-not-allowed"
                            : "bg-yellow-500 hover:bg-yellow-600 text-white"
                        }`}
                      >
                        {order.status === "packed" ? "Shipped" : "Ship"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Invoice Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4">
          <div className="bg-white text-gray-800 max-w-3xl w-full rounded-xl shadow-2xl p-6 relative overflow-y-auto max-h-[90vh] border border-gray-200">
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✖
            </button>

            <h3 className="text-2xl font-bold text-blue-700 mb-2 text-center">
              Invoice
            </h3>
            <p className="text-center text-sm text-gray-500 mb-6">
              GST IN : 27ABCDE1234F1Z5
            </p>

            {/* Order Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-6">
              <div className="space-y-1">
                <p><strong>Order ID:</strong> {selectedOrder._id}</p>
                <p><strong>Customer:</strong> {selectedOrder.userId?.name}</p>
                <p><strong>Email:</strong> {selectedOrder.userId?.email}</p>
                <p><strong>Phone:</strong> {selectedOrder.address?.phone}</p>
                <p><strong>GST No:</strong> {selectedOrder.userId?.gstNumber || "Not Provided"}</p>
              </div>
              <div className="space-y-1">
                <p><strong>Payment:</strong> {selectedOrder.paymentType}</p>
                <p><strong>Status:</strong> {selectedOrder.isPaid ? "Paid" : "Not Paid"}</p>
                <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                <p><strong>Address:</strong> {selectedOrder.address?.street}, {selectedOrder.address?.city}</p>
              </div>
            </div>

            {/* Items */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="px-3 py-2 text-left">Product</th>
                    <th className="px-3 py-2 text-center">Qty</th>
                    <th className="px-3 py-2 text-right">Price</th>
                    <th className="px-3 py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, i) => (
                    <tr key={i} className="border-b border-gray-200">
                      <td className="px-3 py-2">{item.product?.name}</td>
                      <td className="px-3 py-2 text-center">{item.quantity}</td>
                      <td className="px-3 py-2 text-right">₹{item.product?.offerPrice}</td>
                      <td className="px-3 py-2 text-right">
                        ₹{item.product?.offerPrice * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Billing */}
            <div className="mt-6 text-right space-y-1">
              <p>
                <strong>Subtotal:</strong> ₹
                {selectedOrder.items
                  .reduce(
                    (acc, item) =>
                      acc + (item.product?.offerPrice || 0) * (item.quantity || 0),
                    0
                  )
                  .toFixed(2)}
              </p>
              <p>
                <strong>GST (12%):</strong> ₹
                {(
                  (selectedOrder.items.reduce(
                    (acc, item) =>
                      acc + (item.product?.offerPrice || 0) * (item.quantity || 0),
                    0
                  ) *
                    12) /
                  100
                ).toFixed(2)}
              </p>
              <p><strong>Shipping:</strong> ₹39</p>
              <p className="text-xl font-bold text-blue-700 mt-2">
                Total: ₹
                {(
                  selectedOrder.items.reduce(
                    (acc, item) =>
                      acc + (item.product?.offerPrice || 0) * (item.quantity || 0),
                    0
                  ) +
                  (selectedOrder.items.reduce(
                    (acc, item) =>
                      acc + (item.product?.offerPrice || 0) * (item.quantity || 0),
                    0
                  ) *
                    12) /
                    100 +
                  39
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orderlist;
