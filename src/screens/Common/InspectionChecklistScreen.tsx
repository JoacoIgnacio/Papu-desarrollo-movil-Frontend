import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Button, Image, Alert,StyleSheet } from 'react-native';
import { RootStackParamList } from '../../navigation/rootStackNavigation';
import * as ImagePicker from 'expo-image-picker';
import * as LocalAuthentication from 'expo-local-authentication';
import { styles } from './InspectionChecklistScreen.styles';
import { getUserId } from '../../services/authStorage';
import axios from 'axios';
import { config } from 'dotenv';

// Definir la interfaz con firma de índice global
interface FormData {
  [key: string]: string | { [key: string]: string } | string[];  // Corregido para permitir string[] en el índice
  nombre: string;
  patente: string;
  kilometraje: string;
  permisos: string;
  seguro: string;
  revision: string;
  licencia: string;
  curso: string;
  kitDerrame: string;
  pala: string;
  materialAbsorbente: string;
  cubeta: string;
  escoba: string;
  bolsas: string;
  kitInvierno: string;
  cadenas: string;
  mantas: string;
  herramientas: string;
  kitEmergencia: string;
  triangulo: string;
  gata: string;
  neumatico: string;
  llaves: string;
  barraLlave: string;
  conos: string;
  extintor: string;
  chaleco: string;
  antifaz: string;
  mantasSueño: string;
  extintorPQS1: string;
  extintorPQS2: string;
  portaExtintor: string;
  botiquin: string;
  cuñas: string;
  portaCunas: string;
  baliza: string;
  pertiga: string;
  alarmaRetroceso: string;
  sistemaLuces: string;
  parabrisas: string;
  plumillas: string;
  neumaticoRepuesto: string;
  cinturonSeguridad: string;
  apoyacabeza: string;
  neumaticos: string;
  linterna: string;
  cintaReflectante: string;
  imagenCorporativa: string;
  interiorCamion: string;
  plataformaEstructura: string;
  sistemaHidraulico: string;
  plataformaOperativa: string;
  observaciones: { [key: string]: string };  // Aquí definimos el tipo correcto para 'observaciones'
  archivos: string[];  // Aseguramos que los archivos son un array de strings
}

