import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Image, Button, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { styles } from '../Common/EquipmentChecklistScreen.styles';
import { getUserId } from '../../services/authStorage';

interface FormData {
  nombre: string;
  fecha: string;
  patente: string;
  kilometraje: string;
  luces: string;
  neumaticos: string;
  parabrisas: string;
  carroceria: string;
  aguaAceite: string;
  documentacion: string;
  botiquin: string;
  kitDerrame: string;
  kitEmergencia: string;
  kitInvierno: string;
  extintor: string;
  volante: string;
  gps: string;
  rco: string;
  trabaTuercas: string;
  observaciones: {
    luces: string;
    neumaticos: string;
    parabrisas: string;
    carroceria: string;
    aguaAceite: string;
    documentacion: string;
    botiquin: string;
    kitDerrame: string;
    kitEmergencia: string;
    kitInvierno: string;
    extintor: string;
    volante: string;
    gps: string;
    rco: string;
    trabaTuercas: string;
  };
  archivos: string[];
}

interface EquipmentChecklistScreenProps {
  route: RouteProp<{ params: { id: string } }, 'params'>;
  navigation: NavigationProp<any>;
}

const EquipmentChecklistScreen = ({ route, navigation }: { route: any, navigation: NavigationProp<any, 'EquipmentHistory'> }) => {
    const idQuestionnarie = route.params.id;
    const date = route.params.date;

    const [formData, setFormData] = useState<FormData>({
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
          kilometraje: data.find((item: any) => item.questionId.text === 'Kilometraje')?.response || '',
          luces: data.find((item: any) => item.questionId.text === 'Sistema de Luces ¿Se encuentra operativo? (bajas, altas, freno, retroceso, intermitentes, etc.)')?.response || '',
          neumaticos: data.find((item: any) => item.questionId.text === 'Los Neumáticos ¿Se encuentran en buen estado? (4mm de profundidad como mínimo)')?.response || '',
          parabrisas: data.find((item: any) => item.questionId.text === 'El Parabrisas ¿Se encuentra en buen estado? (Sin picaduras y/o trizaduras)')?.response || '',
          carroceria: data.find((item: any) => item.questionId.text === 'La Carrocería ¿Se encuentra en buen estado?')?.response || '',
          aguaAceite: data.find((item: any) => item.questionId.text === '¿Reviso niveles de agua y aceite?')?.response || '',
          documentacion: data.find((item: any) => item.questionId.text === '¿Se encuentra al día la documentación del vehículo? (Seguro, Permiso, Revisión Técnica, etc.)')?.response || '',
          botiquin: data.find((item: any) => item.questionId.text === 'Cuenta con botiquín de Primeros Auxilios')?.response || '',
          kitDerrame: data.find((item: any) => item.questionId.text === 'Cuenta con Kit de Derrame (Pala, arena absorbente, cubeta, escoba, bolsas)')?.response || '',
          kitEmergencia: data.find((item: any) => item.questionId.text === 'Cuenta con Kit de Emergencias (Triangulo reflectante, gata hidráulica, neumático de repuesto, llaves de rueda, conos, extintor, chaleco reflectante)')?.response || '',
          kitInvierno: data.find((item: any) => item.questionId.text === 'Cuenta con Kit de Invierno (Cadenas, manta, herramientas básicas para la instalación.)')?.response || '',
          extintor: data.find((item: any) => item.questionId.text === 'El Extintor ¿Se encuentra en operativo?')?.response || '',
          volante: data.find((item: any) => item.questionId.text === '¿Cuenta con el “volante” para la manipulación de tambores?')?.response || '',
          gps: data.find((item: any) => item.questionId.text === 'GPS ¿Se encuentra operativo?')?.response || '',
          rco: data.find((item: any) => item.questionId.text === 'Se encuentra conectado a la aplicación RCO')?.response || '',
          trabaTuercas: data.find((item: any) => item.questionId.text === 'Su camión cuenta con traba tuercas')?.response || '',
          observaciones:  {
              luces: data.find((item: any) => item.questionId.text === 'Sistema de Luces ¿Se encuentra operativo? (bajas, altas, freno, retroceso, intermitentes, etc.)')?.observations || '',
              neumaticos: data.find((item: any) => item.questionId.text === 'Los Neumáticos ¿Se encuentran en buen estado? (4mm de profundidad como mínimo)')?.observations || '',
              parabrisas: data.find((item: any) => item.questionId.text === 'El Parabrisas ¿Se encuentra en buen estado? (Sin picaduras y/o trizaduras)')?.observations || '',
              carroceria: data.find((item: any) => item.questionId.text === 'La Carrocería ¿Se encuentra en buen estado?')?.observations || '',
              aguaAceite: data.find((item: any) => item.questionId.text === '¿Reviso niveles de agua y aceite?')?.observations || '',
              documentacion: data.find((item: any) => item.questionId.text === '¿Se encuentra al día la documentación del vehículo? (Seguro, Permiso, Revisión Técnica, etc.)')?.observations || '',
              botiquin: data.find((item: any) => item.questionId.text === 'Cuenta con botiquín de Primeros Auxilios')?.observations || '',
              kitDerrame: data.find((item: any) => item.questionId.text === 'Cuenta con Kit de Derrame (Pala, arena absorbente, cubeta, escoba, bolsas)')?.observations || '',
              kitEmergencia: data.find((item: any) => item.questionId.text === 'Cuenta con Kit de Emergencias')?.observations || '',
              kitInvierno: data.find((item: any) => item.questionId.text === 'Cuenta con Kit de Invierno (Cadenas, manta, herramientas básicas para la instalación.)')?.observations || '',
              extintor: data.find((item: any) => item.questionId.text === 'El Extintor ¿Se encuentra en operativo?')?.observations || '',
              volante: data.find((item: any) => item.questionId.text === '¿Cuenta con el “volante” para la manipulación de tambores?')?.observations || '',
              gps: data.find((item: any) => item.questionId.text === 'GPS ¿Se encuentra operativo?')?.observations || '',
              rco: data.find((item: any) => item.questionId.text === 'Se encuentra conectado a la aplicación RCO')?.observations || '',
              trabaTuercas: data.find((item: any) => item.questionId.text === 'Su camión cuenta con traba tuercas')?.observations || '',
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

    function handleRemoveImage(uri: string): void {
        throw new Error('Function not implemented.');
    }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Check List "Equipamientos” Comercializadora Ltda.</Text>

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

      {/* Tarjeta 4: Kilometraje */}
      <View style={styles.card}>
        <Text style={styles.label}>Kilometraje</Text>
        <Text style={styles.input}>{formData.kilometraje}</Text>
      </View>

      {/* Tarjeta 5: Sistema Luces */}
      <Text style={styles.sectionTitle}>Estado General</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Sistema de Luces ¿Se encuentra operativo? (bajas, altas, freno, retroceso, intermitentes, etc.)</Text>
        <Text style={styles.input}>{formData.luces === 'si' ? 'Sí' : 'No'}</Text>
        <Text style={styles.label}>Observaciones</Text>
        <Text style={styles.textarea}>{formData.observaciones.luces}</Text>
      </View>

      {/* Tarjeta 6: Neumaticos */}
      <View style={styles.card}>
        <Text style={styles.label}>Los Neumáticos ¿Se encuentran en buen estado? (4mm de profundidad como mínimo)</Text>
        <Text style={styles.input}>{formData.neumaticos === 'si' ? 'Sí' : 'No'}</Text>
        <Text style={styles.label}>Observaciones</Text>
        <Text style={styles.textarea}>{formData.observaciones.neumaticos}</Text>
      </View>

      {/* Tarjeta 7: Parabrisas */}
      <View style={styles.card}>
        <Text style={styles.label}>El Parabrisas ¿Se encuentra en buen estado? (Sin picaduras y/o trizaduras)</Text>
        <Text style={styles.input}>{formData.parabrisas === 'si' ? 'Sí' : 'No'}</Text>
        <Text style={styles.label}>Observaciones</Text>
        <Text style={styles.textarea}>{formData.observaciones.parabrisas}</Text>
      </View>

      {/* Tarjeta 8: Carroceria */}
      <View style={styles.card}>
        <Text style={styles.label}>La Carrocería ¿Se encuentra en buen estado?</Text>
        <Text style={styles.input}>{formData.carroceria === 'si' ? 'Sí' : 'No'}</Text>
        <Text style={styles.label}>Observaciones</Text>
        <Text style={styles.textarea}>{formData.observaciones.carroceria}</Text>
      </View>

      {/* Tarjeta 9: Niveles de agua */}
      <View style={styles.card}>
        <Text style={styles.label}>¿Reviso niveles de agua y aceite?</Text>
        <Text style={styles.input}>{formData.aguaAceite === 'si' ? 'Sí' : 'No'}</Text>
        <Text style={styles.label}>Observaciones</Text>
        <Text style={styles.textarea}>{formData.observaciones.aguaAceite}</Text>
      </View>

      {/* Tarjeta 10: Documentacion vehiculo */}
      <Text style={styles.sectionTitle}>Accesorios/Documentos</Text>
      <View style={styles.card}>
        <Text style={styles.label}>¿Se encuentra al día la documentación del vehículo? (Seguro, Permiso, Revisión Técnica, etc.)</Text>
        <Text style={styles.input}>{formData.documentacion === 'si' ? 'Sí' : 'No'}</Text>
        <Text style={styles.label}>Observaciones</Text>
        <Text style={styles.textarea}>{formData.observaciones.documentacion}</Text>
      </View>

      {/* Tarjeta 11: Botiquin primero auxilios */}
      <View style={styles.card}>
        <Text style={styles.label}>Cuenta con botiquín de Primeros Auxilios</Text>
        <Text style={styles.input}>{formData.botiquin === 'si' ? 'Sí' : 'No'}</Text>
        <Text style={styles.label}>Observaciones</Text>
        <Text style={styles.textarea}>{formData.observaciones.botiquin}</Text>
      </View>

      {/* Tarjeta 12: Kit Derrame */}
      <View style={styles.card}>
        <Text style={styles.label}>Cuenta con Kit de Derrame (Pala, arena absorbente, cubeta, escoba, bolsas)</Text>
        <Text style={styles.input}>{formData.kitDerrame === 'si' ? 'Sí' : 'No'}</Text>
        <Text style={styles.label}>Observaciones</Text>
        <Text style={styles.textarea}>{formData.observaciones.kitDerrame}</Text>
      </View>

      {/* Tarjeta 13: Kit emergencias */}
      <View style={styles.card}>
        <Text style={styles.label}>Cuenta con Kit de Emergencias (Triangulo reflectante, gata hidráulica, neumático de repuesto, llaves de rueda, conos, extintor, chaleco reflectante)</Text>
        <Text style={styles.input}>{formData.kitEmergencia === 'si' ? 'Sí' : 'No'}</Text>
        <Text style={styles.label}>Observaciones</Text>
        <Text style={styles.textarea}>{formData.observaciones.kitEmergencia}</Text>
      </View>

      {/* Tarjeta 14: Kit Invierno */}
      <View style={styles.card}>
        <Text style={styles.label}>Cuenta con Kit de Invierno (Cadenas, manta, herramientas básicas para la instalación.)</Text>
        <Text style={styles.input}>{formData.kitInvierno === 'si' ? 'Sí' : 'No'}</Text>
        <Text style={styles.label}>Observaciones</Text>
        <Text style={styles.textarea}>{formData.observaciones.kitInvierno}</Text>
      </View>

      {/* Tarjeta 15: Extintor */}
      <View style={styles.card}>
        <Text style={styles.label}>El Extintor ¿Se encuentra en operativo?</Text>
        <Text style={styles.input}>{formData.extintor === 'si' ? 'Sí' : 'No'}</Text>
        <Text style={styles.label}>Observaciones</Text>
        <Text style={styles.textarea}>{formData.observaciones.extintor}</Text>
      </View>

      {/* Tarjeta 16: Volante */}
      <View style={styles.card}>
        <Text style={styles.label}>¿Cuenta con el “volante” para la manipulación de tambores?</Text>
        <Text style={styles.input}>{formData.volante === 'si' ? 'Sí' : 'No'}</Text>
        <Text style={styles.label}>Observaciones</Text>
        <Text style={styles.textarea}>{formData.observaciones.volante}</Text>
      </View>

      {/* Tarjeta 17: GPS */}
      <View style={styles.card}>
        <Text style={styles.label}>GPS ¿Se encuentra operativo?</Text>
        <Text style={styles.input}>{formData.gps === 'si' ? 'Sí' : 'No'}</Text>
        <Text style={styles.label}>Observaciones</Text>
        <Text style={styles.textarea}>{formData.observaciones.gps}</Text>
      </View>

      {/* Tarjeta 18: RCO */}
      <View style={styles.card}>
        <Text style={styles.label}>Se encuentra conectado a la aplicación RCO</Text>
        <Text style={styles.input}>{formData.rco === 'si' ? 'Sí' : 'No'}</Text>
        <Text style={styles.label}>Observaciones</Text>
        <Text style={styles.textarea}>{formData.observaciones.rco}</Text>
      </View>

      {/* Tarjeta 19: Traba Tuercas */}
      <View style={styles.card}>
        <Text style={styles.label}>Su camión cuenta con traba tuercas</Text>
        <Text style={styles.input}>{formData.trabaTuercas === 'si' ? 'Sí' : 'No'}</Text>
        <Text style={styles.label}>Observaciones</Text>
        <Text style={styles.textarea}>{formData.observaciones.trabaTuercas}</Text>
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

      <Button
        title="Volver"
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </ScrollView>
  );
};

export default EquipmentChecklistScreen;