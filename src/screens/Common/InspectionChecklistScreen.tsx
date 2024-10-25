import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './InspectionChecklistScreen.styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/rootStackNavigation';

export const InspectionForm = ({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Inspection'>) => {
  const [formData, setFormData] = useState({
    nombre: '',
    fecha: '',
    patente: '',
    kilometraje: '',
    // otros campos
    observaciones: {},
  });

  const handleInputChange = (name: string, value: string) => {
    if (name.startsWith('observaciones')) {
      const key = name.split('_')[1];
      setFormData({
        ...formData,
        observaciones: { ...formData.observaciones, [key]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  // Lista de campos con su estructura de nombre y etiquetas
  const sections = [
    { title: 'Información del Vehículo', fields: [
      { label: 'Nombre', name: 'nombre', type: 'text', placeholder: 'Nombre' },
      { label: 'Fecha', name: 'fecha', type: 'text', placeholder: 'Fecha (YYYY-MM-DD)' },
      { label: 'Patente', name: 'patente', type: 'text', placeholder: 'Patente del vehículo' },
      { label: 'Kilometraje', name: 'kilometraje', type: 'number', placeholder: 'Kilometraje' },
    ]},
    { title: 'Documentación Camión/Conductor', fields: [
      { label: 'Permiso de circulación al día', name: 'circulacion' },
      { label: 'Seguro obligatorio', name: 'seguro' },
      { label: 'Revisión Técnica', name: 'revision' },
      { label: 'Licencia de conducir', name: 'licencia' },
      { label: 'Curso transporte de sustancias peligrosas', name: 'cursoTransporte' },
    ]},
    { title: 'Kit Derrame', fields: [
      { label: '¿El camión posee Pala?', name: 'pala' },
      { label: '¿El camión posee Material Absorbente?', name: 'absorbente' },
      { label: '¿El camión posee Cubeta?', name: 'cubeta' },
      { label: '¿El camión posee Escoba?', name: 'escoba' },
      { label: '¿El camión posee Bolsas?', name: 'bolsas' },
    ]},
    { title: 'Kit Invierno', fields: [
      { label: '¿El camión posee Cadenas?', name: 'cadenas' },
      { label: '¿El camión posee Mantas?', name: 'mantas' },
      { label: '¿El camión posee Herramientas básicas?', name: 'herramientas' },
    ]},
    { title: 'Kit Emergencia', fields: [
      { label: '¿El camión posee Triángulo Reflectante?', name: 'triangulo' },
      { label: '¿El camión posee Gata Hidráulica?', name: 'gata' },
      { label: '¿El camión posee Neumático de Repuesto?', name: 'neumatico' },
      { label: '¿El camión posee Llaves de Rueda?', name: 'llaves' },
      { label: '¿El camión posee Barra de Llave de Ruedas?', name: 'barrallave' },
    ]},
    { title: 'Kit Sueño', fields: [
      { label: '¿Cuenta con Antifaz?', name: 'antifaz' },
      { label: '¿Cuenta con Mantas?', name: 'mantas_sueño' },
    ]},
    { title: 'Accesorios', fields: [
      { label: 'Extintor PQS 1 KG', name: 'PQS1' },
      { label: 'Extintor PQS 2 KG', name: 'PQS2' },
      { label: '¿Cuenta con porta extintor?', name: 'portaExtintor' },
      { label: '¿Cuenta con Botiquín de Primeros Auxilios?', name: 'botiquin' },
      { label: '¿Cuenta con Linterna?', name: 'linterna' },
    ]},
    { title: 'Condiciones del Vehículo', fields: [
      { label: '¿La Alarma de Retroceso funciona?', name: 'alarma' },
      { label: '¿Las luces están operativas?', name: 'sistemaLuces' },
      { label: '¿Las plumillas están en buen estado?', name: 'plumillas' },
      { label: '¿El cinturón de seguridad está en buen estado?', name: 'cinturon' },
    ]},
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Check List “Mensual Equipos” Comercializadora Ltda.</Text>

      {sections.map((section) => (
        <View key={section.title}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.fields.map((field) => (
            <View key={field.name} style={styles.row}>
              <Text style={styles.label}>{field.label}</Text>
               (
                <TextInput
                  style={styles.input}

                  onChangeText={(text) => handleInputChange(field.name, text)}
                />
              ) : (
                <View>
                  <View style={styles.checkboxContainer}>
                    <TouchableOpacity onPress={() => handleInputChange(field.name, 'si')}>
                      <Text style={styles.checkboxText}>Sí</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleInputChange(field.name, 'no')}>
                      <Text style={styles.checkboxText}>No</Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    style={styles.textarea}
                    placeholder="Observaciones"
                    
                    onChangeText={(text) => handleInputChange(`observaciones_${field.name}`, text)}
                  />
                </View>
              )
            </View>
          ))}
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default InspectionForm;
