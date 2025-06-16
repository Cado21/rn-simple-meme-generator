import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MemeCanvas } from '../../components/MemeCanvas';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type EditorScreenProps = NativeStackScreenProps<RootStackParamList, 'Editor'>;

export default function EditorScreen({ route, navigation }: EditorScreenProps) {
  const { templateUri } = route.params || { templateUri: '' };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>◀️</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.canvasContainer}>
        <MemeCanvas imageUri={templateUri} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgrey',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1E1E1E',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  canvasContainer: {
    flex: 1,
    overflow: 'hidden',
  },
});
