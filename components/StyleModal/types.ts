import { STYLE_MODAL_CONSTANTS } from '../../helpers/constants';
import { Overlay } from '../OverlayItem';

export interface StyleModalProps {
  visible: boolean;
  onClose: () => void;
  overlay: Overlay | null;
  onUpdate: (id: string, updates: Partial<Overlay>) => void;
}

export type FontStyleType = typeof STYLE_MODAL_CONSTANTS.FONT_STYLES[keyof typeof STYLE_MODAL_CONSTANTS.FONT_STYLES];