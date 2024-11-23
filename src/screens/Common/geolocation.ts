import * as Location from 'expo-location';
import { Alert } from 'react-native';

export const getCurrentLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert('Error', 'Debes otorgar permisos de ubicación para continuar.');
    return { success: false, coords: null };
  }

  const location = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.High,
  });

  if (!location || !location.coords) {
    Alert.alert('Error', 'No se pudo obtener la ubicación.');
    return { success: false, coords: null };
  }

  return { success: true, coords: location.coords };
};
