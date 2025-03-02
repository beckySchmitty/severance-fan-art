import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Lumon Industries Fan Art Generator</p>
          <p className="mt-2 md:mt-0">Not affiliated with Apple TV+ or "Severance"</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;