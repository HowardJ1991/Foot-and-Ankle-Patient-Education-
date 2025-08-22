
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white text-center p-4 mt-6">
      <div className="container mx-auto text-xs sm:text-sm">
        <p className="font-semibold">Medical Disclaimer</p>
        <p className="mt-1 opacity-90">
          All information presented on this application is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
