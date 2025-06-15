import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StyleModalProps, FontStyleType } from './types';
import { STYLE_MODAL_CONSTANTS } from '../../helpers/constants';
import Slider from '@react-native-community/slider';
import { ImageOverlay, TextOverlay } from '../OverlayItem';

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
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 24,
  },
  styleSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  colorOptions: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  slider: {
    width: '100%',
    height: 40,
    marginBottom: 20,
  },
  fontStyleOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  fontStyleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  selectedStyle: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  italicFont : {
    fontStyle: 'italic',
  },
  boldFont: {
    fontWeight: 'bold',
  },
});

export default StyleModal;
