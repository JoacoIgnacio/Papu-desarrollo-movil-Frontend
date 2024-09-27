import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Text, useTheme } from '@rneui/themed';
import { View } from 'react-native';
import { RootStackParamList } from '../../navigation/rootStackNavigation';
import { styles } from './LoginScreen.styles';
import { useState } from 'react';
import axios from 'axios';
import { saveTokens } from '../../services/authStorage';

const LoginScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
  const { theme } = useTheme();
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error

  const handleLogin = async () => {
    setErrorMessage(''); // Reinicia el mensaje de error al intentar iniciar sesión
    try {
      console.log('Email:', username);
      console.log('Password:', password);
      
      const response = await axios.post('http://localhost:3000/auth/login', { username, password });
      console.log(response.data);

      // Verifica si la respuesta tiene el token de acceso
      if (response.data && response.data.accessToken) {
        const { accessToken, refreshToken } = response.data;
        await saveTokens(accessToken, refreshToken);
        // Aquí se pasa directamente el nombre de usuario desde el estado
        navigation.navigate('Home', { username }); // Pasar el nombre de usuario desde el estado
      } else {
        setErrorMessage('Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      setErrorMessage('Usuario o contraseña incorrectos o error en la conexión.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Input
        placeholder="Correo Electrónico"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        value={username}
        onChangeText={setEmail}
      />
      <Input
        placeholder="Contraseña"
        secureTextEntry
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        value={password}
        onChangeText={setPassword}
      />
      
      {/* Muestra el mensaje de error si existe */}
      {errorMessage ? (
        <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</Text>
      ) : null}

      <Button title="Ingresar" onPress={handleLogin} buttonStyle={styles.button} />

      {/* Botón para regresar a la pantalla inicial */}
      <Button 
        title="Regresar a la Pantalla Inicial" 
        onPress={() => navigation.navigate('Initial')} // Cambia 'Initial' por el nombre de tu pantalla inicial
        buttonStyle={{ ...styles.button, backgroundColor: theme.colors.secondary, marginTop: 10 }} // Estilos del botón
      />
    </View>
  );
};

export default LoginScreen;
