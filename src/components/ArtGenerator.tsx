import React, { useState, useEffect } from 'react';
import { Camera, Heart, Download, RefreshCw } from 'lucide-react';
import { ArtImage, ArtStyle } from '../types';
import { generateImage, saveImage, downloadImage, getSavedImages } from '../utils/imageService';

const ArtGenerator: React.FC = () => {
  const [artStyle, setArtStyle] = useState<ArtStyle>('office');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<ArtImage | null>(null);
  const [savedImages, setSavedImages] = useState<ArtImage[]>([]);

  useEffect(() => {
    // Load saved images when component mounts
    setSavedImages(getSavedImages());
    
    // Generate an initial image
    handleGenerateImage();
  }, []);

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    
    try {
      const newImage = await generateImage(artStyle);
      setCurrentImage(newImage);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveImage = () => {
    if (currentImage) {
      saveImage(currentImage);
      setSavedImages(getSavedImages());
    }
  };

  const handleDownloadImage = () => {
    if (currentImage) {
      downloadImage(currentImage);
    }
  };

  return (
    <main className="flex-grow flex flex-col md:flex-row p-4 max-w-6xl mx-auto w-full">
      {/* Left Side - Controls */}
      <div className="w-full md:w-1/3 p-4">
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-medium mb-4">Generate Art</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Art Style</label>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  className={`py-2 px-3 text-sm rounded-md border ${artStyle === 'office' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-200 text-gray-700'}`}
                  onClick={() => setArtStyle('office')}
                >
                  Lumon Office
                </button>
                <button 
                  className={`py-2 px-3 text-sm rounded-md border ${artStyle === 'outie' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-200 text-gray-700'}`}
                  onClick={() => setArtStyle('outie')}
                >
                  Outie World
                </button>
                <button 
                  className={`py-2 px-3 text-sm rounded-md border ${artStyle === 'breakroom' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'border-gray-200 text-gray-700'}`}
                  onClick={() => setArtStyle('breakroom')}
                >
                  Break Room
                </button>
              </div>
            </div>

            <button 
              className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-md flex items-center justify-center"
              onClick={handleGenerateImage}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <RefreshCw size={18} className="animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Camera size={18} className="mr-2" />
                  Generate New Art
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-medium mb-4">Saved Art</h2>
          {savedImages.length === 0 ? (
            <p className="text-gray-500 text-sm">No saved images yet. Generate and save some art!</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {savedImages.slice(0, 4).map((image) => (
                <div key={image.id} className="aspect-square bg-gray-200 rounded-md overflow-hidden">
                  <img src={image.url} alt="Saved Severance art" className="w-full h-full object-cover" />
                </div>
              ))}
              {savedImages.length > 4 && (
                <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center">
                  <span className="text-gray-600">+{savedImages.length - 4} more</span>
                </div>
              )}
            </div>
          )}
          {savedImages.length > 0 && (
            <button className="mt-4 w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-md flex items-center justify-center">
              View All Saved Art
            </button>
          )}
        </div>
      </div>

      {/* Right Side - Generated Image */}
      <div className="w-full md:w-2/3 p-4">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
          {isGenerating ? (
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
                <p className="text-gray-500 text-sm tracking-wider">PLEASE WAIT WHILE REFINEMENT OCCURS</p>
              </div>
            </div>
          ) : currentImage ? (
            <div className="relative">
              <img 
                src={currentImage.url} 
                alt="Generated Severance fan art" 
                className="w-full aspect-video object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="text-white">
                  <p className="text-sm uppercase tracking-wider mb-1">
                    Severance • {currentImage.style === 'office' ? 'Lumon Office' : 
                               currentImage.style === 'outie' ? 'Outie World' : 'Break Room'}
                  </p>
                  <p className="text-xs opacity-75">
                    Generated on {new Date(currentImage.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">No image generated yet</p>
            </div>
          )}

          {/* Action buttons */}
          {currentImage && (
            <div className="flex justify-between p-4 border-t border-gray-200">
              <button 
                className="flex items-center justify-center text-gray-700 hover:text-red-600 transition-colors"
                onClick={handleSaveImage}
              >
                <Heart size={20} className="mr-2" />
                Save
              </button>
              <button 
                className="flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors"
                onClick={handleGenerateImage}
              >
                <RefreshCw size={20} className="mr-2" />
                Regenerate
              </button>
              <button 
                className="flex items-center justify-center text-gray-700 hover:text-blue-600 transition-colors"
                onClick={handleDownloadImage}
              >
                <Download size={20} className="mr-2" />
                Download
              </button>
            </div>
          )}
        </div>

        {/* Instructions/Info Card */}
        <div className="mt-6 bg-gray-50 border border-gray-200 p-4 rounded-lg">
          <h3 className="font-medium mb-2">About This Generator</h3>
          <p className="text-sm text-gray-600">
            This fan art generator creates images inspired by the Apple TV+ show "Severance". 
            Select a style, generate an image, and save your favorites. 
            All art is AI-generated and for personal use only.
          </p>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-500 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              <span>Reminder: The work is important and mysterious.</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ArtGenerator;