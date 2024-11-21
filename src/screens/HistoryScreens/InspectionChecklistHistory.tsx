import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, Button } from 'react-native';
import axios from 'axios';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { styles } from '../Common/InspectionChecklistScreen.styles';
import { getUserId } from '../../services/authStorage';

interface FormData {
    nombre: string;
    kilometraje: string;
    patente: string;
    archivos: string[];
  }

  const InspectionChecklistScreen = ({ route, navigation }: { route: any, navigation: NavigationProp<any, 'InspectionHistory'> }) => {
    const idQuestionnarie = route.params.id;
    const date = route.params.date;
    
  
    const [formData, setFormData] = useState<FormData>({
      nombre: '',
      kilometraje: '',
      patente: '',
      archivos: []
    });
  
    useEffect(() => {
      // Función para obtener los datos del endpoint
      const fetchData = async () => {
          const userId = await getUserId('userId');
          
        try {
          const response = await axios.get(`http://${process.env.IP}:3001/answers/${userId}/${idQuestionnarie}?date=${date}`);
          const data = response.data;
          console.log(data);
  
          // Mapea los datos recibidos a formData
          const newFormData = {
            nombre: data.find((item: any) => item.questionId.text === 'Nombre')?.response || '',
            kilometraje: data.find((item: any) => item.questionId.text === 'Kilometraje')?.response || '',
            patente: data.find((item: any) => item.questionId.text === 'Patente')?.response || '',
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

export default InspectionChecklistScreen;