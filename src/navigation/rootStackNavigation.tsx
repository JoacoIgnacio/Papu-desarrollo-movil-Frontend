import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import HomeScreen from '../screens/Common/HomeScreen';
import InitialScreen from '../screens/InitialScreen';
import QuestionnaireSelectionScreen from '../screens/Common/QuestionnaireSelectionScreen';  
import EquipmentChecklistScreen from '../screens/Checklists/EquipmentChecklistScreen';  
import DriverChecklistScreen from '../screens/Checklists/DriverChecklistScreen';  
import InspectionChecklistScreen from '../screens/Checklists/InspectionChecklistScreen';  

export type RootStackParamList = {
  Initial: Record<string, string> | undefined;
  Login: Record<string, string> | undefined;
  Home: Record<string, string> | undefined;
  QuestionnaireSelection: Record<string, string> | undefined;
  EquipmentChecklist: Record<string, string> | undefined;
  DriverChecklist: Record<string, string> | undefined;
  InspectionChecklist: Record<string, string> | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Initial">
        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Initial" component={InitialScreen} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="QuestionnaireSelection" component={QuestionnaireSelectionScreen} />
          <Stack.Screen name="EquipmentChecklist" component={EquipmentChecklistScreen} />
          <Stack.Screen name="DriverChecklist" component={DriverChecklistScreen} />
            <Stack.Screen name="InspectionChecklist" component={InspectionChecklistScreen} />
          
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigation;
