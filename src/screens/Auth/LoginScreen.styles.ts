import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F8F9FA', 
      },
      title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        color: '#333', 
      },
      input: {
        marginBottom: 10,
      },
      button: {
        marginTop: 20,
        backgroundColor: '#FF497C', // Botón rosa fuerte como en la página inicial
      },
      inputContainer: {
        borderBottomColor: '#CCC', // Color para las líneas de los inputs
      },
});