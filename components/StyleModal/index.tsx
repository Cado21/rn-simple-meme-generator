import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity } from 'react-native';
import { StyleModalProps, FontStyleType } from './types';
import { STYLE_MODAL_CONSTANTS } from '../../helpers/constants';
import Slider from '@react-native-community/slider';
import styles from './styles';
import { ImageOverlay, TextOverlay } from '../OverlayItem/types';

const StyleModal: React.FC<StyleModalProps> = ({
  visible,
  onClose,
  overlay,
  onUpdate,
}) => {
  const [fontSize, setFontSize] = useState<number>((overlay as TextOverlay)?.fontSize || STYLE_MODAL_CONSTANTS.FONT_SIZE.DEFAULT);
  const [opacity, setOpacity] = useState<number>((overlay as ImageOverlay)?.opacity || STYLE_MODAL_CONSTANTS.OPACITY.DEFAULT);

  if (!overlay) {
    return null;
  }

  const handleTextColorChange = (color: string): void => {
    onUpdate(overlay.id, { textColor: color });
  };

  const handleFontStyleChange = (fontStyle: FontStyleType): void => {
    onUpdate(overlay.id, { fontStyle });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {overlay.type === 'text' ? 'Text Style' : 'Image Style'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          {overlay.type === 'text' ? (
            <View style={styles.styleSection}>
              <Text style={styles.label}>Color</Text>
              <View style={styles.colorOptions}>
                {STYLE_MODAL_CONSTANTS.COLORS.map((color) => (
                  <TouchableOpacity
                    key={color.toString()}
                    style={[styles.colorOption, { backgroundColor: color }]}
                    onPress={() => handleTextColorChange(color.toString())}
                  />
                ))}
              </View>

              <Text style={styles.label}>Font Size: {Math.round(fontSize)}px</Text>
              <Slider
                style={styles.slider}
                minimumValue={STYLE_MODAL_CONSTANTS.FONT_SIZE.MIN}
                maximumValue={STYLE_MODAL_CONSTANTS.FONT_SIZE.MAX}
                value={fontSize}
                onValueChange={setFontSize}
                onSlidingComplete={(value) => onUpdate(overlay.id, { fontSize: Math.round(value) })}
              />

              <Text style={styles.label}>Font Style</Text>
              <View style={styles.fontStyleOptions}>
                <TouchableOpacity
                  style={[
                    styles.fontStyleButton,
                    overlay.fontStyle === STYLE_MODAL_CONSTANTS.FONT_STYLES.NORMAL && styles.selectedStyle,
                  ]}
                  onPress={() => handleFontStyleChange(STYLE_MODAL_CONSTANTS.FONT_STYLES.NORMAL)}
                >
                  <Text>Normal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.fontStyleButton,
                    overlay.fontStyle === STYLE_MODAL_CONSTANTS.FONT_STYLES.ITALIC && styles.selectedStyle,
                  ]}
                  onPress={() => handleFontStyleChange(STYLE_MODAL_CONSTANTS.FONT_STYLES.ITALIC)}
                >
                  <Text style={styles.italicFont}>Italic</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.fontStyleButton,
                    overlay.fontStyle === STYLE_MODAL_CONSTANTS.FONT_STYLES.BOLD && styles.selectedStyle,
                  ]}
                  onPress={() => handleFontStyleChange(STYLE_MODAL_CONSTANTS.FONT_STYLES.BOLD)}
                >
                  <Text style={styles.boldFont}>Bold</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.styleSection}>
              <Text style={styles.label}>Opacity: {opacity.toFixed(2)}</Text>
              <Slider
                style={styles.slider}
                minimumValue={STYLE_MODAL_CONSTANTS.OPACITY.MIN}
                maximumValue={STYLE_MODAL_CONSTANTS.OPACITY.MAX}
                step={STYLE_MODAL_CONSTANTS.OPACITY.STEP}
                value={opacity}
                onValueChange={setOpacity}
                onSlidingComplete={(value) => onUpdate(overlay.id, { opacity: value })}
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default StyleModal;
