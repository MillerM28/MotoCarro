import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import HeaderRight from '../components/HeaderRight';
import NotificacionesScreen from '../screens/Common/NotificacionesScreen';
import EstadoMotocarroScreen from '../screens/Conductor/EstadoMotocarroScreen';
import ReportesScreen from '../screens/Conductor/ReportesScreen';
import RutaDelDiaScreen from '../screens/Conductor/RutaDelDiaScreen';
import ViajesDisponiblesScreen from '../screens/Conductor/ViajesDisponiblesScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ConductorTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF9800',
        tabBarInactiveTintColor: '#888',
        headerStyle: {
          backgroundColor: '#FF9800',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Viajes"
        component={ViajesDisponiblesScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🚦</Text>,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Tab.Screen
        name="Estado"
        component={EstadoMotocarroScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>⚙️</Text>,
        }}
      />
      <Tab.Screen
        name="Ruta"
        component={RutaDelDiaScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🗺️</Text>,
        }}
      />
      <Tab.Screen
        name="Reportes"
        component={ReportesScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📋</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

export default function ConductorNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ConductorTabs" component={ConductorTabs} />
      <Stack.Screen
        name="Notificaciones"
        component={NotificacionesScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}