import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, useTheme } from '@rneui/themed';
import { View, Animated, ActivityIndicator } from 'react-native'; 
import { useEffect, useState } from 'react';
import { RootStackParamList } from '../../navigation/rootStackNavigation';
import { styles } from './HomeScreen.styles';


const HomeScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  //Parametros para la pantalla de carga
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  //Accion de la carga como tal
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Construyendo Menú...</Text>
      </View>
    );
  }

  // El contenido principal cuando la carga termina
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido, [Usuario]</Text>
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