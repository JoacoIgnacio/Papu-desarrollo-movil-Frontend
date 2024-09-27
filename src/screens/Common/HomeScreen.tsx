import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, useTheme } from '@rneui/themed';
import { View, Animated, ActivityIndicator } from 'react-native'; 
import { useEffect, useState } from 'react';
import { RootStackParamList } from '../../navigation/rootStackNavigation';
import { styles } from './HomeScreen.styles';


type HomeScreenRouteParams = {
  username: string;
};

export const HomeScreen = ({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  const { username } = route.params as HomeScreenRouteParams; // Recuperar el nombre de usuario desde los parámetros
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Construyendo Menú...</Text>
      </View>
    );
  }

  // Mostrar el nombre del usuario en el texto de bienvenida
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido {username}</Text>
      <Button
        title="Cerrar Sesión"
        onPress={() => navigation.navigate('Login')}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />
    </View>
  );
};
