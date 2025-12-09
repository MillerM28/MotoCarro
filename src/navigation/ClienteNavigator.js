import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import HeaderRight from '../components/HeaderRight';
import CalificacionScreen from '../screens/Cliente/CalificacionScreen';
import MotocarrosDisponiblesScreen from '../screens/Cliente/MotocarrosDisponiblesScreen';
import PagoScreen from '../screens/Cliente/PagoScreen';
import PerfilScreen from '../screens/Cliente/PerfilScreen';
import SeguimientoScreen from '../screens/Cliente/SeguimientoScreen';
import SolicitarServicioScreen from '../screens/Cliente/SolicitarServicioScreen';
import NotificacionesScreen from '../screens/Common/NotificacionesScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ClienteTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#888',
        headerStyle: {
          backgroundColor: '#4CAF50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Solicitar"
        component={SolicitarServicioScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🚀</Text>,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Tab.Screen
        name="Disponibles"
        component={MotocarrosDisponiblesScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🛺</Text>,
        }}
      />
      <Tab.Screen
        name="Seguimiento"
        component={SeguimientoScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📍</Text>,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

export default function ClienteNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ClienteTabs" component={ClienteTabs} />
      <Stack.Screen
        name="Notificaciones"
        component={NotificacionesScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name="Pago"
        component={PagoScreen}
        options={{
          presentation: 'card',
          headerShown: true,
          headerTitle: 'Pagar Viaje',
          headerStyle: { backgroundColor: '#4CAF50' },
          headerTintColor: '#fff'
        }}
      />
      <Stack.Screen
        name="Calificacion"
        component={CalificacionScreen}
        options={{
          presentation: 'card',
          headerShown: true,
          headerTitle: 'Calificar',
          headerStyle: { backgroundColor: '#4CAF50' },
          headerTintColor: '#fff',
          headerLeft: () => null
        }}
      />
    </Stack.Navigator>
  );
}