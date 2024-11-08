import React, { useState, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Text, useTheme } from '@rneui/themed';
import { View, ActivityIndicator } from 'react-native';
import { RootStackParamList } from '../../navigation/rootStackNavigation';
import { styles } from './LoginScreen.styles';
import axios from 'axios';
import { saveToken } from '../../services/authStorage';

const LoginScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
  const { theme } = useTheme();
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    if (isButtonDisabled) {
      const timer = setTimeout(() => {
        setIsButtonDisabled(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isButtonDisabled]);

  const handleLogin = async () => {
    setLoading(true); // Start loading indicator
    setErrorMessage('');

    try {
      console.log('Email:', username);
      console.log('Password:', password);

      const response = await axios.post('http://192.168.0.9:3000/auth/login', { username, password });

      if (response.data && response.data.accessToken) {
        const { accessToken, refreshToken } = response.data;
        await saveToken('accessToken', accessToken);
        await saveToken('refreshToken', refreshToken);
        navigation.navigate('Home');
      } else {
        setErrorMessage('Usuario o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage('Error al renovar el token. Asegúrate de que la API esté disponible.');
    } finally {
      setLoading(false); // Stop loading indicator
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
      {errorMessage ? (
        <Text style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</Text>
      ) : null}

      <Button
        onPress={handleLogin}
        disabled={isButtonDisabled || loading} // Disable button while loading
        buttonStyle={styles.button}
      >
        {loading ? ( // Show loading indicator instead of text while loading
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
