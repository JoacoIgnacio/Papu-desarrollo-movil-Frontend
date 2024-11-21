import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  questionnaireTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  questionnaireDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  noHistoryText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  date: {
    fontSize: 14,
    color: '#FF497C'
  }
});
