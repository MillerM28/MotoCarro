import { useState } from 'react';
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function MotocarrosDisponiblesScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [motocarros, setMotocarros] = useState([
    {
      id: '1',
      placa: 'ABC-123',
      conductor: 'Juan Pérez',
      distancia: '0.5 km',
      calificacion: 4.8,
      tiempoLlegada: '3 min',
      disponible: true
    },
    {
      id: '2',
      placa: 'DEF-456',
      conductor: 'María García',
      distancia: '1.2 km',
      calificacion: 4.9,
      tiempoLlegada: '5 min',
      disponible: true
    },
    {
      id: '3',
      placa: 'GHI-789',
      conductor: 'Carlos López',
      distancia: '2.0 km',
      calificacion: 4.7,
      tiempoLlegada: '8 min',
      disponible: true
    },
    {
      id: '4',
      placa: 'JKL-012',
      conductor: 'Ana Martínez',
      distancia: '0.8 km',
      calificacion: 5.0,
      tiempoLlegada: '4 min',
      disponible: true
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    // Aquí iría la lógica para recargar los datos
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderMotocarro = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.placa}>🛺 {item.placa}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Disponible</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Conductor:</Text>
          <Text style={styles.value}>{item.conductor}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Distancia:</Text>
          <Text style={styles.value}>{item.distancia}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Tiempo llegada:</Text>
          <Text style={styles.valueHighlight}>{item.tiempoLlegada}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Calificación:</Text>
          <View style={styles.rating}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.ratingValue}>{item.calificacion}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.selectButton}>
        <Text style={styles.selectButtonText}>Seleccionar este motocarro</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Motocarros Disponibles</Text>
        <Text style={styles.subtitle}>{motocarros.length} motocarros cerca de ti</Text>
      </View>

      <FlatList
        data={motocarros}
        renderItem={renderMotocarro}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4CAF50']}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  list: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  placa: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  badge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  valueHighlight: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 16,
    marginRight: 5,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  selectButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});