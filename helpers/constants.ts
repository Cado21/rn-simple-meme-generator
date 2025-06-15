import { ColorValue } from 'react-native';

export const ROUTES = {
  HOME: 'Home',
  EDITOR: 'Editor',
} as const;


export const STYLE_MODAL_CONSTANTS = {
  FONT_SIZE: {
    MIN: 10,
    MAX: 50,
    DEFAULT: 20,
  },
  OPACITY: {
    MIN: 0,
    MAX: 1,
    STEP: 0.01,
    DEFAULT: 1,
  },
  COLORS: [
    '#000000',
    '#FFFFFF',
    '#FF0000',
    '#00FF00',
    '#0000FF',
  ] as ColorValue[],
  FONT_STYLES: {
    NORMAL: 'normal',
    ITALIC: 'italic',
    BOLD: 'bold',
  } as const,
} as const;
