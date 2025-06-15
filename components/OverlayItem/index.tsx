import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, TextStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  SharedValue,
  runOnJS,
} from 'react-native-reanimated';

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
}

export type Overlay = TextOverlay | ImageOverlay;


interface OverlayItemPropsI {
  overlay: Overlay;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Overlay>, action?: OverlayAction) => void;
  scale: SharedValue<number>;
}

const OverlayItem: React.FC<OverlayItemPropsI> = ({
  overlay,
  isSelected,
  onSelect,
  onUpdate,
  scale,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const translateX = useSharedValue(overlay.x);
  const translateY = useSharedValue(overlay.y);

  const panGesture = Gesture.Pan()
    .enabled(isSelected)
    .onStart(() => {
    })
    .onUpdate((event) => {
      translateX.value = overlay.x + event.translationX / scale.value;
      translateY.value = overlay.y + event.translationY / scale.value;
    })
    .onEnd(() => {
      runOnJS(onUpdate)(overlay.id, {
        x: translateX.value,
        y: translateY.value,
      });
    });

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

  const handleTextChange = (newText: string) => {
    onUpdate(overlay.id, { content: newText });
  };

  const getTextOverlayStyle = (textOverlay: TextOverlay): TextStyle => ({
    color: textOverlay.textColor || '#000000',
    fontSize: textOverlay.fontSize || 20,
    fontStyle: textOverlay.fontStyle !== 'bold' ? textOverlay.fontStyle : 'normal',
    fontWeight: textOverlay.fontStyle === 'bold' ? 'bold' : 'normal',
  });

  return (

    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.overlayContainer, animatedStyle]}>
        <TouchableOpacity
          onPress={() => {
            onSelect(overlay.id);
            if (isSelected) {
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
              <Image
                source={{ uri: overlay.content }}
                style={[styles.image, {
                  opacity: overlay.opacity || 1,
                }]}
              />
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

// Add to styles
const styles = StyleSheet.create({
  overlayContainer: {
    position: 'relative',
  },
  itemContainer: {
    minWidth: 100,
    minHeight: 50,
  },
  contentWrapper: {
    flexShrink: 1,
    flexGrow: 1,
  },
  textInput: {
    fontSize: 20,
    padding: 10,
    borderRadius: 5,
    minWidth: 100,
    flexWrap: 'wrap',
  },
  selected: {
    borderWidth: 1,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: -30,
    right: 0,
    gap: 8,
  },
  iconBtn: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteBtn: {
    backgroundColor: '#ff4444',
  },
  duplicateBtn: {
    backgroundColor: '#4CAF50',
  },
  iconText: {
    fontSize: 14,
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  }
});

export default OverlayItem;
