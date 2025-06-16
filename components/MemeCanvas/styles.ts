import { StyleSheet } from 'react-native';

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

export default styles;
