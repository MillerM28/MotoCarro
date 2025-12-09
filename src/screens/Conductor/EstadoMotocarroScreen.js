import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function EstadoMotocarroScreen() {
  const [disponible, setDisponible] = useState(true);
  const [motocarro] = useState({
    placa: 'ABC-123',
    modelo: 'Bajaj RE',
    año: '2022',
    estado: 'Excelente'
  });

  const toggleDisponibilidad = () => {
    setDisponible(!disponible);
    Alert.alert(
      'Estado actualizado',
      disponible 
        ? 'Ahora estás NO DISPONIBLE. No recibirás nuevos viajes.' 
        : 'Ahora estás DISPONIBLE. Comenzarás a recibir solicitudes.',
      [{ text: 'OK' }]
    );
  };

  const handleMantenimiento = () => {
    Alert.alert('Mantenimiento', 'Funcionalidad en desarrollo');
  };

  const handleDocumentos = () => {
    Alert.alert('Documentos', 'Funcionalidad en desarrollo');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Estado de disponibilidad */}
      <View style={[
        styles.statusCard,
        { backgroundColor: disponible ? '#E8F5E9' : '#FFEBEE' }
      ]}>
        <View style={styles.statusHeader}>
          <Text style={styles.statusIcon}>{disponible ? '✅' : '⏸️'}</Text>
          <View style={styles.statusInfo}>
            <Text style={styles.statusTitle}>
              {disponible ? 'Disponible para Viajes' : 'No Disponible'}
            </Text>
            <Text style={styles.statusSubtitle}>
              {disponible 
                ? 'Puedes recibir solicitudes de viaje'
                : 'No recibirás nuevas solicitudes'
              }
            </Text>
          </View>
        </View>
        
        <Switch
          value={disponible}
          onValueChange={toggleDisponibilidad}
          trackColor={{ false: '#ccc', true: '#81C784' }}
          thumbColor={disponible ? '#4CAF50' : '#f4f3f4'}
          style={styles.switch}
        />
      </View>

      {/* Información del motocarro */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mi Motocarro</Text>
        
        <View style={styles.motocarroCard}>
          <View style={styles.motocarroHeader}>
            <Text style={styles.motocarroIcon}>🛺</Text>
            <View style={styles.motocarroInfo}>
              <Text style={styles.motocarroPlaca}>{motocarro.placa}</Text>
              <Text style={styles.motocarroModelo}>
                {motocarro.modelo} - {motocarro.año}
              </Text>
            </View>
            <View style={styles.estadoBadge}>
              <Text style={styles.estadoBadgeText}>{motocarro.estado}</Text>
            </View>
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Viajes Hoy</Text>
              <Text style={styles.infoValue}>12</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Ganancias Hoy</Text>
              <Text style={styles.infoValue}>$85.000</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Combustible</Text>
              <Text style={styles.infoValue}>75%</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Km Recorridos</Text>
              <Text style={styles.infoValue}>48 km</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Métricas del día */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Métricas del Día</Text>
        
        <View style={styles.metricsCard}>
          <View style={styles.metricItem}>
            <View style={styles.metricIconContainer}>
              <Text style={styles.metricIcon}>⏱️</Text>
            </View>
            <View style={styles.metricInfo}>
              <Text style={styles.metricLabel}>Tiempo Activo</Text>
              <Text style={styles.metricValue}>5h 30min</Text>
            </View>
          </View>

          <View style={styles.metricItem}>
            <View style={styles.metricIconContainer}>
              <Text style={styles.metricIcon}>⭐</Text>
            </View>
            <View style={styles.metricInfo}>
              <Text style={styles.metricLabel}>Calificación Promedio</Text>
              <Text style={styles.metricValue}>4.9</Text>
            </View>
          </View>

          <View style={styles.metricItem}>
            <View style={styles.metricIconContainer}>
              <Text style={styles.metricIcon}>✅</Text>
            </View>
            <View style={styles.metricInfo}>
              <Text style={styles.metricLabel}>Viajes Completados</Text>
              <Text style={styles.metricValue}>12 / 15</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Acciones rápidas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        
        <TouchableOpacity style={styles.actionButton} onPress={handleMantenimiento}>
          <Text style={styles.actionIcon}>🔧</Text>
          <View style={styles.actionInfo}>
            <Text style={styles.actionTitle}>Mantenimiento</Text>
            <Text style={styles.actionSubtitle}>Próximo en 500 km</Text>
          </View>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleDocumentos}>
          <Text style={styles.actionIcon}>📄</Text>
          <View style={styles.actionInfo}>
            <Text style={styles.actionTitle}>Documentos</Text>
            <Text style={styles.actionSubtitle}>SOAT vence en 45 días</Text>
          </View>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>⛽</Text>
          <View style={styles.actionInfo}>
            <Text style={styles.actionTitle}>Registrar Combustible</Text>
            <Text style={styles.actionSubtitle}>Última carga hace 2 días</Text>
          </View>
          <Text style={styles.actionArrow}>›</Text>
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
  statusCard: {
    margin: 15,
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 15,
    marginBottom: 10,
  },
  motocarroCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  motocarroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  motocarroIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  motocarroInfo: {
    flex: 1,
  },
  motocarroPlaca: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  motocarroModelo: {
    fontSize: 14,
    color: '#666',
    marginTop: 3,
  },
  estadoBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  estadoBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoItem: {
    width: '50%',
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  metricsCard: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  metricIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  metricIcon: {
    fontSize: 24,
  },
  metricInfo: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionIcon: {
    fontSize: 30,
    marginRight: 15,
    width: 40,
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
  actionArrow: {
    fontSize: 30,
    color: '#ccc',
  },
});