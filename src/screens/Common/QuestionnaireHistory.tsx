import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/rootStackNavigation';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from './QuestionnaireHistory.styles';

export const QuestionnaireHistory = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'QuestionnaireHistory'>) => {
  // Datos de ejemplo para mostrar cuestionarios
  const sampleHistory = [
    { id: '1', title: 'Cuestionario Conductor', date: '2024-11-01' },
    { id: '2', title: 'Cuestionario Equipamiento', date: '2024-11-02' },
    { id: '3', title: 'Cuestionario Inspección', date: '2024-11-03' },
  ];

  const handleSelectQuestionnaire = (questionnaireId: string) => {
    // Por ahora, simplemente muestra un alert en lugar de navegar a los detalles
    alert(`Seleccionaste el cuestionario con ID: ${questionnaireId}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Historial de Cuestionarios</Text>

      {sampleHistory.length > 0 ? (
        sampleHistory.map((questionnaire, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.card} 
            onPress={() => handleSelectQuestionnaire(questionnaire.id)}
          >
            <Text style={styles.questionnaireTitle}>{questionnaire.title}</Text>
            <Text style={styles.questionnaireDate}>{questionnaire.date}</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noHistoryText}>No hay cuestionarios realizados.</Text>
      )}
    </ScrollView>
  );
};

export default QuestionnaireHistory;
