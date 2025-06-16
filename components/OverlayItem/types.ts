
export type FontStyleType = 'normal' | 'italic' | 'bold';
export type OverlayAction = 'delete' | 'duplicate';
export interface OverlayBase {
  id: string;
  x: number;
  y: number;
}
export interface TextOverlay extends OverlayBase {
  type: 'text';
  content: string;
  textColor?: string;
  fontSize?: number;
  fontStyle?: FontStyleType;
}

export interface ImageOverlay extends OverlayBase {
  type: 'image';
  content: string;
  opacity?: number;
  width?: number;
  height?: number;
}

export type Overlay = TextOverlay | ImageOverlay;

