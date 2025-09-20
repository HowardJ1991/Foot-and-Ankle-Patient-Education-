import React from 'react';

interface HeaderProps {
  onGoHome: () => void;
  showHomeButton: boolean;
}

const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

const Header: React.FC<HeaderProps> = ({ onGoHome, showHomeButton }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md w-full border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between text-gray-800 dark:text-gray-200">
        <div className="text-left">
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">
            USAFA Orthopedics
          </h1>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
            Foot & Ankle Reconstruction
          </p>
        </div>
        {showHomeButton && (
          <button
            onClick={onGoHome}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 focus:ring-blue-500"
            aria-label="Go to home page"
          >
            <HomeIcon className="h-5 w-5" />
            <span className="hidden sm:inline text-sm font-medium">Home</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;