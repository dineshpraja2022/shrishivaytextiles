import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { axios, user } = useContext(AppContext);

  // Fetch user's orders
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Print invoice handler
  const handlePrint = (orderId) => {
    const content = document.getElementById(`invoice-${orderId}`)?.innerHTML;
    if (!content) {
      toast.error("Invoice content not found");
      return;
    }
    const printWindow = window.open("", "_blank", "width=900,height=700");

    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${orderId}</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              margin: 0;
              padding: 40px;
              color: #333;
              background-color: #fff;
            }
            .invoice-box {
              max-width: 800px;
              margin: auto;
              padding: 30px;
              border: 1px solid #eee;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
              line-height: 24px;
              font-size: 14px;
              color: #555;
            }
            .invoice-box table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            .invoice-box table th,
            .invoice-box table td {
              border: 1px solid #ddd;
              padding: 8px;
              vertical-align: top;
            }
            .invoice-box table th {
              background: #f5f5f5;
              font-weight: 600;
              border-top: 1px solid #ddd;
              border-bottom: 1px solid #ddd;
              text-align: left;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 12px;
              color: #999;
            }
            img {
              width: 50px;
              height: 50px;
              object-fit: cover;
              border-radius: 4px;
            }
            @media print {
              button {
                display: none;
              }
              body {
                margin: 0;
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="invoice-box">${content}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-500">Loading your orders...</p>
    );
  }

  if (!user) {
    return (
      <p className="text-center mt-20 text-red-500">
        Please login to view your orders.
      </p>
    );
  }

  if (myOrders.length === 0) {
    return (
      <p className="text-center mt-20 text-gray-500">You have no orders yet.</p>
    );
  }

  return (
    <div className="px-4 sm:px-8 py-12 bg-gray-100 min-h-screen mt-28">
      <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800 mb-12">
        My Orders
      </h2>

      {myOrders.map((order) => {
        // Calculate subtotal from items
        const subtotal = order.items.reduce((sum, item) => {
          const price = item?.product?.offerPrice || 0;
          const qty = item.quantity || 0;
          return sum + price * qty;
        }, 0);

        // GST 12% on subtotal
        const gstAmount = (subtotal * 12) / 100;

        // Shipping fixed charge
        const shippingCharge = 39;

        // Total amount always includes shipping charge
        const totalAmount = subtotal + gstAmount + shippingCharge;

        return (
          <div
            key={order._id}
            className="bg-white rounded-xl shadow-md mb-12 p-4 sm:p-6"
          >
            <div id={`invoice-${order._id}`}>
              {/* Invoice Header */}
              <div className="text-center mb-6 border-b pb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-indigo-700">
                  Shri Shivay Textiles
                </h1>
                <p className="text-gray-600 text-xs sm:text-sm leading-tight">
                  Araji 152 Plot No 6, Partapur Majra Rampur, Mahadev Trader And Hardware,
                  Mardan Pur, Kanpur, Kanpur Nagar-208021, Uttar Pradesh
                </p>
                <p className="text-gray-600 text-xs sm:text-sm">
                  GSTIN: <strong>09FFOPD8390N1ZH</strong>
                </p>
                <h2 className="text-lg sm:text-xl font-semibold mt-4 text-indigo-600">
                  Invoice
                </h2>
              </div>

              {/* Order & Customer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-gray-700 mb-4">
                <p>
                  <span className="font-medium">Customer:</span> {user.name}
                </p>
                <p>
                  <span className="font-medium">Order ID:</span> {order._id}
                </p>
  
  <p><span className="font-medium">GST No:</span> {order.gstNumber || "Not Provided"}</p>

                <p>
                  <span className="font-medium">Email:</span> {user.email}
                </p>
                <p>
                  <span className="font-medium">Mobile No:</span>{" "}
                  {order.address?.phone || order.userId?.phone || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Delivery Date:</span>{" "}
                  {order.createdAt
                    ? new Date(
                        new Date(order.createdAt).setDate(
                          new Date(order.createdAt).getDate() + 7
                        )
                      ).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  <span className="font-medium">Order Date:</span>{" "}
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString()
                    : "N/A"}
                </p>
                
                <p>
                  <span className="font-medium">Payment Method:</span> {order.paymentType || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Status:</span> {order.status || "Pending"}
                </p>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto mt-6">
                <table className="min-w-full text-xs sm:text-sm border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-2 sm:px-4 py-2 border">Product</th>
                      <th className="px-2 sm:px-4 py-2 border">Image</th>
                      <th className="px-2 sm:px-4 py-2 border">Category</th>
                      <th className="px-2 sm:px-4 py-2 border">Qty</th>
                      <th className="px-2 sm:px-4 py-2 border">Price</th>
                      <th className="px-2 sm:px-4 py-2 border">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, index) => (
                      <tr key={index} className="text-gray-800">
                        <td className="px-2 sm:px-4 py-2 border">{item?.product?.name || "N/A"}</td>
                        <td className="px-2 sm:px-4 py-2 border">
                          <img
                            src={
                              item?.product?.image && item.product.image.length > 0
                                ? `http://localhost:5000/images/${item.product.image[0]}`
                                : "/placeholder.png"
                            }
                            alt={item?.product?.name || "Product Image"}
                            className="w-10 sm:w-14 h-10 sm:h-14 object-cover rounded shadow"
                          />
                        </td>
                        <td className="px-2 sm:px-4 py-2 border">{item?.product?.category || "N/A"}</td>
                        <td className="px-2 sm:px-4 py-2 border text-center">{item.quantity || 0}</td>
                        <td className="px-2 sm:px-4 py-2 border">&#8377;{item?.product?.offerPrice?.toFixed(2) || "0.00"}</td>
                        <td className="px-2 sm:px-4 py-2 border font-medium">
                          &#8377;{(item?.product?.offerPrice * item.quantity)?.toFixed(2) || "0.00"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="text-right text-xs sm:text-sm mt-6 text-gray-800 space-y-1">
                <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
                <p>GST (12%): ₹{gstAmount.toFixed(2)}</p>
                <p>Shipping Charge: ₹{shippingCharge.toFixed(2)}</p>
                <p className="text-base sm:text-lg font-semibold mt-2 text-green-700">
                  Total Amount: ₹{totalAmount.toFixed(2)}
                </p>
              </div>

              {/* Footer */}
              <div className="footer mt-8 text-center text-gray-500 text-xs sm:text-sm">
                <p>
                  Thank you for shopping with <strong>Shri Shivay Textiles</strong>.
                </p>
                <p>We appreciate your business. Visit Again!</p>
                <p className="text-xs">Design By VD Elevate Tech Solutions</p>
              </div>
            </div>

            {/* Print Button */}
            <div className="text-right mt-6">
              <button
                onClick={() => handlePrint(order._id)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 sm:px-5 py-2 rounded-md transition"
              >
                Print Invoice
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MyOrders;
