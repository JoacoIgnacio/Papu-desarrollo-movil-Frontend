import React from 'react'; // Add this line
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import { HomeScreen } from '../screens/Common/HomeScreen';
import InitialScreen from '../screens/InitialScreen';
import { DriverForm } from '../screens/Common/DriverChecklistScreen';
import { EquipmentForm } from '../screens/Common/EquipmentChecklistScreen';
import InspectionForm from '../screens/Common/InspectionChecklistScreen';
import { QuestionnaireHistory } from '../screens/Common/QuestionnaireHistory';
import Driver from '../screens/HistoryScreens/DriverChecklistHistory';
import Equipment from '../screens/HistoryScreens/EquipmentChecklistHistory';
import Inspection from '../screens/HistoryScreens/InspectionChecklistHistory';
import RegisterScreen from '../screens/Auth/RegisterScreen';


export type RootStackParamList = {
  Initial: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Driver: undefined;
  Equipment: undefined;
  Inspection: undefined;
  QuestionnaireHistory: undefined;
  DriverHistory: { id: string,date: string };
  EquipmentHistory: { id: string,date: string };
  InspectionHistory: { id: string,date: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Initial">
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Initial" component={InitialScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="QuestionnaireHistory" component={QuestionnaireHistory} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Driver" component={DriverForm} />
          <Stack.Screen name="Equipment" component={EquipmentForm} />
          <Stack.Screen name="Inspection" component={InspectionForm} />
          <Stack.Screen name="DriverHistory" component={Driver} />
          <Stack.Screen name="EquipmentHistory" component={Equipment} />
          <Stack.Screen name="InspectionHistory" component={Inspection} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigation;
