import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA', 
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,  
    fontWeight: 'bold',
    color: '#333',  
    marginBottom: 20,  
    textAlign: 'center',  
  },
  button: {
    backgroundColor: '#FF497C',  
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,  
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,  
  },
  buttonText: {
    color: '#FFF',  
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
