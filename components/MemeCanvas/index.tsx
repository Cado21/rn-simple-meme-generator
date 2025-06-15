import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, TouchableWithoutFeedback, Platform, KeyboardAvoidingView } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import OverlayItem, { Overlay, OverlayAction } from '../OverlayItem';
import * as ImagePicker from 'react-native-image-picker';
import StyleModal from '../StyleModal';

export const MemeCanvas: React.FC<{ imageUri?: string }> = ({ imageUri }) => {
  const [overlays, setOverlays] = useState<Overlay[]>([]);
  const [selectedOverlay, setSelectedOverlay] = useState<Overlay | null>(null);
  const [isStyleModalVisible, setIsStyleModalVisible] = useState<boolean>(false);

  const addTextOverlay = () => {
    const newOverlay: Overlay = {
      id: Date.now().toString(),
      type: 'text',
      content: 'Tap to edit',
      x: 20,
      y: 50,
    };
    setOverlays([...overlays, newOverlay]);
    setSelectedOverlay(newOverlay);
  };

  const updateOverlay = (id: string, updates: Partial<Overlay>, action?: OverlayAction) => {
    if (action === 'delete') {
      setOverlays(overlays.filter(overlay => overlay.id !== id));
      setSelectedOverlay(null);
      return;
    }
    if (action === 'duplicate') {
      const overlayToDuplicate = overlays.find(overlay => overlay.id === id);
      if (overlayToDuplicate) {
        const newOverlay: Overlay = {
          ...overlayToDuplicate,
          id: Date.now().toString(),
          x: updates.x || overlayToDuplicate.x + 20,
          y: updates.y || overlayToDuplicate.y + 20,
        };
        setOverlays([...overlays, newOverlay]);
        setSelectedOverlay(newOverlay);
        return;
      }
    }
    setOverlays(overlays.map(overlay =>
      overlay.id === id ? { ...overlay, ...updates } : overlay
    ));
  };

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translation = useSharedValue({ x: 0, y: 0 });
  const savedTranslation = useSharedValue({ x: 0, y: 0 });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      if (!selectedOverlay) {
        scale.value = savedScale.value * e.scale;
      }
    })
    .onEnd(() => {
      if (!selectedOverlay) {
        savedScale.value = scale.value;
      }
    });

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (!selectedOverlay) {
        translation.value = {
          x: savedTranslation.value.x + e.translationX,
          y: savedTranslation.value.y + e.translationY,
        };
      }

    })
    .onEnd(() => {
      if (!selectedOverlay) {
        savedTranslation.value = translation.value;
      }
    });

  const composed = Gesture.Simultaneous(pinchGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translation.value.x },
      { translateY: translation.value.y },
      { scale: scale.value },
    ],
  }));

  const handleBackgroundPress = () => {
    setOverlays(overlays.filter(overlay => overlay.content.length !== 0));
    setSelectedOverlay(null);
  };

  const addImageOverlay = async () => {
    try {
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (result.assets && result.assets[0]?.uri) {
        const newOverlay: Overlay = {
          id: Date.now().toString(),
          type: 'image',
          content: result.assets[0].uri,
          x: 20,
          y: 50,
        };
        setOverlays([...overlays, newOverlay]);
        setSelectedOverlay(newOverlay);
      }
    } catch (error) {
      console.error('Error adding image overlay:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <GestureDetector gesture={composed}>
        <TouchableWithoutFeedback onPress={handleBackgroundPress}>
          <Animated.View
            style={[styles.canvasContainer, animatedStyle]}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} resizeMode="contain" />
            ) : (
              <View style={styles.blankCanvas} />
            )}
            {overlays.map(overlay => (
              <OverlayItem
                key={overlay.id}
                overlay={overlay}
                isSelected={overlay.id === selectedOverlay?.id}
                onSelect={(id: string) => setSelectedOverlay(overlays.find(o => o.id === id) || null)}
                onUpdate={updateOverlay}
                scale={scale}
              />
            ))}
          </Animated.View>
        </TouchableWithoutFeedback>
      </GestureDetector>
      <View style={styles.footer}>
        {(selectedOverlay !== null) && (
          <TouchableOpacity
            style={styles.btn}
            onPress={() => setIsStyleModalVisible(true)}
          >
            <Text style={styles.buttonText}>Style</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.btn} onPress={addTextOverlay}>
          <Text style={styles.buttonText}>Add Text</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={addImageOverlay}>
          <Text style={styles.buttonText}>Add Image</Text>
        </TouchableOpacity>
      </View>
      <StyleModal
        visible={isStyleModalVisible}
        onClose={() => setIsStyleModalVisible(false)}
        overlay={selectedOverlay}
        onUpdate={updateOverlay}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  blankCanvas: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  canvasContainer: {
    flex: 1,
    padding: 20,
  },
  footer: {
    paddingHorizontal: 12,
    paddingBottom: 50,
    paddingTop: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
