import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import MemeCanvas from '../../components/MemeCanvas';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import styles from './styles';

type EditorScreenProps = NativeStackScreenProps<RootStackParamList, 'Editor'>;

const EditorScreen = ({ route, navigation }: EditorScreenProps) => {
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
};

export default EditorScreen;
