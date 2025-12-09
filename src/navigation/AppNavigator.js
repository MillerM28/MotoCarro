import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import ClienteNavigator from './ClienteNavigator';
import ConductorNavigator from './ConductorNavigator';
import DueñoNavigator from './DueñoNavigator';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : user.rol === 'cliente' ? (
        <Stack.Screen name="ClienteMain" component={ClienteNavigator} />
      ) : user.rol === 'conductor' ? (
        <Stack.Screen name="ConductorMain" component={ConductorNavigator} />
      ) : (
        <Stack.Screen name="DueñoMain" component={DueñoNavigator} />
      )}

    </Stack.Navigator>
  );
}