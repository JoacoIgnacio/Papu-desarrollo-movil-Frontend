import React from 'react'; // Add this line
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import { HomeScreen } from '../screens/Common/HomeScreen';
import InitialScreen from '../screens/InitialScreen';
import { DriverForm } from '../screens/Common/DriverChecklistScreen';
import { EquipmentForm } from '../screens/Common/EquipmentChecklistScreen';
import InspectionForm from '../screens/Common/InspectionChecklistScreen';

export type RootStackParamList = {
  Initial: undefined;
  Login: undefined;
  Home: undefined;
  Driver: undefined;
  Equipment: undefined;
  Inspection: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Initial">
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Initial" component={InitialScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Driver" component={DriverForm} />
          <Stack.Screen name="Equipment" component={EquipmentForm} />
          <Stack.Screen name="Inspection" component={InspectionForm} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigation;
