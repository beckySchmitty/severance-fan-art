// In your imageService.ts file
import { ArtImage, ArtStyle } from '../types';

const API_KEY = 'your-stability-ai-key'; // Store securely

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
  breakroom: [
    'https://placehold.co/800x600/111/fff?text=Break+Room+1',
    'https://placehold.co/800x600/111/fff?text=Break+Room+2',
    'https://placehold.co/800x600/111/fff?text=Break+Room+3',
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
  breakroom: [
    "Oppressive windowless room with single chair and desk, Severance break room",
    "Minimalist interrogation room with stark lighting and psychological horror elements",
    "Isolated figure in an empty white room with harsh overhead lighting, corporate punishment"
  ]
};

export const generateImage = async (style: ArtStyle): Promise<ArtImage> => {
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