import React, { useState } from 'react';
import { FootIcon } from './icons/FootIcon';
import { QRCodeIcon } from './icons/QRCodeIcon';
import QRCodeModal from './QRCodeModal';

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <header className="bg-brand-blue shadow-md w-full">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between text-white">
          <div className="flex items-center">
            <FootIcon className="h-8 w-8 mr-3 text-white" />
            <h1 className="text-xl md:text-2xl font-bold tracking-wide">
              Foot & Ankle Patient Information
            </h1>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="p-2 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Show QR Code for sharing"
          >
            <QRCodeIcon className="h-6 w-6 text-white" />
          </button>
        </div>
      </header>
      <QRCodeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Header;
