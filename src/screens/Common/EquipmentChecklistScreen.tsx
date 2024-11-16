import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Button, Image, Alert, StyleSheet } from 'react-native';
import { RootStackParamList } from '../../navigation/rootStackNavigation';
import * as ImagePicker from 'expo-image-picker';
import * as LocalAuthentication from 'expo-local-authentication';
import { styles } from './EquipmentChecklistScreen.styles';
import { getUserId } from '../../services/authStorage';
import axios from 'axios';

export const EquipmentForm = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'Equipment'>) => {
  const [formData, setFormData] = useState({
    nombre: '',
    fecha: '',
    patente: '',
    kilometraje: '',
    luces: '',
    neumaticos: '',
    parabrisas: '',
    carroceria: '',
    aguaAceite: '',
    documentacion: '',
    botiquin: '',
    kitDerrame: '',
    kitEmergencia: '',
    kitInvierno: '',
    extintor: '',
    volante: '',
    gps: '',
    rco: '',
    trabaTuercas: '',
    observaciones: {
      luces: '',
    neumaticos: '',
    parabrisas: '',
    carroceria: '',
    aguaAceite: '',
    documentacion: '',
    botiquin: '',
    kitDerrame: '',
    kitEmergencia: '',
    kitInvierno: '',
    extintor: '',
    volante: '',
    gps: '',
    rco: '',
    trabaTuercas: '',
    },
    archivos: [] as string[],
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
    if (isAuthenticated) {
      const userId = await getUserId('userId');
    try {
      const name = await axios.post('http://192.168.0.9:3001/answers',
        {
          questionnaireId: "6736de612b80aa3d639437b7",
          questionId: "6736d70b8a664768001bb594",
          userId: userId,
          response: formData.nombre,
        });
      const date = await axios.post(`http://192.168.0.9:3001/answers`,
        {
          questionnaireId: "6736de612b80aa3d639437b7",
          questionId: "6736d7118a664768001bb596",
          userId: userId,
          response: formData.fecha,
        });
      const patente = await axios.post('http://192.168.0.9:3001/answers',
        {
          questionnaireId: "6736de612b80aa3d639437b7",
          questionId: "6736d7158a664768001bb598",
          userId: userId,
          response: formData.patente,
        });
      const kilometraje = await axios.post('http://192.168.0.9:3001/answers',
        {
          questionnaireId: "6736de612b80aa3d639437b7",
          questionId: "6736dfa98a664768001bb5c8",
          userId: userId,
          response: formData.kilometraje,
        });
      const luces = await axios.post('http://192.168.0.9:3001/answers',
        {
          questionnaireId: "6736de612b80aa3d639437b7",
          questionId: "6736ddad8a664768001bb5aa",
          userId: userId,
          response: formData.luces,
          observations: formData.observaciones.luces,
        });
      const neumaticos = await axios.post('http://192.168.0.9:3001/answers',
        {
          questionnaireId: "6736de612b80aa3d639437b7",
          questionId: "6736ddb28a664768001bb5ac",
          userId: userId,
          response: formData.neumaticos,
          observations: formData.observaciones.neumaticos,
        });
      const parabrisas = await axios.post('http://192.168.0.9:3001/answers',
        {
          questionnaireId: "6736de612b80aa3d639437b7",
          questionId: "6736ddb98a664768001bb5ae",
          userId: userId,
          response: formData.parabrisas,
          observations: formData.observaciones.parabrisas,
        });
      const carroceria = await axios.post('http://192.168.0.9:3001/answers',
        {
          questionnaireId: "6736de612b80aa3d639437b7",
          questionId: "6736ddc08a664768001bb5b0",
          userId: userId,
          response: formData.carroceria,
          observations: formData.observaciones.carroceria,
        });
      const aguaAceite = await axios.post('http://192.168.0.9:3001/answers',
        {
          questionnaireId: "6736de612b80aa3d639437b7",
          questionId: "6736ddc78a664768001bb5b2",
          userId: userId,
          response: formData.aguaAceite,
          observations: formData.observaciones.aguaAceite,
        });
      const documentacion = await axios.post('http://192.168.0.9:3001/answers',
        {
          questionnaireId: "6736de612b80aa3d639437b7",
          questionId: "6736ddce8a664768001bb5b4",
          userId: userId,
          response: formData.documentacion,
          observations: formData.observaciones.documentacion,
        });
      const botiquin = await axios.post('http://192.168.0.9:3001/answers',
        {
          questionnaireId: "6736de612b80aa3d639437b7",
          questionId: "6736ddd58a664768001bb5b6",
          userId: userId,
          response: formData.botiquin,
          observations: formData.observaciones.botiquin,
        });
      const kitDerrame = await axios.post('http://192.168.0.9:3001/answers',
        {
          questionnaireId: "6736de612b80aa3d639437b7",
          questionId: "6736dddb8a664768001bb5b8",
          userId: userId,
          response: formData.kitDerrame,
          observations: formData.observaciones.kitDerrame,
        });
      const kitEmergencia = await axios.post('http://192.168.0.9:3001/answers',
        {
          questionnaireId: "6736de612b80aa3d639437b7",
          questionId: "6736dde28a664768001bb5ba",
          userId: userId,
          response: formData.kitEmergencia,
          observations: formData.observaciones.kitEmergencia,
        });
      const kitInvierno = await axios.post('http://192.168.0.9:3001/answers',
        {
          questionnaireId: "6736de612b80aa3d639437b7",
          questionId: "6736dde98a664768001bb5bc",
          userId: userId,
          response: formData.kitInvierno,
          observations: formData.observaciones.kitInvierno,
        });
      const extintor = await axios.post('http://192.168.0.9:3001/answers',
        {
          questionnaireId: "6736de612b80aa3d639437b7",
          questionId: "6736ddf08a664768001bb5be",
          userId: userId,
          response: formData.extintor,
          observations: formData.observaciones.extintor,
        });
      const volante = await axios.post('http://192.168.0.9:3001/answers', 
        {
          questionnaireId: "6736de612b80aa3d639437b7",
          questionId: "6736ddf78a664768001bb5c0",
          userId: userId,
          response: formData.volante,
          observations: formData.observaciones.volante,
        });
      const gps = await axios.post('http://192.168.0.9:3001/answers',
        {
          questionnaireId: "6736de612b80aa3d639437b7",
          questionId: "6736ddfd8a664768001bb5c2",
          userId: userId,
          response: formData.gps,
          observations: formData.observaciones.gps,
        });
      const rco = await axios.post('http://192.168.0.9:3001/answers',
        {
          questionnaireId: "6736de612b80aa3d639437b7",
          questionId: "6736de048a664768001bb5c4",
          userId: userId,
          response: formData.rco,
          observations: formData.observaciones.rco,
        });
      const trabaTuercas = await axios.post('http://192.168.0.9:3001/answers',
        {
          questionnaireId: "6736de612b80aa3d639437b7",
          questionId: "6736de0a8a664768001bb5c6",
          userId: userId,
          response: formData.trabaTuercas,
          observations: formData.observaciones.trabaTuercas,
        });

        Alert.alert('Enviado', 'El formulario ha sido enviado exitosamente');
        navigation.navigate('Home');
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      }
    } else {
      Alert.alert('Error', 'La autenticación falló, no se puede enviar el formulario');
    }
    } 

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Check List "Equipamientos” Comercializadora Ltda.</Text>

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

      {/* Tarjeta 4: Kilometraje */}
      <View style={styles.card}>
        <Text style={styles.label}>Kilometraje</Text>
        <TextInput
          style={styles.input}
          placeholder="Kilometraje del vehículo"
          value={formData.kilometraje}
          onChangeText={(text) => handleInputChange('kilometraje', text)}
        />
      </View>

      {/* Tarjeta 5: Sistema Luces*/}
      <Text style={styles.sectionTitle}>Estado General</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Sistema de Luces ¿Se encuentra operativo?
        (bajas, altas, freno, retroceso, intermitentes, etc.)</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.luces === 'si' && styles.checkboxSelected]}
            onPress={() => handleInputChange('luces', 'si')}
          >
            <Text style={styles.checkboxText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.luces === 'no' && styles.checkboxSelected]}
            onPress={() => handleInputChange('luces', 'no')}
          >
            <Text style={styles.checkboxText}>No</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textarea}
          placeholder="Observaciones"
          value={formData.observaciones.luces}
          onChangeText={(text) => handleInputChange('observaciones_luces', text)}
        />
      </View>

      {/* Tarjeta 5: Neumaticos */}
      <View style={styles.card}>
        <Text style={styles.label}>Los Neumáticos ¿Se encuentran en buen estado?
        (4mm de profundidad como mínimo)</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.neumaticos  === 'si' && styles.checkboxSelected]}
            onPress={() => handleInputChange('neumaticos', 'si')}
          >
            <Text style={styles.checkboxText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.neumaticos === 'no' && styles.checkboxSelected]}
            onPress={() => handleInputChange('neumaticos', 'no')}
          >
            <Text style={styles.checkboxText}>No</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textarea}
          placeholder="Observaciones"
          value={formData.observaciones.neumaticos}
          onChangeText={(text) => handleInputChange('observaciones_neumaticos', text)}
        />
      </View>

      {/* Tarjeta 6: Parabrisas */}
      <View style={styles.card}>
        <Text style={styles.label}>El Parabrisas ¿Se encuentra en buen estado?
        (Sin picaduras y/o trizaduras)</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.parabrisas === 'si' && styles.checkboxSelected]}
            onPress={() => handleInputChange('parabrisas', 'si')}
          >
            <Text style={styles.checkboxText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.parabrisas=== 'no' && styles.checkboxSelected]}
            onPress={() => handleInputChange('parabrisas', 'no')}
          >
            <Text style={styles.checkboxText}>No</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textarea}
          placeholder="Observaciones"
          value={formData.observaciones.parabrisas}
          onChangeText={(text) => handleInputChange('observaciones_parabrisas', text)}
        />
      </View>

      {/* Tarjeta 7: Carroceria*/}
      <View style={styles.card}>
        <Text style={styles.label}>La Carrocería ¿Se encuentra en buen estado?</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.carroceria === 'si' && styles.checkboxSelected]}
            onPress={() => handleInputChange('carroceria', 'si')}
          >
            <Text style={styles.checkboxText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.carroceria=== 'no' && styles.checkboxSelected]}
            onPress={() => handleInputChange('carroceria', 'no')}
          >
            <Text style={styles.checkboxText}>No</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textarea}
          placeholder="Observaciones"
          value={formData.observaciones.carroceria}
          onChangeText={(text) => handleInputChange('observaciones_carroceria', text)}
        />
      </View>

      {/* Tarjeta 8: Niveles de agua*/}
      <View style={styles.card}>
        <Text style={styles.label}>¿Reviso niveles de agua y aceite?</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.aguaAceite === 'si' && styles.checkboxSelected]}
            onPress={() => handleInputChange('aguaAceite', 'si')}
          >
            <Text style={styles.checkboxText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.aguaAceite === 'no' && styles.checkboxSelected]}
            onPress={() => handleInputChange('aguaAceite', 'no')}
          >
            <Text style={styles.checkboxText}>No</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textarea}
          placeholder="Observaciones"
          value={formData.observaciones.aguaAceite}
          onChangeText={(text) => handleInputChange('observaciones_aguaAceite', text)}
        />
      </View>

      {/* Tarjeta 9: Documentacion vehiculo */}
      <Text style={styles.sectionTitle}>Accesorios/Documentos</Text>
      <View style={styles.card}>
        <Text style={styles.label}>¿Se encuentra al día la documentación del
      vehículo? (Seguro, Permiso, Revisión Técnica,
      etc.)</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.documentacion === 'si' && styles.checkboxSelected]}
            onPress={() => handleInputChange('documentacion', 'si')}
          >
            <Text style={styles.checkboxText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.documentacion === 'no' && styles.checkboxSelected]}
            onPress={() => handleInputChange('documentacion', 'no')}
          >
            <Text style={styles.checkboxText}>No</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textarea}
          placeholder="Observaciones"
          value={formData.observaciones.documentacion}
          onChangeText={(text) => handleInputChange('observaciones_documentacion', text)}
        />
      </View>

      {/* Tarjeta 10: Botiquin primero auxilios */}
      <View style={styles.card}>
        <Text style={styles.label}>Cuenta con botiquín de Primeros Auxilios</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.botiquin === 'si' && styles.checkboxSelected]}
            onPress={() => handleInputChange('botiquin', 'si')}
          >
            <Text style={styles.checkboxText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.botiquin === 'no' && styles.checkboxSelected]}
            onPress={() => handleInputChange('botiquin', 'no')}
          >
            <Text style={styles.checkboxText}>No</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textarea}
          placeholder="Observaciones"
          value={formData.observaciones.botiquin}
          onChangeText={(text) => handleInputChange('observaciones_botiquin', text)}
        />
      </View>

      {/* Tarjeta 11: Kit Derrame */}
      <View style={styles.card}>
        <Text style={styles.label}>Cuenta con Kit de Derrame (Pala, arena
          absorbente, cubeta, escoba, bolsas)</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.kitDerrame === 'si' && styles.checkboxSelected]}
            onPress={() => handleInputChange('kitDerrame', 'si')}
          >
            <Text style={styles.checkboxText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.kitDerrame === 'no' && styles.checkboxSelected]}
            onPress={() => handleInputChange('kitDerrame', 'no')}
          >
            <Text style={styles.checkboxText}>No</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textarea}
          placeholder="Observaciones"
          value={formData.observaciones.kitDerrame}
          onChangeText={(text) => handleInputChange('observaciones_kitDerrame', text)}
        />
      </View>

      {/* Tarjeta 12: Kit emergencias */}
      <View style={styles.card}>
        <Text style={styles.label}>Cuenta con Kit de Emergencias (Triangulo
        reflectante, gata hidráulica, neumático de
        repuesto, llaves de rueda, conos, extintor, chaleco
        reflectante)</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.kitEmergencia === 'si' && styles.checkboxSelected]}
            onPress={() => handleInputChange('kitEmergencia', 'si')}
          >
            <Text style={styles.checkboxText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.kitEmergencia === 'no' && styles.checkboxSelected]}
            onPress={() => handleInputChange('kitEmergencia', 'no')}
          >
            <Text style={styles.checkboxText}>No</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textarea}
          placeholder="Observaciones"
          value={formData.observaciones.kitEmergencia }
          onChangeText={(text) => handleInputChange('observaciones_kitEmergencia', text)}
        />
      </View>

      {/* Tarjeta 13: Kit Invierno */}
      <View style={styles.card}>
        <Text style={styles.label}>Cuenta con Kit de Invierno (Cadenas, manta,
          herramientas básicas para la instalación.)</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.kitInvierno === 'si' && styles.checkboxSelected]}
            onPress={() => handleInputChange('kitInvierno', 'si')}
          >
            <Text style={styles.checkboxText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.kitInvierno === 'no' && styles.checkboxSelected]}
            onPress={() => handleInputChange('kitInvierno', 'no')}
          >
            <Text style={styles.checkboxText}>No</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textarea}
          placeholder="Observaciones"
          value={formData.observaciones.kitInvierno}
          onChangeText={(text) => handleInputChange('observaciones_kitInvierno', text)}
        />
      </View>

            {/* Tarjeta 14: Extintos */}
            <View style={styles.card}>
        <Text style={styles.label}>El Extintor ¿Se encuentra en operativo?</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.extintor === 'si' && styles.checkboxSelected]}
            onPress={() => handleInputChange('extintor', 'si')}
          >
            <Text style={styles.checkboxText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.extintor === 'no' && styles.checkboxSelected]}
            onPress={() => handleInputChange('extintor', 'no')}
          >
            <Text style={styles.checkboxText}>No</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textarea}
          placeholder="Observaciones"
          value={formData.observaciones.extintor}
          onChangeText={(text) => handleInputChange('observaciones_extintor', text)}
        />
      </View>

        {/* Tarjeta 15: volante */}
        <View style={styles.card}>
        <Text style={styles.label}>¿Cuenta con el “volante” para la manipulación de
        tambores?</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.volante === 'si' && styles.checkboxSelected]}
            onPress={() => handleInputChange('volante', 'si')}
          >
            <Text style={styles.checkboxText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.volante === 'no' && styles.checkboxSelected]}
            onPress={() => handleInputChange('volante', 'no')}
          >
            <Text style={styles.checkboxText}>No</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textarea}
          placeholder="Observaciones"
          value={formData.observaciones.volante}
          onChangeText={(text) => handleInputChange('observaciones_volante', text)}
        />
      </View>

       {/* Tarjeta 15: GPS */}
       <View style={styles.card}>
        <Text style={styles.label}>GPS ¿Se encuentra ¿operativo?</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.gps === 'si' && styles.checkboxSelected]}
            onPress={() => handleInputChange('gps', 'si')}
          >
            <Text style={styles.checkboxText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.gps  === 'no' && styles.checkboxSelected]}
            onPress={() => handleInputChange('gps', 'no')}
          >
            <Text style={styles.checkboxText}>No</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textarea}
          placeholder="Observaciones"
          value={formData.observaciones.gps }
          onChangeText={(text) => handleInputChange('observaciones_gps', text)}
        />
      </View>

       {/* Tarjeta 16: RCO */}
       <View style={styles.card}>
        <Text style={styles.label}>Se encuentra conectado a la aplicación RCO</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.rco === 'si' && styles.checkboxSelected]}
            onPress={() => handleInputChange('rco', 'si')}
          >
            <Text style={styles.checkboxText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.rco  === 'no' && styles.checkboxSelected]}
            onPress={() => handleInputChange('rco', 'no')}
          >
            <Text style={styles.checkboxText}>No</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textarea}
          placeholder="Observaciones"
          value={formData.observaciones.rco }
          onChangeText={(text) => handleInputChange('observaciones_rco', text)}
        />
      </View>

      {/* Tarjeta 17: Traba Tuercas */}
      <View style={styles.card}>
        <Text style={styles.label}>Su camión cuenta con traba tuercas</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.trabaTuercas === 'si' && styles.checkboxSelected]}
            onPress={() => handleInputChange('trabaTuercas', 'si')}
          >
            <Text style={styles.checkboxText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.checkboxButton, formData.trabaTuercas  === 'no' && styles.checkboxSelected]}
            onPress={() => handleInputChange('trabaTuercas', 'no')}
          >
            <Text style={styles.checkboxText}>No</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textarea}
          placeholder="Observaciones"
          value={formData.observaciones.trabaTuercas }
          onChangeText={(text) => handleInputChange('observaciones_trabaTuercas', text)}
        />
      </View>
 {/* Tarjeta 15: Adjuntar archivos */}
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

export default EquipmentForm;
