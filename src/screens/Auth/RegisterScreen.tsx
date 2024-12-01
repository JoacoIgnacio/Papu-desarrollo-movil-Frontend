import React, { useState, useEffect } from 'react';
import { View, TextInput,Button, StyleSheet,Alert } from 'react-native';
import {  Input, Text, useTheme } from '@rneui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import { RootStackParamList } from '../../navigation/rootStackNavigation';
import { styles } from '../Auth/LoginScreen.styles'; // Importa los estilos del login

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const { theme } = useTheme();
    const [username, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [retryPassword, setRetryPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false); // Add loading state

  const handleRegister = async () => {
 // Validar campos vacíos
 if (!username || !password || !retryPassword) {
    Alert.alert('Error', 'Todos los campos son obligatorios.');
    return;
  }

  // Validar coincidencia de contraseñas
  if (password !== retryPassword) {
    Alert.alert('Error', 'Las contraseñas no coinciden.');
    return;
  }

  // Desactivar el botón y mostrar el estado de carga
  setIsButtonDisabled(true);
  setLoading(true);

  try {
    // Llamada al endpoint de registro
    const response = await axios.post(`http://${process.env.IP}:3000/user`, {
      username,
      password,
    });

    // Validar la respuesta del servidor
    if (response.status === 201) {
      Alert.alert('Éxito', 'Usuario registrado correctamente.');
      navigation.navigate('Login');
    } else {
      Alert.alert('Error', 'No se pudo completar el registro.');
    }
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Hubo un problema al intentar registrarse.');
  } finally {
    // Rehabilitar el botón y ocultar el estado de carga
    setIsButtonDisabled(false);
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <Input
        style={[styles.input, styles.inputContainer]}
        placeholder="Correo Electrónico"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        keyboardType="email-address"
        value={username}
        onChangeText={setEmail}
      />
      <Input
        style={[styles.input, styles.inputContainer]}
        placeholder="Contraseña"
        secureTextEntry
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        value={password}
        onChangeText={setPassword}
      />
      <Input
        style={[styles.input, styles.inputContainer]}
        placeholder="Confirmar Contraseña"
        secureTextEntry
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        value={retryPassword}
        onChangeText={setRetryPassword}
      />
      <View style={styles.button}>
        <Button 
        title="Registrarse" 
        color="#FFF" 
        onPress={handleRegister} 
        />
      </View>
      <View style={{ ...styles.button, backgroundColor: theme.colors.secondary, marginTop:10}}>
        <Button
          title="Volver al inicio de sesión"
          color="#FFF"
          onPress={() => navigation.navigate('Login')}
        />
      </View>
    </View>
  );
};

export default RegisterScreen;