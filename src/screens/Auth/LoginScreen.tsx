import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Text, useTheme } from '@rneui/themed';
import { View, Alert } from 'react-native';
import { RootStackParamList } from '../../navigation/rootStackNavigation';
import { styles } from './LoginScreen.styles'; 
import { useState } from 'react';
import axios from 'axios';
import { saveTokens } from '../../services/authStorage';

const LoginScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
  const { theme } = useTheme();
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      console.log('Email:', username);
      console.log('Password:', password);
      
      const response = await axios.post('http://localhost:3000/auth/login', { username, password });
      console.log(response.data);
  
      if (response.data && response.data.accessToken) {
        const { accessToken, refreshToken } = response.data;
        await saveTokens(accessToken, refreshToken);
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Credenciales incorrectas');
      }
    } catch (error) {
      Alert.alert('Error', 'Credenciales incorrectas o error en la conexión.');
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
      <Button title="Ingresar" onPress={handleLogin} buttonStyle={styles.button} />
    </View>
  );
};

export default LoginScreen;
