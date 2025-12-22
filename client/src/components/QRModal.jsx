// src/components/QRModal.jsx
import React from "react";
import { QRCode } from "react-qrcode-logo";

const QRModal = ({ show, onClose, qrValue }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Scan to Pay</h2>
        <QRCode value={qrValue} size={200} />
        <p className="mt-4 text-gray-600">Scan the QR code to complete the payment</p>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QRModal;
