import React from 'react';
import { Home, Grid, Info } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-black rounded-full mr-3"></div>
          <h1 className="text-2xl font-light tracking-wider">LUMON ARTS</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-black">
            <Home size={18} />
            <span>Generator</span>
          </a>
          <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-black">
            <Grid size={18} />
            <span>Gallery</span>
          </a>
          <a href="#" className="flex items-center space-x-1 text-gray-700 hover:text-black">
            <Info size={18} />
            <span>About</span>
          </a>
        </nav>
        <div className="flex md:hidden">
          <button className="text-gray-700 hover:text-black">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;