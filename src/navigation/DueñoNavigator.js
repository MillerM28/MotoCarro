import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text } from 'react-native';
import HeaderRight from '../components/HeaderRight';
import NotificacionesScreen from '../screens/Common/NotificacionesScreen';
import EstadisticasScreen from '../screens/Dueño/EstadisticasScreen';
import GestionarConductoresScreen from '../screens/Dueño/GestionarConductoresScreen';
import GestionarMotocarrosScreen from '../screens/Dueño/GestionarMotocarrosScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function DueñoTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#888',
        headerStyle: {
          backgroundColor: '#2196F3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen
        name="Conductores"
        component={GestionarConductoresScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>👥</Text>,
          headerRight: () => <HeaderRight />,
        }}
      />
      <Tab.Screen
        name="Motocarros"
        component={GestionarMotocarrosScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🛺</Text>,
        }}
      />
      <Tab.Screen
        name="Estadísticas"
        component={EstadisticasScreen}
        options={{
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📊</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

export default function DueñoNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DueñoTabs" component={DueñoTabs} />
      <Stack.Screen
        name="Notificaciones"
        component={NotificacionesScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}