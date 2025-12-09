import { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function SolicitarServicioScreen({ navigation }) {
  const { solicitarViaje } = useAuth();
  const [origen, setOrigen] = useState('');
  const [destino, setDestino] = useState('');
  const [tipoCarga, setTipoCarga] = useState('Pasajero');
  const [descripcion, setDescripcion] = useState('');

  const handleSolicitar = () => {
    if (!origen || !destino) {
      Alert.alert('Error', 'Por favor completa origen y destino');
      return;
    }

    // Iniciar simulación real
    solicitarViaje(origen, destino, tipoCarga);

    // Navegar
    navigation.navigate('Seguimiento');

    // Limpiar formulario
    setOrigen('');
    setDestino('');
    setDescripcion('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Solicitar Servicio</Text>
        <Text style={styles.subtitle}>Completa los datos de tu viaje</Text>

        {/* Formulario */}
        <View style={styles.form}>
          <Text style={styles.label}>Origen *</Text>
          <TextInput
            style={styles.input}
            placeholder="¿Dónde te recogemos?"
            value={origen}
            onChangeText={setOrigen}
          />

          <Text style={styles.label}>Destino *</Text>
          <TextInput
            style={styles.input}
            placeholder="¿A dónde vamos?"
            value={destino}
            onChangeText={setDestino}
          />

          <Text style={styles.label}>Tipo de Carga</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                tipoCarga === 'Pasajero' && styles.optionButtonActive
              ]}
              onPress={() => setTipoCarga('Pasajero')}
            >
              <Text style={styles.optionIcon}>👤</Text>
              <Text style={styles.optionText}>Pasajero</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                tipoCarga === 'Paquete' && styles.optionButtonActive
              ]}
              onPress={() => setTipoCarga('Paquete')}
            >
              <Text style={styles.optionIcon}>📦</Text>
              <Text style={styles.optionText}>Paquete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                tipoCarga === 'Mercancía' && styles.optionButtonActive
              ]}
              onPress={() => setTipoCarga('Mercancía')}
            >
              <Text style={styles.optionIcon}>🛒</Text>
              <Text style={styles.optionText}>Mercancía</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.label}>Descripción adicional</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Detalles adicionales del servicio..."
            value={descripcion}
            onChangeText={setDescripcion}
            multiline
            numberOfLines={4}
          />

          {/* Botón de solicitar */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSolicitar}>
            <Text style={styles.submitButtonText}>🚀 Solicitar Servicio</Text>
          </TouchableOpacity>
        </View>

        {/* Información estimada */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📍 Información del servicio</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tiempo estimado:</Text>
            <Text style={styles.infoValue}>15-20 min</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tarifa base:</Text>
            <Text style={styles.infoValue}>$3.000</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Por kilómetro:</Text>
            <Text style={styles.infoValue}>$1.000</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 10,
  },
  optionButton: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  optionButtonActive: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  optionIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
  optionText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
});