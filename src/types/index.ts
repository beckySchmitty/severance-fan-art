export interface ArtImage {
    id: string;
    url: string;
    style: ArtStyle;
    createdAt: Date;
  }
  
  export type ArtStyle = 'office' | 'outie' | 'breakroom';