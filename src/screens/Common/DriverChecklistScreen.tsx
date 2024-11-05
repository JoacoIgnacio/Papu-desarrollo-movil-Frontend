import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Button } from 'react-native';
import { RootStackParamList } from '../../navigation/rootStackNavigation';
import { styles } from './DriverChecklistScreen.styles';

export const DriverForm = ({ route,navigation }: NativeStackScreenProps<RootStackParamList, 'Driver'>) => {
  const [formData, setFormData] = useState({
    nombre: '',
    fecha: '',
    patente: '',
    sistemaLuces: '',
    observaciones: { sistemaLuces: '' },
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
    // Lógica para enviar los datos del formulario
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Check List "Conductores” Comercializadora Ltda.</Text>

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

      <Text style={styles.sectionTitle}>Fatiga y Somnolencia</Text>

      <View style={styles.row}>
        <Text style={styles.label}>¿Ha dormido menos de 6 hrs en las últimas 24 hrs?</Text>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => handleInputChange('horasSueño', 'si')}>
            <Text style={styles.checkboxText}>Sí</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleInputChange('horasSueño', 'no')}>
            <Text style={styles.checkboxText}>No</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.textarea}
          placeholder="Observaciones"
          onChangeText={(text) => handleInputChange('observaciones_horasSueño', text)}
        />
      </View>

      <Button
          title="Enviar"
          onPress={() => navigation.navigate('Home')}
        />
    </ScrollView>
  );
};

export default DriverForm;
