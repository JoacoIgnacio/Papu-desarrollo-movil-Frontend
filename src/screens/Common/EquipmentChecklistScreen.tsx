import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Button } from 'react-native';
import { styles } from './EquipmentChecklistScreen.styles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/rootStackNavigation';

export const EquipmentForm = ({ route,navigation }: NativeStackScreenProps<RootStackParamList, 'Equipment'>) => {
  const [formData, setFormData] = useState({
    nombre: '',
    fecha: '',
    patente: '',
    kilometraje: '',
    sistemaLuces: '',
    neumaticos: '',
    parabrisas: '',
    carroceria: '',
    niveles: '',
    documentacion: '',
    botiquin: '',
    derrameKit: '',
    emergenciaKit: '',
    inviernoKit: '',
    extintor: '',
    observaciones: {
      sistemaLuces: '',
      neumaticos: '',
      parabrisas: '',
      carroceria: '',
      niveles: '',
      documentacion: '',
      botiquin: '',
      derrameKit: '',
      emergenciaKit: '',
      inviernoKit: '',
      extintor: '',
    }
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

  const handleSubmit = () => {
    console.log(formData);
    // Aquí manejarías el envío del formulario
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Check List “Equipos” Comercializadora Ltda.</Text>

<View style={styles.row}>
  <Text style={styles.label}>Nombre</Text>
  <TextInput
    style={styles.input}
    placeholder="Nombre"
    value={formData.nombre}
    onChangeText={(text) => handleInputChange('nombre', text)}
  />
</View>

<View style={styles.row}>
  <Text style={styles.label}>Fecha</Text>
  <TextInput
    style={styles.input}
    placeholder="Fecha (YYYY-MM-DD)"
    value={formData.fecha}
    onChangeText={(text) => handleInputChange('fecha', text)}
  />
</View>

<View style={styles.row}>
  <Text style={styles.label}>Patente</Text>
  <TextInput
    style={styles.input}
    placeholder="Patente del vehículo"
    value={formData.patente}
    onChangeText={(text) => handleInputChange('patente', text)}
  />
</View>

<View style={styles.row}>
  <Text style={styles.label}>Kilometraje</Text>
  <TextInput
    style={styles.input}
    placeholder="Kilometraje del vehículo"
    value={formData.kilometraje}
    onChangeText={(text) => handleInputChange('kilometraje', text)}
  />
</View>

<Text style={styles.sectionTitle}>Estado General</Text>

{/* Reutilizar el patrón para cada campo del formulario */}
{[
  { label: 'Sistema de Luces', name: 'sistemaLuces' },
  { label: 'Neumáticos', name: 'neumaticos' },
  { label: 'Parabrisas', name: 'parabrisas' },
  { label: 'Carrocería', name: 'carroceria' },
  { label: 'Niveles', name: 'niveles' },
  { label: 'Documentación', name: 'documentacion' },
  { label: 'Botiquín', name: 'botiquin' },
  { label: 'Kit de Derrame', name: 'derrameKit' },
  { label: 'Kit de Emergencia', name: 'emergenciaKit' },
  { label: 'Kit de Invierno', name: 'inviernoKit' },
  { label: 'Extintor', name: 'extintor' },
].map((item) => (
  <View key={item.name} style={styles.row}>
    <Text style={styles.label}>{item.label}</Text>
    <View style={styles.checkboxContainer}>
      <TouchableOpacity onPress={() => handleInputChange(item.name, 'si')}>
        <Text style={styles.checkboxText}>Sí</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleInputChange(item.name, 'no')}>
        <Text style={styles.checkboxText}>No</Text>
      </TouchableOpacity>
    </View>
    <TextInput
      style={styles.textarea}
      placeholder="Observaciones"
      //Colocar logica de salida
      onChangeText={(text) => handleInputChange(`observaciones_${item.name}`, text)}
    />
  </View>
))}
        <Button
          title="Enviar"
          onPress={() => navigation.navigate('Home')}
        />
    </ScrollView>
  );
};

export default EquipmentForm;