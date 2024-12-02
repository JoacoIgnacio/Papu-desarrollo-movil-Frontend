import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, Button, TouchableOpacity,Modal } from 'react-native';
import axios from 'axios';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { styles } from '../Common/DriverChecklistScreen.styles';
import { getUserId } from '../../services/authStorage';



interface FormData {
  nombre: string;
  fecha: string;
  patente: string;
  horasSueño: string;
  observaciones: {
    horasSueño: string;
  };
  archivos: string[];
  location: { latitud: number, longitud: number };
  direccion: string;
}

const DriverChecklistScreen = ({ route, navigation }: { route: any, navigation: NavigationProp<any, 'DriverHistory'> }) => {
  const idQuestionnarie = route.params.id;
  const date = route.params.date;
  

  const [formData, setFormData] = useState<FormData>({
    nombre: 'Cargando resultados...',
    fecha: 'Cargando resultados...',
    patente: 'Cargando resultados...',
    horasSueño: '',
    observaciones: {
      horasSueño: ''
    },
    archivos: [],
    location: { latitud: 0, longitud: 0 }, // Agregar localización al estado inicial
    direccion: 'Cargando dirección...',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
          fecha: data.find((item: any) => item.questionId.text === 'Fecha')?.response || '',
          patente: data.find((item: any) => item.questionId.text === 'Patente')?.response || '',
          horasSueño: data.find((item: any) => item.questionId.text === '¿Ha dormido menos de 6 hrs en las últimas 24 hrs?')?.response || '',
          observaciones: {
            horasSueño: data.find((item: any) => item.questionId.text === '¿Ha dormido menos de 6 hrs en las últimas 24 hrs?')?.observations || ''
          },
          archivos: data.find((item: any) => item.questionId.text === 'Imagenes')?.images || '', // Aquí puedes agregar lógica para manejar archivos si es necesario
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

  const handleImagePress = (image: string) => {
    setSelectedImage(`data:image/jpeg;base64,${image}`);
    setModalVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Respuestas del Check List "Conductores” Comercializadora Ltda.</Text>

      {/* Tarjeta 1: Nombre */}
      <View style={styles.card}>
        <Text style={styles.label}>Nombre</Text>
        <Text style={styles.input}>{formData.nombre}</Text>
      </View>

      {/* Tarjeta 2: Fecha */}
      <View style={styles.card}>
        <Text style={styles.label}>Fecha</Text>
        <Text style={styles.input}>{formData.fecha}</Text>
      </View>

      {/* Tarjeta 3: Patente */}
      <View style={styles.card}>
        <Text style={styles.label}>Patente</Text>
        <Text style={styles.input}>{formData.patente}</Text>
      </View>

      {/* Tarjeta 4: Fatiga y Somnolencia */}
      <Text style={styles.sectionTitle}>Fatiga y Somnolencia</Text>
      <View style={styles.card}>
        <Text style={styles.label}>¿Ha dormido menos de 6 hrs en las últimas 24 hrs?</Text>
        <Text style={styles.input}>{formData.horasSueño === 'si' ? 'Sí' : 'No'}</Text>
        <Text style={styles.label}>Observaciones</Text>
        <Text style={styles.textarea}>{formData.observaciones.horasSueño}</Text>
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
      
      {/* Tarjeta 5: Dirección */}
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

export default DriverChecklistScreen;