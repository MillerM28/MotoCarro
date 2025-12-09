import { useState } from 'react';
import { Alert, FlatList, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GestionarMotocarrosScreen() {
  const [motocarros, setMotocarros] = useState([
    { id: '1', placa: 'ABC-123', modelo: 'TVS King 2023', conductor: 'Juan Pérez', telefono: '300-123-4567', estado: 'Operativo', mantenimiento: 'En 15 días' },
    { id: '2', placa: 'DEF-456', modelo: 'Bajaj RE 2022', conductor: 'María García', telefono: '315-987-6543', estado: 'Operativo', mantenimiento: 'Mañana' },
    { id: '3', placa: 'GHI-789', modelo: 'Piaggio Ape', conductor: 'Sin Asignar', telefono: null, estado: 'Taller', mantenimiento: 'Vencido' },
  ]);

  const handleCall = (telefono) => {
    if (telefono) {
      Linking.openURL(`tel:${telefono}`);
    }
  };

  const handleAddMotocarro = () => {
    Alert.alert('Nuevo Motocarro', 'Funcionalidad para registrar nuevo vehículo');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.placa}>{item.placa}</Text>
        <Text style={[styles.status, item.estado === 'Operativo' ? styles.statusOk : styles.statusBad]}>
          {item.estado}
        </Text>
      </View>

      <Text style={styles.modelo}>{item.modelo}</Text>
      <View style={styles.conductorContainer}>
        <Text style={styles.info}>Conductor: <Text style={styles.bold}>{item.conductor}</Text></Text>
        {item.telefono && (
          <TouchableOpacity onPress={() => handleCall(item.telefono)} style={styles.phoneButton}>
            <Text style={styles.phoneIcon}>📞</Text>
            <Text style={styles.phoneText}>{item.telefono}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.maintenanceContainer}>
        <Text style={styles.maintenanceLabel}>Mantenimiento:</Text>
        <Text style={[
          styles.maintenanceValue,
          item.mantenimiento === 'Vencido' ? styles.textDanger :
            item.mantenimiento === 'Mañana' ? styles.textWarning : styles.textOk
        ]}>
          {item.mantenimiento}
        </Text>
      </View>

      <TouchableOpacity style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>Ver Detalles</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Flota</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddMotocarro}>
          <Text style={styles.addButtonText}>+ Agregar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={motocarros}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    elevation: 2
  },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  addButton: { backgroundColor: '#2196F3', padding: 10, borderRadius: 8 },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  list: { padding: 15 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    elevation: 3
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  placa: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  status: { fontSize: 12, fontWeight: 'bold', paddingVertical: 2, paddingHorizontal: 8, borderRadius: 10, overflow: 'hidden' },
  statusOk: { backgroundColor: '#E8F5E9', color: '#2E7D32' },
  statusBad: { backgroundColor: '#FFEBEE', color: '#C62828' },
  modelo: { fontSize: 14, color: '#666', marginBottom: 10 },
  conductorContainer: { marginBottom: 5 },
  info: { fontSize: 14, color: '#555', marginBottom: 4 },
  bold: { fontWeight: 'bold' },
  phoneButton: { flexDirection: 'row', alignItems: 'center', marginLeft: 10, marginTop: 2 },
  phoneIcon: { fontSize: 14, marginRight: 4 },
  phoneText: { fontSize: 13, color: '#2196F3', fontWeight: '500' },
  maintenanceContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 5, marginBottom: 10 },
  maintenanceLabel: { fontSize: 14, color: '#666', marginRight: 5 },
  maintenanceValue: { fontSize: 14, fontWeight: 'bold' },
  textOk: { color: '#4CAF50' },
  textWarning: { color: '#FF9800' },
  textDanger: { color: '#F44336' },
  detailsButton: { backgroundColor: '#E3F2FD', padding: 10, borderRadius: 8, alignItems: 'center' },
  detailsButtonText: { color: '#2196F3', fontWeight: 'bold' },
});