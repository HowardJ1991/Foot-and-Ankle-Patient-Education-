
import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
      <p className="mt-4 text-brand-gray">Generating information...</p>
    </div>
  );
};

export default Spinner;
