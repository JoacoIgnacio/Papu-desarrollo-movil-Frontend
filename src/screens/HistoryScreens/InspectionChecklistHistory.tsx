import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, Button, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { styles } from '../Common/InspectionChecklistScreen.styles';
import { getUserId } from '../../services/authStorage';

interface FormData {
    nombre: string;
    kilometraje: string;
    patente: string;
    archivos: string[];
    location: { latitud: number, longitud: number };
    direccion: string;
  }

  const InspectionChecklistScreen = ({ route, navigation }: { route: any, navigation: NavigationProp<any, 'InspectionHistory'> }) => {
    const idQuestionnarie = route.params.id;
    const date = route.params.date;
    
  
    const [formData, setFormData] = useState<FormData>({
      nombre: 'Cargando resultados...',
      kilometraje: 'Cargando resultados...',
      patente: 'Cargando resultados...',
      archivos: [],
      location: { latitud: 0, longitud: 0 },
      direccion: 'Cargando dirección...', 
    });

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
    const handleImagePress = (image: string) => {
      setSelectedImage(`data:image/jpeg;base64,${image}`);
      setModalVisible(true);
    };

    const getAddressFromCoordinates = async (lat: number, lng: number) => {
      const apiKey = process.env.apiKey; // Tu clave API
      console.log(apiKey);
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${lng}&key=${apiKey}&pretty=1`;
      console.log(url);
      try {
        const response = await axios.get(url);
        if (response.data && response.data.results.length > 0) {
          return response.data.results[0].formatted; // Dirección formateada
        } else {
          return 'Dirección no encontrada';
        }
      } catch (error) {
        console.error('Error obteniendo la dirección:', error);
        return 'Error al obtener la dirección';
      }
    };
  
    useEffect(() => {
      // Función para obtener los datos del endpoint
      const fetchData = async () => {
          const userId = await getUserId('userId');
          
        try {
          const response = await axios.get(`http://${process.env.IP}:3001/answers/${userId}/${idQuestionnarie}?date=${date}`);
          const data = response.data;
        
          // Mapea los datos recibidos a formData
          const newFormData = {
            nombre: data.find((item: any) => item.questionId.text === 'Nombre')?.response || '',
            kilometraje: data.find((item: any) => item.questionId.text === 'Kilometraje')?.response || '',
            patente: data.find((item: any) => item.questionId.text === 'Patente')?.response || '',
            archivos: data.find((item: any) => item.questionId.text === 'Imagenes')?.images || '',
            location: data.find((item: any) => item.questionId.text === 'Ubicacion')?.observations,
            direccion: 'Cargando dirección...', // Valor temporal
          };
  
          newFormData.location = JSON.parse(newFormData.location);
          newFormData.direccion = await getAddressFromCoordinates(newFormData.location.latitud, newFormData.location.longitud);

          setFormData(newFormData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [idQuestionnarie]);



return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Respuestas del Check List "Conductores” Comercializadora Ltda.</Text>

      {/* Tarjeta 1: Nombre */}
      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.input}>{formData.nombre}</Text>
      </View>

      {/* Tarjeta 2: Patente */}
      <View style={styles.card}>
        <Text style={styles.label}>Patente</Text>
        <Text style={styles.input}>{formData.patente}</Text>
      </View>

      {/* Tarjeta 3: Kilometraje */}
      <View style={styles.card}>
        <Text style={styles.label}>Kilometraje</Text>
        <Text style={styles.input}>{formData.kilometraje}</Text>
      </View>

      

      {/* Nueva sección: Mostrar imágenes */}
      <Text style={styles.sectionTitle}>Imágenes adjuntas</Text>
      <View style={styles.card}>
        {formData.archivos.length > 0 ? (
          formData.archivos.map((base64Image, index) => (
            <TouchableOpacity key={index} onPress={() => handleImagePress(base64Image)}>
              <Image
                key={index}
                source={{ uri:`data:image/jpeg;base64,${base64Image}`}}
                style={styles.image}
              />
            </TouchableOpacity>
          ))
        ) : (
          <Text>No hay imágenes adjuntas</Text>
        )}
      </View>

      <Text style={styles.sectionTitle}>Dirección</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Dirección</Text>
        <Text style={styles.input}>{formData.direccion}</Text>
      </View>

      {/* Modal para mostrar imagen */}
      <Modal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {selectedImage && <Image source={{ uri: selectedImage }} style={styles.fullImage} />}
          <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>

      <Button
        title="Volver"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </ScrollView>
  );
};

export default InspectionChecklistScreen;