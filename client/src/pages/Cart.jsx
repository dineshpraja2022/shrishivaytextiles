import { useEffect, useState, useCallback } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

/* ---------------- Razorpay Modal Component ---------------- */
const RazorpayModal = ({ show, onClose, amount, onSuccess, items, address, gstNumber }) => {
  useEffect(() => {
    if (show && !window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }
  }, [show]);

  const openRazorpay = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/razorpay`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items, address, gstNumber }),
          credentials: "include",
        }
      );
      const data = await res.json();

      if (!data.success) {
        toast.error(data.message || "Failed to create Razorpay order");
        return;
      }

      const options = {
        key: data.key,
        amount: data.amount * 100, // paise
        currency: data.currency,
        name: "My Shop",
        description: "Order Payment",
        order_id: data.orderId,
        handler: async (response) => {
          try {
            const verifyRes = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}/api/order/verify`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  items,
                  address,
                  gstNumber,
                }),
                credentials: "include",
              }
            );

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              toast.success("Payment Successful!");
              onSuccess();
              onClose();
            } else {
              toast.error("Payment verification failed!");
            }
          } catch (err) {
            console.error(err);
            toast.error("Error verifying payment");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong with payment");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 mt-20">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
        <h2 className="text-lg font-bold mb-4">Complete Payment</h2>
        <p className="mb-6">Click below to pay ₹{amount.toFixed(2)}</p>
        <button
          onClick={openRazorpay}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          Pay with Razorpay
        </button>
        <button
          onClick={onClose}
          className="block mt-4 text-gray-500 hover:underline mx-auto"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

/* ---------------- Main Cart Component ---------------- */
const Cart = () => {
  const {
    products,
    navigate,
    cartItems,
    setCartItems,
    removeFromCart,
    updateCartItem,
    user,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [address, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [gstNumber, setGstNumber] = useState(""); // <-- NEW STATE

  /* -------- Fetch Address -------- */
  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/address/get`,
            { withCredentials: true }
          );
          if (data.success) {
            setAddress(data.addresses);
            if (data.addresses.length > 0) {
              setSelectedAddress(data.addresses[0]);
            }
          } else {
            toast.error(data.message);
          }
        } catch {
          toast.error("Failed to fetch addresses");
        }
      })();
    }
  }, [user]);

  /* -------- Build Cart Array -------- */
  useEffect(() => {
    const tempArray = Object.entries(cartItems)
      .map(([id, qty]) => {
        const product = products.find((p) => p._id === id);
        if (!product) {
          console.warn(`Product not found for id ${id}`);
          return null;
        }
        return { ...product, price: Number(product.offerPrice), quantity: Number(qty) };
      })
      .filter(Boolean);

    setCartArray(tempArray);
  }, [products, cartItems]);

  const totalCartAmount = useCallback(
    () => cartArray.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartArray]
  );

  const calculateTotalWithTax = useCallback(() => {
    const total = totalCartAmount();
    return (total + total * 0.12 + 39).toFixed(2); // GST + Shipping
  }, [totalCartAmount]);

  /* -------- Place Order -------- */
  const placeOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    if (cartArray.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    if (paymentOption === "COD") {
      setIsPlacingOrder(true);
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/order/cod`,
          {
            items: cartArray.map((item) => ({
              product: item._id,
              quantity: item.quantity,
            })),
            address: selectedAddress._id,
            gstNumber: gstNumber.trim() || undefined, // <-- optional send
          },
          { withCredentials: true }
        );

        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message || "Order failed");
      } finally {
        setIsPlacingOrder(false);
      }
    } else {
      setShowRazorpayModal(true);
    }
  };

  if (!products.length || !cartItems) return null;

  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto mt-20">
      {/* Cart Items */}
      <div className="flex-1 pr-0 md:pr-10">
        <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
        {cartArray.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartArray.map((item) => {
            // Image URL handling
            const BASE_URL = `${import.meta.env.VITE_VITE_URL}/uploads/`;
            let imageUrl = "";
            if (Array.isArray(item.images) && item.images.length > 0) {
              imageUrl = BASE_URL + item.images[0];
            } else if (typeof item.images === "string" && item.images.trim() !== "") {
              imageUrl = BASE_URL + item.images;
            } else {
              imageUrl = "https://via.placeholder.com/150x150?text=No+Images";
            }

            return (
              <div
                key={item._id}
                className="flex items-center justify-between border-b border-gray-200 py-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-gray-500">₹{item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button
                        onClick={() =>
                          updateCartItem(item._id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        className="px-2 bg-gray-200"
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateCartItem(item._id, item.quantity + 1)
                        }
                        className="px-2 bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 text-sm mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Order Summary */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 mt-10 md:mt-0 border border-gray-300/70">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        {/* Address */}
        <p className="text-sm font-medium uppercase">Delivery Address</p>
        <div className="relative flex justify-between items-start mt-2">
          <p className="text-gray-500">
            {selectedAddress
              ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
              : "No Address Found"}
          </p>
          <button
            onClick={() => setShowAddress((prev) => !prev)}
            className="text-indigo-500 hover:underline cursor-pointer"
          >
            Change
          </button>
          {showAddress && (
            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-20 max-h-48 overflow-auto">
              {address.map((addr, i) => (
                <p
                  key={i}
                  onClick={() => {
                    setSelectedAddress(addr);
                    setShowAddress(false);
                  }}
                  className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {addr.street}, {addr.city}, {addr.state}, {addr.country}
                </p>
              ))}
              <p
                onClick={() => navigate("/add-address")}
                className="text-indigo-500 text-center cursor-pointer p-2 hover:bg-indigo-500/10"
              >
                Add address
              </p>
            </div>
          )}
        </div>

        {/* GST Number (optional) */}
        <p className="text-sm font-medium uppercase mt-6">GST Number (Optional)</p>
        <input
          type="text"
          value={gstNumber}
          onChange={(e) => setGstNumber(e.target.value)}
          placeholder="Enter GST Number"
          className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
        />

        {/* Payment Method */}
        <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
        <select
          value={paymentOption}
          onChange={(e) => setPaymentOption(e.target.value)}
          className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
        >
          <option value="COD">Cash On Delivery</option>
          <option value="Online">Online Payment</option>
        </select>

        <hr className="border-gray-300 my-5" />

        {/* Pricing */}
        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>₹{totalCartAmount().toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Charge</span>
            <span className="text-green-600">₹39.00</span>
          </p>
          <p className="flex justify-between">
            <span>GST (12%)</span>
            <span>{(totalCartAmount() * 0.12).toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>₹{calculateTotalWithTax()}</span>
          </p>
        </div>

        {/* Place Order Button */}
        <button
          onClick={placeOrder}
          disabled={isPlacingOrder || cartArray.length === 0}
          className={`w-full py-3 mt-6 text-white font-medium transition ${
            isPlacingOrder
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          {isPlacingOrder
            ? "Placing Order..."
            : paymentOption === "COD"
            ? "Place Order"
            : "Proceed to Pay"}
        </button>
      </div>

      {/* Razorpay Modal */}
      <RazorpayModal
        show={showRazorpayModal}
        onClose={() => setShowRazorpayModal(false)}
        amount={parseFloat(calculateTotalWithTax())}
        items={cartArray.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        }))}
        address={selectedAddress?._id}
        gstNumber={gstNumber.trim() || undefined}
        onSuccess={() => {
          setCartItems({});
          navigate("/my-orders");
          setShowRazorpayModal(false);
        }}
      />
    </div>
  );
};

export default Cart;
