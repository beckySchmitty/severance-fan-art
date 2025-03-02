import React, { useState } from 'react';
import Header from './components/Header';
import ArtGenerator from './components/ArtGenerator';
import Gallery from './components/Gallery';
import Footer from './components/Footer';

type Page = 'generator' | 'gallery' | 'about';

const App: React.FC = () => {
  const [currentPage, _setCurrentPage] = useState<Page>('generator');

  const renderPage = () => {
    switch (currentPage) {
      case 'generator':
        return <ArtGenerator />;
      case 'gallery':
        return <Gallery />;
      case 'about':
        return (
          <div className="flex-grow p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-medium mb-4">About Severance Art Generator</h1>
            <p className="mb-4">
              This fan art generator creates images inspired by the Apple TV+ show "Severance".
              The application was created as a tribute to the show's unique visual aesthetic and storytelling.
            </p>
            <p className="mb-4">
              All art is AI-generated and for personal use only. This project is not affiliated with
              or endorsed by Apple TV+ or the creators of "Severance".
            </p>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h2 className="text-lg font-medium mb-2">About Severance</h2>
              <p>
                "Severance" is a workplace thriller series that follows Mark Scout, who leads a team at Lumon Industries,
                where employees have undergone a surgical procedure that separates their work and personal memories.
              </p>
            </div>
          </div>
        );
      default:
        return <ArtGenerator />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Header />
      {renderPage()}
      <Footer />
    </div>
  );
};

export default App;