import { ArtImage, ArtStyle, ImportMeta } from '../types';
const API_KEY = (import.meta as unknown as ImportMeta).env.VITE_STABILITY_API_KEY;

console.log(`Stability API ${API_KEY ? 'is configured ✅' : 'is NOT configured ❌'} - ${API_KEY ? 'Will use API for image generation' : 'Will use placeholder images'}`);

// Placeholder images for different styles (fallback if API fails)
const placeholderImages = {
  office: [
    'https://placehold.co/800x600/222/fff?text=Lumon+Office+1',
    'https://placehold.co/800x600/222/fff?text=Lumon+Office+2',
    'https://placehold.co/800x600/222/fff?text=Lumon+Office+3',
  ],
  outie: [
    'https://placehold.co/800x600/444/fff?text=Outie+World+1',
    'https://placehold.co/800x600/444/fff?text=Outie+World+2',
    'https://placehold.co/800x600/444/fff?text=Outie+World+3',
  ],
  characters: [
    'https://placehold.co/800x600/1a3c5b/fff?text=Mark+Scout',
    'https://placehold.co/800x600/1a3c5b/fff?text=Helly+R',
    'https://placehold.co/800x600/1a3c5b/fff?text=Irving',
    'https://placehold.co/800x600/1a3c5b/fff?text=Dylan',
    'https://placehold.co/800x600/1a3c5b/fff?text=Harmony+Cobel',
    'https://placehold.co/800x600/1a3c5b/fff?text=Seth+Milchick',
  ],
};

// Create a fallback function
const fallbackToPlaceholder = (style: ArtStyle): ArtImage => {
  const images = placeholderImages[style];
  const randomIndex = Math.floor(Math.random() * images.length);
  
  return {
    id: Math.random().toString(36).substring(2, 15),
    url: images[randomIndex],
    style,
    createdAt: new Date(),
  };
};

const severancePrompts = {
  office: [
    "Minimalist corporate office with white walls and blue lighting, Lumon Industries aesthetic",
    "Retro computer terminals in a sterile office environment, Severance style",
    "Clean white hallways with clinical lighting and minimal decoration, corporate dystopia"
  ],
  outie: [
    "Suburban landscape with muted colors and isolated perspective, Severance aesthetic",
    "Winter commute to office building with atmospheric isolation, in the style of Severance",
    "Modern apartment with sparse decoration and subtle unease, Severance outie world"
  ],
  characters: [
    "Mark Scout played by Adam Scott, with short dark hair and subtle exhaustion, blue-teal backdrop with white numbers, stylized digital painting similar to Severance art",
    "Helly R played by Britt Lower, with striking red hair and defiant expression, wearing Lumon blue uniform, artistic digital painting with teal and red color scheme",
    "Irving played by John Turturro, older man with gray hair and intense stare, surrounded by black goo imagery, painted in vibrant color blocks with digital art aesthetic",
    "Dylan played by Zach Cherry, stocky man with beard and determined expression, wearing white dress shirt, stylized digital painting with data numbers in background",
    "Harmony Cobel played by Patricia Arquette, stern woman with shoulder-length blonde hair, dual personality as Mrs. Selvig, painted in contrasting blue and warm tones",
    "Seth Milchick played by Tramell Tillman, clean-cut man in suit with unsettling smile, corporate manager aesthetic, digital illustration with clean lines and vibrant colors"
  ]
};

export const generateImage = async (style: ArtStyle): Promise<ArtImage> => {
  // If API key is not available, use placeholders instead
  if (!API_KEY) {
    return fallbackToPlaceholder(style);
  }
  
  const prompts = severancePrompts[style];
  const selectedPrompt = prompts[Math.floor(Math.random() * prompts.length)];
  
  try {
    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        text_prompts: [{ text: selectedPrompt }],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        samples: 1,
        steps: 30,
      }),
    });

    const responseData = await response.json();
    
    // Check if the response contains the expected data
    if (responseData.artifacts && responseData.artifacts.length > 0) {
      const base64Image = responseData.artifacts[0].base64;
      const imageUrl = `data:image/png;base64,${base64Image}`;

      return {
        id: Math.random().toString(36).substring(2, 15),
        url: imageUrl,
        style,
        createdAt: new Date(),
      };
    } else {
      console.error('Invalid API response:', responseData);
      return fallbackToPlaceholder(style);
    }
  } catch (error) {
    console.error('Error generating image:', error);
    return fallbackToPlaceholder(style);
  }
};

// Save images to local storage
const saveToLocalStorage = (images: ArtImage[]): void => {
  localStorage.setItem('savedImages', JSON.stringify(images));
};

// Get saved images from local storage
export const getSavedImages = (): ArtImage[] => {
  const savedImages = localStorage.getItem('savedImages');
  if (savedImages) {
    try {
      return JSON.parse(savedImages);
    } catch (error) {
      console.error('Error parsing saved images:', error);
      return [];
    }
  }
  return [];
};

// Save an image to the collection
export const saveImage = (image: ArtImage): void => {
  const savedImages = getSavedImages();
  if (!savedImages.some(img => img.id === image.id)) {
    const updatedImages = [...savedImages, image];
    saveToLocalStorage(updatedImages);
  }
};

// Remove an image from the collection
export const removeImage = (imageId: string): void => {
  const savedImages = getSavedImages();
  const updatedImages = savedImages.filter(img => img.id !== imageId);
  saveToLocalStorage(updatedImages);
};

// Download an image
export const downloadImage = (image: ArtImage): void => {
  const link = document.createElement('a');
  link.href = image.url;
  link.download = `severance-${image.style}-${image.id}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};