export interface ArtImage {
    id: string;
    url: string;
    style: ArtStyle;
    createdAt: Date;
  }

  export interface ImportMeta {
    env: {
    VITE_STABILITY_API_KEY: string;
    };
  }
  
  export type ArtStyle = 'office' | 'outie' | 'characters';