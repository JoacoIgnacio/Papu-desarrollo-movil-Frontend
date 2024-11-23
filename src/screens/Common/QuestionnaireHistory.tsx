import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/rootStackNavigation';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { styles } from './QuestionnaireHistory.styles';
import { config } from 'dotenv';
import axios from 'axios';
import { getUserId } from '../../services/authStorage';

export const QuestionnaireHistory = ({ navigation }: NativeStackScreenProps<RootStackParamList, 'QuestionnaireHistory'>) => {
  const [history, setHistory] = useState<{ id: string; title: string; date: string; }[]>([]);


  useEffect(() => {
    // Función para obtener los datos del endpoint
    const fetchData = async () => {
      const userId = await getUserId('userId');
      
      try {
        
        
        const response = await axios.get(`http://${process.env.IP}:3001/answers/${userId}/questionnaires`);
        const data = response.data;

        // Mapea los datos recibidos al formato necesario
        const formattedData = data.map((item: { questionnaire: { _id: string; title: string; }; date: string; }) => ({
          id: item.questionnaire._id,
          title: item.questionnaire.title,
          date: item.date
        }));

        setHistory(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    

    fetchData();
  }, []);
  const handleSelectQuestionnaire = (id: string, date:string) => {

    if(id === '6736bffaa13eade062a1d230'){
      navigation.navigate('DriverHistory', { id, date });
    }else if (id === '6736de612b80aa3d639437b7'){
      navigation.navigate('EquipmentHistory', { id, date });
    }else if (id === '6736e5322861c9b6a29d4925'){
      navigation.navigate('InspectionHistory', { id, date });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Historial de Cuestionarios</Text>

      {history.length > 0 ? (
        history.map((questionnaire, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.card} 
            onPress={() => handleSelectQuestionnaire(questionnaire.id,questionnaire.date  )}
          >
            <Text style={styles.questionnaireTitle}>{questionnaire.title}</Text>
            <Text style={styles.questionnaireDate}>
              {
                questionnaire.date.split('T')[0] + " " + 
                questionnaire.date.split('T')[1].split(':')[0] + ":" +
                questionnaire.date.split('T')[1].split(':')[1] 
            }
            </Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noHistoryText}>No hay cuestionarios realizados.</Text>
      )}
    </ScrollView>
  );
};


export default QuestionnaireHistory;
