import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function SeguimientoScreen() {
  const { viajeActual, cancelarViaje } = useAuth();

  // Helper para evitar undefined
  const safeText = (text, fallback = '---') => {
    return text ? text : fallback;
  };

  const getEstadoInfo = () => {
    if (!viajeActual) return {};

    switch (viajeActual?.status) {
      case 'buscando':
        return {
          titulo: 'Buscando conductor...',
          subtitulo: 'Estamos contactando motocarros cercanos',
          icono: '🔍',
          color: '#FFC107' // Amber
        };
      case 'aceptado':
        return {
          titulo: '¡Conductor en camino!',
          // Usamos viajeActual.tiempoLlegada que definimos en el context
          subtitulo: `${safeText(viajeActual.tiempoLlegada, '5 min')} para llegar`,
          icono: '🚗',
          color: '#2196F3' // Blue
        };
      case 'en_curso':
        return {
          titulo: 'Viaje en curso',
          subtitulo: 'Vas rumbo a tu destino',
          icono: '📍',
          color: '#4CAF50' // Green
        };
      default:
        return {
          titulo: 'Estado desconocido',
          subtitulo: 'Espera un momento...',
          icono: '❓',
          color: '#9E9E9E'
        };
    }
  };

  const handleContactar = () => {
    Alert.alert('Contactar Conductor', 'Llamando al conductor...', [{ text: 'OK' }]);
  };

  const handleCancelar = () => {
    Alert.alert(
      'Cancelar Viaje',
      '¿Estás seguro de que deseas cancelar?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí, cancelar',
          style: 'destructive',
          onPress: () => {
            cancelarViaje();
            Alert.alert('Viaje Cancelado', 'Has cancelado la solicitud.');
          }
        }
      ]
    );
  };

  const estadoInfo = getEstadoInfo();

  if (!viajeActual) {
    return (
      <View style={styles.noViajeContainer}>
        <Text style={styles.noViajeIcon}>🛺</Text>
        <Text style={styles.noViajeTitle}>Sin viajes activos</Text>
        <Text style={styles.noViajeText}>
          Ve a "Solicitar" para pedir un nuevo servicio.
        </Text>
      </View>
    );
  }

  // Debug (puedes borrar esto luego)
  // console.log('Renderizando Seguimiento:', viajeActual);

  return (
    <ScrollView style={styles.container}>
      {/* Mapa simulado */}
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapIcon}>🗺️</Text>
        <Text style={styles.mapText}>Mapa en tiempo real</Text>
        <Text style={styles.mapSubtext}>(Requiere React Native Maps)</Text>
      </View>

      {/* Estado del viaje */}
      <View style={[styles.statusCard, { borderLeftColor: estadoInfo.color || '#ccc' }]}>
        <View style={styles.statusHeader}>
          <Text style={styles.statusIcon}>{estadoInfo.icono}</Text>
          <View style={styles.statusInfo}>
            <Text style={styles.statusTitle}>{estadoInfo.titulo}</Text>
            <Text style={styles.statusSubtitle}>{estadoInfo.subtitulo}</Text>
          </View>
        </View>
      </View>

      {/* Información del conductor (Solo si ha sido aceptado y existe conductor) */}
      {viajeActual.conductor ? (
        <View style={styles.driverCard}>
          <View style={styles.driverHeader}>
            <View>
              <Text style={styles.driverName}>{safeText(viajeActual.conductor.nombre, 'Conductor')}</Text>
              <Text style={styles.driverPlate}>🛺 {safeText(viajeActual.conductor.placa)}</Text>
            </View>
            <View style={styles.rating}>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.ratingValue}>{safeText(viajeActual.conductor.calificacion, '5.0')}</Text>
            </View>
          </View>

          <View style={styles.driverInfo}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Modelo</Text>
              <Text style={styles.infoValue}>{safeText(viajeActual.conductor.modelo)}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Teléfono</Text>
              <Text style={styles.infoValue}>{safeText(viajeActual.conductor.telefono)}</Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.driverCard}>
          <Text style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
            Esperando asignación de conductor...
          </Text>
        </View>
      )}

      {/* Detalles del viaje */}
      <View style={styles.tripDetails}>
        <Text style={styles.sectionTitle}>Detalles del viaje</Text>

        <View style={styles.locationItem}>
          <Text style={styles.locationIcon}>📍</Text>
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>Origen</Text>
            <Text style={styles.locationValue}>{safeText(viajeActual.origen)}</Text>
          </View>
        </View>

        <View style={styles.locationDivider} />

        <View style={styles.locationItem}>
          <Text style={styles.locationIcon}>🎯</Text>
          <View style={styles.locationInfo}>
            <Text style={styles.locationLabel}>Destino</Text>
            <Text style={styles.locationValue}>{safeText(viajeActual.destino)}</Text>
          </View>
        </View>
      </View>

      {/* Botones de acción */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.contactButton} onPress={handleContactar}>
          <Text style={styles.contactButtonText}>📞 Contactar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelar}>
          <Text style={styles.cancelButtonText}>Cancelar viaje</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  noViajeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
  },
  noViajeIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  noViajeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  noViajeText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  mapPlaceholder: {
    height: 300,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapIcon: {
    fontSize: 60,
    marginBottom: 10,
  },
  mapText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  mapSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  statusCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  statusInfo: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  driverCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  driverHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  driverName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  driverPlate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 20,
    marginRight: 5,
  },
  ratingValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  driverInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  tripDetails: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  locationIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  locationInfo: {
    flex: 1,
  },
  locationLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  locationValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  locationDivider: {
    height: 20,
    width: 2,
    backgroundColor: '#e0e0e0',
    marginLeft: 12,
    marginVertical: 10,
  },
  actions: {
    padding: 15,
    paddingBottom: 30,
  },
  contactButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginBottom: 10,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f44336',
  },
  cancelButtonText: {
    color: '#f44336',
    fontSize: 16,
    fontWeight: '600',
  },
});