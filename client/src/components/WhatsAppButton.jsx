// src/components/WhatsAppButton.jsx
import React from "react";

const WhatsAppButton = () => {
  const phoneNumber = "+916394769353"; // ← Apna WhatsApp number daalo (91 ke sath)

  return (
    <a
      href={`https://wa.me/${phoneNumber}`}
      className="fixed bottom-4 right-4 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://img.icons8.com/ios-filled/24/ffffff/whatsapp.png"
        alt="WhatsApp"
        className="w-6 h-6"
      />
    </a>
  );
};

export default WhatsAppButton;
