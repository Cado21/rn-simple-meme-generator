import { StyleSheet } from 'react-native';

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
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  resizeHandle: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
  },
  topLeftHandle: {
    top: -10,
    left: -10,
  },
  topRightHandle: {
    top: -10,
    right: -10,
  },
  bottomLeftHandle: {
    bottom: -10,
    left: -10,
  },
  bottomRightHandle: {
    bottom: -10,
    right: -10,
  },
});

export default styles;
