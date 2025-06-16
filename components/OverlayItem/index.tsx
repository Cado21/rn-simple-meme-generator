import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, TextStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
  SharedValue,
} from 'react-native-reanimated';
import { Overlay, OverlayAction, TextOverlay } from './types';
import styles from './styles';

interface OverlayItemPropsI {
  overlay: Overlay;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Overlay>, action?: OverlayAction) => void;
  scale: SharedValue<number>;
  canvasLayout: { width: number; height: number };
}

const OverlayItem: React.FC<OverlayItemPropsI> = ({
  overlay,
  isSelected,
  onSelect,
  onUpdate,
  scale,
  canvasLayout,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const translateX = useSharedValue(overlay.x);
  const translateY = useSharedValue(overlay.y);

  const startWidth = useSharedValue(0);
  const startHeight = useSharedValue(0);

  const handleTextChange = (newText: string) => {
    onUpdate(overlay.id, { content: newText });
  };

  const getTextOverlayStyle = (textOverlay: TextOverlay): TextStyle => ({
    color: textOverlay.textColor || '#000000',
    fontSize: textOverlay.fontSize || 20,
    fontStyle: textOverlay.fontStyle !== 'bold' ? textOverlay.fontStyle : 'normal',
    fontWeight: textOverlay.fontStyle === 'bold' ? 'bold' : 'normal',
  });

  const panGesture = Gesture.Pan()
    .enabled(isSelected)
    .onStart(() => {
      translateX.value = overlay.x;
      translateY.value = overlay.y;
    })
    .onUpdate((event) => {
      // Get parent container dimensions from layout
      const containerWidth = canvasLayout.width - (overlay.type === 'image' ? (overlay.width || 150) : 0);
      const containerHeight = canvasLayout.height - (overlay.type === 'image' ? (overlay.height || 150) : 0);

      // Calculate new position with boundaries
      const newX = Math.min(Math.max(0, overlay.x + event.translationX / scale.value), containerWidth);
      const newY = Math.min(Math.max(0, overlay.y + event.translationY / scale.value), containerHeight);

      translateX.value = newX;
      translateY.value = newY;
    })
    .onEnd(() => {
      runOnJS(onUpdate)(overlay.id, {
        x: translateX.value,
        y: translateY.value,
      });
    });
  const resizeGesture = Gesture.Pan()
    .enabled(isSelected && overlay.type === 'image')
    .onStart(() => {
      if (overlay.type === 'image') {
        startWidth.value = overlay.width || 150;
        startHeight.value = overlay.height || 150;
      }
    })
    .onUpdate((event) => {
      if (overlay.type === 'image') {
        const currentWidth = startWidth.value;
        const currentHeight = startHeight.value;
        const aspectRatio = currentWidth / currentHeight;

        // Calculate available space
        const maxWidth = canvasLayout.width - overlay.x;
        const maxHeight = canvasLayout.height - overlay.y;

        // Calculate new dimensions while maintaining aspect ratio
        let newWidth = currentWidth + event.translationX / scale.value;
        let newHeight = newWidth / aspectRatio;

        // Ensure dimensions stay within bounds
        if (newWidth > maxWidth) {
          newWidth = maxWidth;
          newHeight = newWidth / aspectRatio;
        }
        if (newHeight > maxHeight) {
          newHeight = maxHeight;
          newWidth = newHeight * aspectRatio;
        }

        // Enforce minimum size while maintaining aspect ratio
        const minSize = 50;
        if (newWidth < minSize) {
          newWidth = minSize;
          newHeight = newWidth / aspectRatio;
        }
        if (newHeight < minSize) {
          newHeight = minSize;
          newWidth = newHeight * aspectRatio;
        }

        runOnJS(onUpdate)(overlay.id, {
          width: newWidth,
          height: newHeight,
        });
      }
    });

  const composed = Gesture.Simultaneous(panGesture);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    position: 'absolute',
  }));
  useEffect(() => {
    if (!isSelected) {
      setIsEditing(false);
    }
  }, [isSelected]);
  return (
    <GestureDetector gesture={composed}>
      <Animated.View style={[styles.overlayContainer, animatedStyle]}>
        <TouchableOpacity
          onPress={() => {
            onSelect(overlay.id);
            if (isSelected && overlay.type === 'text') {
              setIsEditing(true);
            }
          }}
          style={[styles.itemContainer, isSelected && styles.selected]}
          activeOpacity={0.8}
        >
          <View style={styles.contentWrapper}>
            {overlay.type === 'text' ? (
              isEditing ? (
                <TextInput
                  value={overlay.content}
                  onChangeText={handleTextChange}
                  onBlur={() => setIsEditing(false)}
                  style={[styles.textInput, getTextOverlayStyle(overlay)]}
                  autoFocus
                  multiline
                />
              ) : (
                <Text style={[getTextOverlayStyle(overlay)]}>{overlay.content}</Text>
              )
            ) : (
              <>
                <Image
                  source={{ uri: overlay.content }}
                  style={[styles.image, {
                    opacity: overlay.opacity || 1,
                    width: overlay.width || 150,
                    height: overlay.height || 150,
                  }]}
                />
                {isSelected && (
                  <GestureDetector gesture={resizeGesture}>
                    <View style={[styles.resizeHandle, styles.bottomRightHandle]} />
                  </GestureDetector>
                )}
              </>
            )}
          </View>
        </TouchableOpacity>

        {isSelected && (
          <View style={styles.buttonContainer} pointerEvents="box-none">
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.iconBtn, styles.duplicateBtn]}
              onPress={() => {
                onUpdate(
                  overlay.id,
                  {
                    x: translateX.value + 20,
                    y: translateY.value + 20,
                  },
                  'duplicate'
                );
              }}
            >
              <Text style={styles.iconText}>📋</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.iconBtn, styles.deleteBtn]}
              onPress={() => {
                onUpdate(overlay.id, {}, 'delete');
              }}
            >
              <Text style={styles.iconText}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </GestureDetector>
  );
};

export default OverlayItem;
