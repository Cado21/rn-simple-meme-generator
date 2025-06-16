import { StyleSheet } from 'react-native';

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

export default styles;