import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Button, Image, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../navigation/rootStackNavigation';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './DriverChecklistScreen.styles';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { getUserId } from '../../services/authStorage';
import axios from 'axios';

export const DriverForm = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Driver'>) => {
  const [formData, setFormData] = useState({
    nombre: '',
    fecha: '',
    patente: '',
    horasSueño: '',
    medicamento: '',
    salud: '',
    cansancio: '',
    actividadFisica: '',
    proteccionPersonal: '',
    ropaCorporativa: '',
    checkListEquipos: '',
    conexionRCO: '',
    presentacionPersonal: '',
    observaciones: {
      horasSueño: '',
      medicamento: '',
      salud: '',
      cansancio: '',
      actividadFisica: '',
      proteccion: '',
      ropa: '',
      checkListEquipos: '',
      rco: '',
      presentacionPersonal: ''
    },
    archivos: [] as string[],  // Modificado para almacenar un arreglo de imágenes
  });

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

  const handleSubmit = async () => {
    const userId = await getUserId('userId');
    console.log('User ID:', userId);
    try {
      const name = await axios.post('http://192.168.1.88:3001/answers',
        {
          questionnaireId: "6736bffaa13eade062a1d230",
          questionId: "6736d70b8a664768001bb594",
          userId: userId,
          response: formData.nombre,
        });

      const date = await axios.post('http://192.168.1.88:3001/answers',
        {
          questionnaireId: "6736bffaa13eade062a1d230",
          questionId: "6736d7118a664768001bb596",
          userId: userId,
          response: formData.fecha,
        });
      const patente = await axios.post('http://192.168.1.88:3001/answers',
        {
          questionnaireId: "6736bffaa13eade062a1d230",
          questionId: "6736d7158a664768001bb598",
          userId: userId,
          response: formData.patente,
        });
      const horasSueño = await axios.post('http://192.168.1.88:3001/answers',
        {
          questionnaireId: "6736bffaa13eade062a1d230",
          questionId: "6736c01ea13eade062a1d232",
          userId: userId,
          response: formData.horasSueño,
          observations : formData.observaciones.horasSueño,
        });

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    };
  }
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Check List "Conductores” Comercializadora Ltda.</Text>

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

      {/* Tarjeta 2: Fecha */}
      <View style={styles.card}>
        <Text style={styles.label}>Fecha</Text>
        <TextInput
          style={styles.input}
          placeholder="Fecha (YYYY-MM-DD)"
          value={formData.fecha}
          onChangeText={(text) => handleInputChange('fecha', text)}
        />
      </View>

      {/* Tarjeta 3: Patente */}
      <View style={styles.card}>
        <Text style={styles.label}>Patente</Text>
        <TextInput
          style={styles.input}
          placeholder="Patente del vehículo"
          value={formData.patente}
          onChangeText={(text) => handleInputChange('patente', text)}
        />
      </View>

      {/* Tarjeta 4: Fatiga y Somnolencia */}
      <Text style={styles.sectionTitle}>Fatiga y Somnolencia</Text>
      <View style={styles.card}>
        <Text style={styles.label}>¿Ha dormido menos de 6 hrs en las últimas 24 hrs?</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.horasSueño === 'si' && styles.checkboxSelected]}
            onPress={() => handleInputChange('horasSueño', 'si')}
          >
            <Text style={styles.checkboxText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.horasSueño === 'no' && styles.checkboxSelected]}
            onPress={() => handleInputChange('horasSueño', 'no')}
          >
            <Text style={styles.checkboxText}>No</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textarea}
          placeholder="Observaciones"
          value={formData.observaciones.horasSueño}
          onChangeText={(text) => handleInputChange('observaciones_horasSueño', text)}
        />
      </View>

      {/* Nueva sección: Adjuntar archivo */}
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

export default DriverForm;
