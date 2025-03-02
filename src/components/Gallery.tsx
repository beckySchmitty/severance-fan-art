import React, { useState, useEffect } from 'react';
import { Trash2, Download } from 'lucide-react';
import { ArtImage } from '../types';
import { getSavedImages, removeImage, downloadImage } from '../utils/imageService';

const Gallery: React.FC = () => {
  const [savedImages, setSavedImages] = useState<ArtImage[]>([]);

  useEffect(() => {
    setSavedImages(getSavedImages());
  }, []);

  const handleRemoveImage = (imageId: string) => {
    removeImage(imageId);
    setSavedImages(getSavedImages());
  };

  const handleDownloadImage = (image: ArtImage) => {
    downloadImage(image);
  };

  if (savedImages.length === 0) {
    return (
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="text-center max-w-md p-8 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-2xl font-medium mb-2">No Saved Art</h2>
          <p className="text-gray-600 mb-6">
            You haven't saved any art yet. Generate and save some to build your collection.
          </p>
          <button className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800">
            Back to Generator
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow p-4 max-w-6xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-medium">Your Saved Art</h1>
        <p className="text-gray-600">Your personally curated collection of Severance-inspired art.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedImages.map((image) => (
          <div key={image.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative">
              <img src={image.url} alt="Saved Severance art" className="w-full aspect-video object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="text-white">
                  <p className="text-sm uppercase tracking-wider mb-1">
                    {image.style === 'office' ? 'Lumon Office' : 
                    image.style === 'outie' ? 'Outie World' : 'Break Room'}
                  </p>
                  <p className="text-xs opacity-75">
                    Created on {new Date(image.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-between">
              <button 
                className="flex items-center text-red-600 hover:text-red-800 text-sm"
                onClick={() => handleRemoveImage(image.id)}
              >
                <Trash2 size={16} className="mr-1" />
                Remove
              </button>
              <button 
                className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                onClick={() => handleDownloadImage(image)}
              >
                <Download size={16} className="mr-1" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;