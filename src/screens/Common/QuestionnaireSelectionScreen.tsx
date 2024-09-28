import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Text } from '@rneui/themed';
import { View } from 'react-native';
import { RootStackParamList } from '../../navigation/rootStackNavigation';
import { styles } from './QuestionnaireSelectionScreen.styles';

const QuestionnaireSelectionScreen = ({ navigation }: NativeStackScreenProps<RootStackParamList>) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seleccione el Tipo de Cuestionario</Text>
      
      {/* Botón para cuestionario de Equipos */}
      <Button
        title="Equipos"
        onPress={() => navigation.navigate('EquipmentChecklist')}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />

      {/* Botón para cuestionario de Conductores */}
      <Button
        title="Conductores"
        onPress={() => navigation.navigate('DriverChecklist')}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />

      {/* Botón para cuestionario de Inspección de Equipos */}
      <Button
        title="Inspección de Equipos"
        onPress={() => navigation.navigate('InspectionChecklist')}
        buttonStyle={styles.button}
        titleStyle={styles.buttonText}
      />
    </View>
  );
};

export default QuestionnaireSelectionScreen;
