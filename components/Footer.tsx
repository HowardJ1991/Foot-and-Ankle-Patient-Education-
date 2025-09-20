import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-center p-4 mt-6 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto text-xs sm:text-sm">
        <div className="mb-4">
          <p>
            For appointments or questions, please contact{' '}
            <span className="font-semibold">USAFA Orthopedics</span> at{' '}
            <a href="tel:719-333-5040" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              (719) 333-5040
            </a>
            {' or '}
            <a href="mailto:usafa.usafa.10-mdg.mbx.usafafootandankle@health.mil" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline break-all">
              usafa.usafa.10-mdg.mbx.usafafootandankle@health.mil
            </a>
            .
          </p>
        </div>
        
        <p className="opacity-80 mb-4">
          The United States Air Force nor any other Military Service or Federal Department does not approve, endorse, or authorize this company or any other specific company on this website, its products or services. These products and their respective information are meant to serve as a example of a product that may aid or help in your recovery or treatment of a medical issue as discussed with your physician. Please reach out to your physician for more information.
        </p>

        <p className="opacity-80">
          This information is for educational purposes only and is not a substitute for professional medical advice. Always consult your doctor for diagnosis and treatment.
        </p>
      </div>
    </footer>
  );
};

export default Footer;