export const InspectionForm = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Inspection'>) => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    patente: '',
    kilometraje: '',
    permisos: '',
    seguro: '',
    revision: '',
    licencia: '',
    curso: '',
    kitDerrame: '',
    pala: '',
    materialAbsorbente: '',
    cubeta: '',
    escoba: '',
    bolsas: '',
    kitInvierno: '',
    cadenas: '',
    mantas: '',
    herramientas: '',
    kitEmergencia: '',
    triangulo: '',
    gata: '',
    neumatico: '',
    llaves: '',
    barraLlave: '',
    conos: '',
    extintor: '',
    chaleco: '',
    antifaz: '',
    mantasSueño: '',
    extintorPQS1: '',
    extintorPQS2: '',
    portaExtintor: '',
    botiquin: '',
    cuñas: '',
    portaCunas: '',
    baliza: '',
    pertiga: '',
    alarmaRetroceso: '',
    sistemaLuces: '',
    parabrisas: '',
    plumillas: '',
    neumaticoRepuesto: '',
    cinturonSeguridad: '',
    apoyacabeza: '',
    neumaticos: '',
    linterna: '',
    cintaReflectante: '',
    imagenCorporativa: '',
    interiorCamion: '',
    plataformaEstructura: '',
    sistemaHidraulico: '',
    plataformaOperativa: '',
    observaciones: {},
    archivos: [],  // Inicializamos como un arreglo vacío de cadenas
  });

  // Solicitar permisos de la cámara
  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    return status === 'granted';
  };

  // Solicitar permisos para acceder a la galería
  const requestMediaLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return status === 'granted';
  };

  // Seleccionar fotos desde la galería
  const handleSelectImages = async () => {
    const hasPermission = await requestMediaLibraryPermissions();
    if (!hasPermission) {
      alert('Se requiere permiso para acceder a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const newImages = result.assets.map(asset => asset.uri); // Extraemos los URIs de las imágenes seleccionadas
      setFormData({ ...formData, archivos: [...formData.archivos, ...newImages] }); // Agregar nuevas imágenes al arreglo
    }
  };

  // Tomar fotos con la cámara
  const handleTakePhotos = async () => {
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) {
      alert('Se requiere permiso para usar la cámara');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets) {
      const newImages = result.assets.map(asset => asset.uri); // Extraemos los URIs de las imágenes tomadas
      setFormData({ ...formData, archivos: [...formData.archivos, ...newImages] }); // Agregar nuevas imágenes al arreglo
    }
  };

  // Eliminar una imagen seleccionada o tomada
  const handleRemoveImage = (uri: string) => {
    const filteredImages = formData.archivos.filter(image => image !== uri);
    setFormData({ ...formData, archivos: filteredImages });
  };

  const handleInputChange = (name: string, value: string) => {
    if (name.includes('observaciones')) {
      const key = name.split('_')[1];
      setFormData({
        ...formData,
        observaciones: { ...formData.observaciones, [key]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Autenticación biométrica
  const handleBiometricAuth = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert('Error', 'La autenticación biométrica no está disponible en este dispositivo');
      return false;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert('Error', 'No hay datos biométricos registrados en este dispositivo');
      return false;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Confirma tu identidad para enviar el formulario',
    });

    return result.success;
  };

  const handleSubmit = async () => {
    const isAuthenticated = await handleBiometricAuth();
    if (isAuthenticated){
      const userId = await getUserId('userId');
    try {
      const name = await axios.post(`http://${process.env.IP}:3001/answers`,
        {
          questionnaireId: "6736e5322861c9b6a29d4925",
          questionId: "6736d70b8a664768001bb594",
          userId: userId,
          response: formData.nombre,
        });
      const patente = await axios.post(`http://${process.env.IP}:3001/answers`,
        {
          questionnaireId: "6736e5322861c9b6a29d4925",
          questionId: "6736d7158a664768001bb598",
          userId: userId,
          response: formData.patente,
        });
      const kilometraje = await axios.post(`http://${process.env.IP}:3001/answers`,
        {
          questionnaireId: "6736e5322861c9b6a29d4925",
          questionId: "6736dfa98a664768001bb5c8",
          userId: userId,
          response: formData.kilometraje,
        });
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
    } else {
      Alert.alert('Error', 'La autenticación falló, no se puede enviar el formulario');
    }
    
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Check List "Mensual Equipos” Comercializadora Ltda.</Text>

      {/* Tarjeta 1: Nombre */}
      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={formData.nombre}
          onChangeText={(text) => handleInputChange('nombre', text)}
        />
      </View>

      {/* Tarjeta 2: Patente */}
      <View style={styles.card}>
        <Text style={styles.label}>Patente</Text>
        <TextInput
          style={styles.input}
          placeholder="Patente del vehículo"
          value={formData.patente}
          onChangeText={(text) => handleInputChange('patente', text)}
        />
      </View>

      {/* Tarjeta 3: Kilometraje */}
      <View style={styles.card}>
        <Text style={styles.label}>Kilometraje</Text>
        <TextInput
          style={styles.input}
          placeholder="Kilometraje del vehículo"
          value={formData.kilometraje}
          onChangeText={(text) => handleInputChange('kilometraje', text)}
        />
      </View>

      {/* Sección para adjuntar fotos */}
      <Text style={styles.sectionTitle}>Adjuntar archivo (opcional)</Text>
      <View style={styles.card}>
        <Text style={styles.label}>¿Adjuntar fotos?</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={styles.checkboxButton}
            onPress={handleSelectImages}
          >
            <Text style={styles.checkboxText}>Seleccionar fotos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.checkboxButton}
            onPress={handleTakePhotos}
          >
            <Text style={styles.checkboxText}>Tomar fotos</Text>
          </TouchableOpacity>
        </View>

        {/* Mostrar las imágenes seleccionadas o tomadas */}
        {formData.archivos.length > 0 && (
          <View>
            {formData.archivos.map((uri, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Image source={{ uri }} style={{ width: 100, height: 100 }} />
                <Button title="Eliminar Foto" onPress={() => handleRemoveImage(uri)} />
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Botón Enviar */}
      <Button
        title="Enviar"
        onPress={() => {
          handleSubmit();
          navigation.navigate('Home');
        }}
      />
    </ScrollView>
  );
};

export default InspectionForm;
