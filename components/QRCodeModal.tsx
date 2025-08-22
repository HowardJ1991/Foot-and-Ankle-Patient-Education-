import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({ isOpen, onClose }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    // Get URL on client side to avoid SSR issues
    if (isOpen) {
      setUrl(window.location.href);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 max-w-sm w-full relative transform transition-all duration-300 scale-95 opacity-0 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-brand-dark mb-4">Share this Page</h2>
          <p className="text-brand-gray mb-6">
            Scan this QR code with your phone's camera to open this information portal.
          </p>
          <div className="p-4 border-4 border-gray-100 rounded-lg inline-block bg-white">
            {url ? (
              <QRCodeSVG value={url} size={200} bgColor={"#ffffff"} fgColor={"#000000"} level={"L"} />
            ) : (
              <div className="w-[200px] h-[200px] bg-gray-200 animate-pulse rounded-md"></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeModal;
