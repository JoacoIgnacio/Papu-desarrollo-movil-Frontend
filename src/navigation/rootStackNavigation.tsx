import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/Auth/LoginScreen';
import { HomeScreen } from '../screens/Common/HomeScreen';
import InitialScreen from '../screens/InitialScreen';
import { DriverForm } from '../screens/Common/DriverChecklistScreen';
import { EquipmentForm } from '../screens/Common/EquipmentChecklistScreen';
import { InspectionForm } from '../screens/Common/InspectionChecklistScreen';


export type RootStackParamList = {
  Initial: Record<string, string> | undefined;
  Login: Record<string, string> | undefined;
  Home: Record<string, string> | undefined;
  Driver: Record<string, string> | undefined;
  Equipment: Record<string, string> | undefined;
  Inspection: Record<string, string> | undefined;
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
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Driver" component={DriverForm} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Equipment" component={EquipmentForm} />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Inspection" component={InspectionForm} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigation;
