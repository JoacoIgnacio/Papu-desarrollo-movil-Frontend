import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Input, Text, useTheme } from '@rneui/themed';
import { View, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../navigation/rootStackNavigation';
import { styles } from './LoginScreen.styles'; 

const LoginScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
  const { theme } = useTheme();


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Input
        placeholder="Correo Electrónico"
        leftIcon={{ type: 'font-awesome', name: 'envelope' }}
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Contraseña"
        secureTextEntry
        leftIcon={{ type: 'font-awesome', name: 'lock' }}
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
      />
      <Button title="Ingresar" onPress={() => navigation.navigate('Home')} buttonStyle={styles.button} />
    </View>
  );
};

export default LoginScreen;
