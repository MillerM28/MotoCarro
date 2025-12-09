import { useState } from 'react';
import { Alert, FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function GestionarConductoresScreen() {
  const [conductores, setConductores] = useState([
    { id: '1', nombre: 'Juan Pérez', telefono: '300-123-4567', estado: 'Activo', viajes: 12, ganancias: '$120.000', foto: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: '2', nombre: 'María García', telefono: '315-987-6543', estado: 'Activo', viajes: 8, ganancias: '$80.000', foto: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: '3', nombre: 'Carlos López', telefono: '310-555-8888', estado: 'Inactivo', viajes: 0, ganancias: '$0', foto: 'https://randomuser.me/api/portraits/men/3.jpg' },
  ]);

  const toggleEstado = (id) => {
    setConductores(conductores.map(c =>
      c.id === id ? { ...c, estado: c.estado === 'Activo' ? 'Inactivo' : 'Activo' } : c
    ));
  };

  const handleCall = (telefono) => {
    Linking.openURL(`tel:${telefono}`);
  };

  const handleAddConductor = () => {
    Alert.alert('Nuevo Conductor', 'Funcionalidad para registrar nuevo conductor');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.foto }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.nombre}>{item.nombre}</Text>
        <TouchableOpacity onPress={() => handleCall(item.telefono)} style={styles.phoneContainer}>
          <Text style={styles.phoneIcon}>📞</Text>
          <Text style={styles.telefono}>{item.telefono}</Text>
        </TouchableOpacity>
        <Text style={styles.details}>Viajes hoy: {item.viajes}</Text>
        <Text style={styles.ganancias}>{item.ganancias}</Text>
      </View>
      <TouchableOpacity
        style={[styles.statusButton, item.estado === 'Activo' ? styles.active : styles.inactive]}
        onPress={() => toggleEstado(item.id)}
      >
        <Text style={styles.statusText}>{item.estado}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mis Conductores</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddConductor}>
          <Text style={styles.addButtonText}>+ Agregar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={conductores}
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
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 3
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  info: { flex: 1 },
  nombre: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  phoneContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 2, marginBottom: 4 },
  phoneIcon: { fontSize: 14, marginRight: 4 },
  telefono: { fontSize: 14, color: '#2196F3', fontWeight: '500' },
  details: { fontSize: 14, color: '#666' },
  ganancias: { fontSize: 14, color: '#4CAF50', fontWeight: 'bold' },
  statusButton: { paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
  active: { backgroundColor: '#E8F5E9' },
  inactive: { backgroundColor: '#FFEBEE' },
  statusText: { fontSize: 12, fontWeight: 'bold', color: '#555' }
});