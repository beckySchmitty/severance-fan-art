# 𝌽 SEVERANCE Fan Art Generator

An immersive web application that generates AI-powered artwork inspired by the dystopian corporate aesthetic of Apple TV+'s critically acclaimed series "Severance." This project leverages cutting-edge web technologies to create unique visual interpretations of the show's distinct environments and compelling characters.

## ✨ Features

- Generate high-quality algorithmic art based on the show's iconic visual language:
  - **Lumon Office Environments** - Sterile corridors and unsettling workspaces
  - **Outie World Scenes** - The muted, disconnected external reality
  - **Character Portraits** - Stylized interpretations of Mark, Helly, Irving, and others
- Curate a personal gallery of saved images
- Download high-resolution artwork for personal use
- Responsive design optimized for all devices
- Stability AI integration for enhanced image generation (API key required)

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom theming
- **Build System**: Vite (for lightning-fast development)
- **API Integration**: Stability AI for image generation
- **State Management**: React Context API
- **Deployment**: GitHub Pages with custom workflows

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- Yarn package manager
- Optional: Stability AI API key for enhanced image generation

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/severance-fan-art.git
cd severance-fan-art
```

2. Install dependencies using Yarn:
```bash
yarn
```

3. Configure environment variables:
```bash
cp .env.example .env
```
Then edit `.env` to add your `VITE_STABILITY_API_KEY` if available.

4. Start the development server:
```bash
yarn dev
```

5. Open your browser and navigate to `http://localhost:5173/severance-fan-art/`

## 📦 Building for Production

Create an optimized production build:

```bash
yarn build
```

Preview the production build locally:

```bash
yarn preview
```

## 🌐 Deployment

This project includes automated deployment to GitHub Pages:

```bash
yarn deploy
```

## 🧩 Project Structure

```
severance-fan-art/
├── src/
│   ├── components/    # Reusable UI components
│   ├── utils/         # Helper functions and services
│   ├── types/         # TypeScript type definitions
│   ├── styles/        # Global styles and Tailwind config
│   └── assets/        # Static assets
├── public/            # Public static files
└── ...configuration files
```

## 🔮 Future Enhancements

- Authentication for cloud-based image storage
- Sharing capabilities to social media
- Additional art styles and themes
- Advanced customization options for generated images

## ⚠️ Disclaimer

This is an unofficial fan project not affiliated with or endorsed by Apple TV+ or the creators of "Severance." All generated artwork is intended for personal use only. The distinct visual style of the show is the intellectual property of its creators.

## 📄 License

MIT