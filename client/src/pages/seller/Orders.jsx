import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";

const LABEL_WIDTH_IN = 4;
const LABEL_HEIGHT_IN = 6;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [manualFields, setManualFields] = useState({
    weight: "0.5 kg",
    dims: "10x10x5 cm",
  });

  // ✅ Search
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://shrishivay-4.onrender.com/api/order/seller", { withCredentials: true });
      if (res.data?.success === false) {
        toast.error(res.data.message || "Failed to fetch orders");
        setOrders([]);
      } else {
        setOrders(res.data?.orders || []);
      }
    } catch {
      toast.error("Failed to fetch orders");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /** Build Label HTML */
  const buildLabelHTML = async (order, weight, dims) => {
    const awb = order.awb || order.trackingId || order._id;
    const trackingUrl =
      order.trackingUrl ||
      `https://track.aftership.com/${encodeURIComponent(awb || "")}`;

    // QR
    let qrDataUrl = "";
    try {
      qrDataUrl = await QRCode.toDataURL(trackingUrl || String(awb || ""));
    } catch {
      qrDataUrl = "";
    }

    // Barcode
    let barcodeDataUrl = "";
    try {
      const canvas = document.createElement("canvas");
      JsBarcode(canvas, String(awb || ""), {
        format: "CODE128",
        displayValue: false,
        margin: 0,
        width: 2,
        height: 80,
      });
      barcodeDataUrl = canvas.toDataURL("image/png");
    } catch {
      barcodeDataUrl = "";
    }

    // Totals
    const subtotal = (order.items || []).reduce((acc, item) => {
      const price = item.product?.offerPrice || 0;
      const qty = item.quantity || 0;
      return acc + price * qty;
    }, 0);
    const gstAmount = (subtotal * 12) / 100;
    const shippingCharge = 39;
    const grandTotal = subtotal + gstAmount + shippingCharge;
    const isCOD = String(order.paymentType || "").toLowerCase() === "cod";

    const itemsHtml = (order.items || [])
      .slice(0, 6)
      .map((it) => {
        const sku = it.product?.sku || it.product?.code || "";
        const name = it.product?.name || "Item";
        const qty = it.quantity || 0;
        return `<div class="il">
            <span class="sku">${sku}</span>
            <span class="nm">${name}</span>
            <span class="qt">x${qty}</span>
          </div>`;
      })
      .join("");

    const toName = order.userId?.name || "Customer";
    const toPhone = order.address?.phone || order.userId?.phone || "";
    const toAddress = [
      order.address?.street,
      order.address?.city,
      order.address?.state,
      order.address?.pincode,
    ]
      .filter(Boolean)
      .join(", ");

    const sellerName = "VD Elevate Tech Solutions";
    const sellerGstin = "27ABCDE1234F1Z5";
    const sellerFrom = "Bhopal, Madhya Pradesh, IN";
    const carrier = order.carrier || "Carrier";

    return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Label - ${awb}</title>
  <style>
    @page { size: ${LABEL_WIDTH_IN}in ${LABEL_HEIGHT_IN}in; margin: 0; }
    html, body { padding:0; margin:0; }
    body {
      width:${LABEL_WIDTH_IN}in; height:${LABEL_HEIGHT_IN}in;
      font-family: Arial, Helvetica, sans-serif;
      -webkit-print-color-adjust: exact; print-color-adjust: exact;
      color:#111827;
    }
    .label { box-sizing: border-box; width:100%; height:100%; padding:12px; display:flex; flex-direction:column; gap:8px; }
    .row { display:flex; align-items:flex-start; justify-content:space-between; }
    .muted { color:#4b5563; font-size:11px; }
    .badge { font-weight:700; border:1px solid #111; padding:2px 6px; font-size:12px; }
    .cod { background:#fef3c7; border-color:#92400e; }
    .prepaid { background:#dcfce7; border-color:#166534; }
    .rule { border-top:1px dashed #9ca3af; margin:2px 0; }
    .to { border:2px solid #000; padding:8px; border-radius:6px; margin-top:2px; }
    .to h2 { margin:0 0 4px 0; font-size:18px; }
    .to .ad { font-size:14px; line-height:1.25; }
    .meta { display:flex; gap:8px; flex-wrap:wrap; font-size:12px; }
    .meta div { border:1px solid #000; border-radius:6px; padding:4px 6px; }
    .grid { display:grid; grid-template-columns: 1fr auto; gap:8px; align-items:center; }
    .items { border:1px dashed #6b7280; border-radius:6px; padding:6px; }
    .il { display:grid; grid-template-columns: 70px 1fr 36px; gap:6px; font-size:12px; }
    .sku { font-weight:700; }
    .nm { overflow:hidden; white-space:nowrap; text-overflow:ellipsis; }
    .qt { text-align:right; }
    .barcode { width:100%; display:flex; justify-content:center; }
    .foot { font-size:11px; display:flex; justify-content:space-between; }
    .hdr h1 { font-size:18px; margin:0; }
  </style>
</head>
<body>
  <div class="label">
    <div class="row hdr">
      <div>
        <h1>${carrier}</h1>
        <small class="muted">AWB / Ref: <strong>${awb}</strong></small>
      </div>
      <div class="badge ${isCOD ? "cod" : "prepaid"}">${isCOD ? "COD" : "PREPAID"}</div>
    </div>

    <div class="to">
      <h2>TO: ${toName}${toPhone ? " · " + toPhone : ""}</h2>
      <div class="ad">${toAddress || "Address not provided"}</div>
    </div>

    <div class="grid">
      <div>
        <div class="meta">
          <div><strong>Order:</strong> ${order._id}</div>
          <div><strong>GSTIN:</strong> ${order.gstNumber || "NA"}</div>
          <div><strong>Weight:</strong> ${weight}</div>
          <div><strong>Dims:</strong> ${dims}</div>
          <div><strong>Payment:</strong> ${isCOD ? `COD ₹${grandTotal.toFixed(2)}` : "Prepaid"}</div>
        </div>
        <div class="rule"></div>
        <div class="items">
          <h4>Items</h4>
          ${itemsHtml || '<div class="il"><span class="nm">No items</span></div>'}
        </div>
      </div>
      <div>
        ${qrDataUrl ? `<img class="qr" src="${qrDataUrl}" style="width:100px;height:100px"/>` : ""}
        <div class="muted" style="max-width:110px; word-break:break-all; margin-top:4px;">
          Track: ${trackingUrl}
        </div>
      </div>
    </div>

    <div class="barcode">
      ${barcodeDataUrl ? `<img src="${barcodeDataUrl}" style="height:80px"/>` : "BARCODE ERROR"}
    </div>

    <div class="foot">
      <div>
        <div><strong>FROM:</strong> ${sellerName}</div>
        <div class="muted">${sellerFrom}</div>
      </div>
      <div class="muted">GSTIN: ${sellerGstin}</div>
    </div>
  </div>
</body>
</html>`;
  };

  const handleGenerateAndPrint = async () => {
    if (!selectedOrder) return;
    const w = window.open("", "_blank", "width=800,height=600");
    if (!w) {
      toast.error("Popup blocked! Please allow popups for this site.");
      return;
    }
    try {
      const html = await buildLabelHTML(
        selectedOrder,
        manualFields.weight,
        manualFields.dims
      );
      w.document.open();
      w.document.write(html);
      w.document.close();
      w.focus();
      w.print();
      setTimeout(() => {
        try {
          w.close();
        } catch {}
      }, 500);
      setShowModal(false);
    } catch (e) {
      console.error(e);
      toast.error("Could not generate label");
      w.close();
    }
  };

  // ✅ Filtered orders by searchTerm
  const filteredOrders = orders.filter((o) =>
    o._id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-6 tracking-wide">
        Shipping Labels
      </h2>

      {/* ✅ Search box */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by Order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading orders...</p>
      ) : filteredOrders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const subtotal = (order.items || []).reduce((acc, item) => {
              const price = item.product?.offerPrice || 0;
              const qty = item.quantity || 0;
              return acc + price * qty;
            }, 0);
            const gstAmount = (subtotal * 12) / 100;
            const shippingCharge = 39;
            const finalTotal = subtotal + gstAmount + shippingCharge;

            return (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow border border-gray-200 p-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                      Order
                    </h3>
                    <p>
                      <span className="font-semibold text-gray-600">
                        Order ID:
                      </span>{" "}
                      {order._id}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-600">
                        Customer:
                      </span>{" "}
                      {order.userId?.name}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-600">
                        Payment:
                      </span>{" "}
                      {order.paymentType}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-600">Total:</span>{" "}
                      ₹{finalTotal.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-600 mb-2">
                      Ship To
                    </h3>
                    <p className="text-gray-700">
                      {order.address?.street}, {order.address?.city},{" "}
                      {order.address?.state} - {order.address?.pincode}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Phone:</span>{" "}
                      {order.address?.phone || order.userId?.phone || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="text-right mt-6">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setShowModal(true);
                    }}
                    className="inline-block px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
                  >
                    Print Label (4×6) – QR + Barcode
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-indigo-700">
              Enter Label Details
            </h3>

            <label className="block mb-3">
              <span className="text-gray-700 font-medium">Weight</span>
              <input
                type="text"
                value={manualFields.weight}
                onChange={(e) =>
                  setManualFields({ ...manualFields, weight: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </label>

            <label className="block mb-3">
              <span className="text-gray-700 font-medium">Dimensions</span>
              <input
                type="text"
                value={manualFields.dims}
                onChange={(e) =>
                  setManualFields({ ...manualFields, dims: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </label>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateAndPrint}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Generate & Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
