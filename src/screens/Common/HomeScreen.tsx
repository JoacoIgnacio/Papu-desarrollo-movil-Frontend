import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text } from '@rneui/themed';
import { View } from 'react-native';
import { RootStackParamList } from '../../navigation/rootStackNavigation';
import { styles } from './HomeScreen.styles';  // Importar los estilos

const HomeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido, Usuario</Text>
      <Button
        title="Cerrar Sesión"
        onPress={() => navigation.navigate('Login')}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />
    </View>
  );
};

export default HomeScreen;
