import React from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Text, useTheme } from '@rneui/themed';
import { View, ActivityIndicator } from 'react-native'; // Importa ActivityIndicator
import { RootStackParamList } from '../../navigation/rootStackNavigation';
import { styles } from './LoginScreen.styles';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { saveToken } from '../../services/authStorage';

const LoginScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
  const { theme } = useTheme();
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (isButtonDisabled) {
      const timer = setTimeout(() => {
        setIsButtonDisabled(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isButtonDisabled]);

  const handleLogin = async () => {
    if (isButtonDisabled) return;
    setIsButtonDisabled(true);
    setErrorMessage('');

    try {
      console.log('Email:', username);
      console.log('Password:', password);
      

      const response = await axios.post('http://192.168.1.90:3000/auth/login', { username, password });
      
      console.log(response.data);

      // Verifica si la respuesta tiene el token de acceso
      if (response.data && response.data.accessToken) {
        const { accessToken, refreshToken } = response.data;
        await saveToken('accessToken', accessToken);
        await saveToken('refreshToken', refreshToken);
        // Aquí se pasa directamente el nombre de usuario desde el estado
        navigation.navigate('Home'); // Pasar el nombre de usuario desde el estado
      } else {
        setErrorMessage('Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      setErrorMessage('Usuario o contraseña incorrectos.');
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

      <Button
        onPress={handleLogin}
        disabled={isButtonDisabled}
        buttonStyle={styles.button}
      >
        {/* Muestra ActivityIndicator si el botón está deshabilitado */}
        {isButtonDisabled ? (
          <ActivityIndicator color="white" />
        ) : (
          'Ingresar'
        )}
      </Button>

      <Button
        title="Regresar a la Pantalla Inicial"
        onPress={() => navigation.navigate('Initial')}
        buttonStyle={{ ...styles.button, backgroundColor: theme.colors.secondary, marginTop: 10 }}
      />
    </View>
  );
};

export default LoginScreen;
