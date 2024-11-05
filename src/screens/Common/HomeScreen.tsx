import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text, useTheme } from '@rneui/themed';
import { View, Animated, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native'; 
import { useEffect, useState, useRef } from 'react';
import { RootStackParamList } from '../../navigation/rootStackNavigation';
import { styles } from './HomeScreen.styles';
import React from 'react-native';
import { getUserId } from '../../services/authStorage';


export const HomeScreen = ({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  // Animación para el menú lateral
  const slideAnim = useRef(new Animated.Value(-300)).current; // Posición inicial fuera de la pantalla
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    const toValue = menuVisible ? -300 : 0; // Alterna entre cerrado y abierto

    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(!menuVisible);
    });
  };

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
      <Text style={styles.welcomeText}>Bienvenido </Text>

      {/* Botón para abrir el menú lateral */}
      <Button
        title="Cuestionarios"
        onPress={toggleMenu}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />

      <Button
        title="Cerrar Sesión"
        onPress={() => navigation.navigate('Login')}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />

      {/* Menú lateral animado */}
      <Animated.View style={[customStyles.sideMenu, { transform: [{ translateX: slideAnim }] }]}>
        <Text style={customStyles.menuText}>Menú Lateral</Text>
        <Button
          title="Conductor"
          onPress={() => navigation.navigate('Driver')}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
          <Button
          title="Equipo"
          onPress={() => navigation.navigate('Equipment')}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
          <Button
          title="Inspeccion"
          onPress={() => navigation.navigate('Inspection')}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
          <Button
          title="Cerrar Cuestionarios"
          onPress={toggleMenu}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
      </Animated.View>

      {/* Fondo oscuro cuando el menú está abierto */}
      {menuVisible && (
        <TouchableOpacity style={customStyles.overlay} onPress={toggleMenu} />
      )}
    </View>
  );
};

const customStyles = StyleSheet.create({
  sideMenu: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#FFF',
    padding: 20,
    zIndex: 1000,
    elevation: 5, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  menuText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});