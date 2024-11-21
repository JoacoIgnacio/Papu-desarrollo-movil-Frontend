import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, Button } from 'react-native';
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
}

const DriverChecklistScreen = ({ route, navigation }: { route: any, navigation: NavigationProp<any, 'DriverHistory'> }) => {
  const idQuestionnarie = route.params.id;
  const date = route.params.date;
  

  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    fecha: '',
    patente: '',
    horasSueño: '',
    observaciones: {
      horasSueño: ''
    },
    archivos: []
  });

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
          archivos: [] // Aquí puedes agregar lógica para manejar archivos si es necesario
        };

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

      {/* Nueva sección: Adjuntar archivo */}
      <Text style={styles.sectionTitle}>Adjuntar archivo (opcional)</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Fotos adjuntas</Text>
        {formData.archivos.length > 0 ? (
          <View>
            {formData.archivos.map((uri, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Image source={{ uri }} style={{ width: 100, height: 100 }} />
              </View>
            ))}
          </View>
        ) : (
          <Text>No hay fotos adjuntas</Text>
        )}
      </View>

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