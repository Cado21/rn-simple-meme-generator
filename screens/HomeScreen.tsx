import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const screenWidth = Dimensions.get('window').width;
const ITEM_SPACING = 16;
const ITEM_WIDTH = (screenWidth - ITEM_SPACING * 2 - ITEM_SPACING) / 2; // padding left + right + space between 2 items

const MEME_TEMPLATES = [
  {
    id: '1',
    name: 'Drake',
    url: 'https://i.imgflip.com/30b1gx.jpg',
    thumbnail: 'https://i.imgflip.com/30b1gx.jpg',
  },
  {
    id: '2',
    name: 'Distracted Boyfriend',
    url: 'https://i.imgflip.com/1ur9b0.jpg',
    thumbnail: 'https://i.imgflip.com/1ur9b0.jpg',
  },
  {
    id: '3',
    name: 'Two Buttons',
    url: 'https://i.imgflip.com/1g8my4.jpg',
    thumbnail: 'https://i.imgflip.com/1g8my4.jpg',
  },
  {
    id: '4',
    name: 'Expanding Brain',
    url: 'https://i.imgflip.com/1jwhww.jpg',
    thumbnail: 'https://i.imgflip.com/1jwhww.jpg',
  },
];

export default function HomeScreen({ navigation }: any) {
  const handleTemplateSelect = (templateUrl: string) => {
    navigation.navigate('Editor', { templateUri: templateUrl });
  };

  const handleUploadTemplate = async () => {
    try {
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });

      if (result.assets && result.assets[0]?.uri) {
        handleTemplateSelect(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error uploading template:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meme Generator</Text>
      </View>

      <View style={styles.templateContainer}>
        <Text style={styles.sectionTitle}>Choose Template</Text>

        <ScrollView contentContainerStyle={styles.templateList}>
          <TouchableOpacity
            style={[styles.templateButton, styles.uploadButton]}
            onPress={handleUploadTemplate}
          >
            <Text style={styles.uploadButtonText}>+</Text>
            <Text style={styles.uploadButtonLabel}>Upload</Text>
          </TouchableOpacity>

          {MEME_TEMPLATES.map((template) => (
            <TouchableOpacity
              key={template.id}
              style={styles.templateButton}
              onPress={() => handleTemplateSelect(template.url)}
            >
              <Image
                source={{ uri: template.thumbnail }}
                style={styles.templateThumbnail}
              />
              <Text style={styles.templateName}>{template.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 16,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  templateContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    paddingHorizontal: ITEM_SPACING,
    marginBottom: 16,
  },
  templateList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: ITEM_SPACING,
  },
  templateButton: {
    width: ITEM_WIDTH,
    marginBottom: ITEM_SPACING,
    backgroundColor: '#2D2D2D',
    borderRadius: 8,
    overflow: 'hidden',
  },
  uploadButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButtonText: {
    fontSize: 32,
    color: '#FFFFFF',
  },
  uploadButtonLabel: {
    marginTop: 8,
    fontSize: 14,
    color: '#FFFFFF',
  },
  templateThumbnail: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  templateName: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    padding: 8,
  },
});
