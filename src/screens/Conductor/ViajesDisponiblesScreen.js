import { useState } from 'react';
import { Alert, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useViajes } from '../../context/ViajesContext';

export default function ViajesDisponiblesScreen() {
  const { viajesDisponibles, viajesAceptados, aceptarViaje } = useViajes();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Simular actualización
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleAceptar = (viaje) => {
    Alert.alert(
      'Aceptar Viaje',
      `¿Deseas aceptar el viaje a ${viaje.destino}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Aceptar',
          onPress: () => {
            const result = aceptarViaje(viaje.id);
            if (result.success) {
              Alert.alert('¡Éxito!', 'Has aceptado el viaje');
            } else {
              Alert.alert('Error', result.message);
            }
          }
        }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.tipo}>{item.tipo}</Text>
          <Text style={styles.cliente}>Cliente: {item.cliente}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.precioEstimado.toLocaleString()}</Text>
          <Text style={styles.distancia}>{item.distancia} km</Text>
        </View>
      </View>

      <View style={styles.routeContainer}>
        <View style={styles.routeItem}>
          <Text style={styles.routeIcon}>📍</Text>
          <View style={styles.routeInfo}>
            <Text style={styles.routeLabel}>Origen</Text>
            <Text style={styles.routeValue}>{item.origen}</Text>
          </View>
        </View>

        <View style={styles.routeDivider} />

        <View style={styles.routeItem}>
          <Text style={styles.routeIcon}>🎯</Text>
          <View style={styles.routeInfo}>
            <Text style={styles.routeLabel}>Destino</Text>
            <Text style={styles.routeValue}>{item.destino}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.acceptButton}
        onPress={() => handleAceptar(item)}
      >
        <Text style={styles.acceptButtonText}>✓ Aceptar Viaje</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAcceptedItem = ({ item }) => (
    <View style={[styles.card, styles.acceptedCard]}>
      <View style={styles.acceptedBadge}>
        <Text style={styles.acceptedBadgeText}>EN CURSO</Text>
      </View>
      <Text style={styles.acceptedTitle}>Viaje actual</Text>
      <Text style={styles.acceptedRoute}>{item.origen} → {item.destino}</Text>
      <Text style={styles.acceptedClient}>Cliente: {item.cliente}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Viajes aceptados */}
      {viajesAceptados.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tu Viaje Activo</Text>
          <FlatList
            data={viajesAceptados}
            renderItem={renderAcceptedItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}

      {/* Viajes disponibles */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Viajes Disponibles ({viajesDisponibles.length})
        </Text>
      </View>

      <FlatList
        data={viajesDisponibles}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🛺</Text>
            <Text style={styles.emptyText}>No hay viajes disponibles</Text>
            <Text style={styles.emptySubtext}>Espera nuevas solicitudes</Text>
          </View>
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
  section: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  list: {
    padding: 15,
    paddingTop: 5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
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
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tipo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cliente: {
    fontSize: 14,
    color: '#666',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  distancia: {
    fontSize: 12,
    color: '#888',
  },
  routeContainer: {
    marginBottom: 15,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  routeIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  routeInfo: {
    flex: 1,
  },
  routeLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 3,
  },
  routeValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  routeDivider: {
    width: 2,
    height: 15,
    backgroundColor: '#e0e0e0',
    marginLeft: 10,
    marginVertical: 5,
  },
  acceptButton: {
    backgroundColor: '#FF9800',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  acceptedCard: {
    backgroundColor: '#FFF3E0',
    borderLeftWidth: 5,
    borderLeftColor: '#FF9800',
    marginRight: 10,
    width: 250,
  },
  acceptedBadge: {
    backgroundColor: '#FF9800',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  acceptedBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  acceptedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  acceptedRoute: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  acceptedClient: {
    fontSize: 12,
    color: '#888',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#888',
  },
});