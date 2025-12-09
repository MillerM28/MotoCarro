import { useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function ReportesScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [tipoReporte, setTipoReporte] = useState('');
  const [descripcion, setDescripcion] = useState('');
  
  const [reportes] = useState([
    {
      id: '1',
      tipo: 'Mantenimiento',
      fecha: '2024-12-05',
      estado: 'Pendiente',
      descripcion: 'Cambio de aceite requerido',
      icono: '🔧'
    },
    {
      id: '2',
      tipo: 'Falla Mecánica',
      fecha: '2024-12-03',
      estado: 'Resuelto',
      descripcion: 'Problema con frenos solucionado',
      icono: '⚠️'
    },
    {
      id: '3',
      tipo: 'Documentación',
      fecha: '2024-12-01',
      estado: 'Resuelto',
      descripcion: 'Renovación de SOAT',
      icono: '📄'
    },
  ]);

  const tiposReporte = [
    { id: '1', nombre: 'Mantenimiento', icono: '🔧' },
    { id: '2', nombre: 'Falla Mecánica', icono: '⚠️' },
    { id: '3', nombre: 'Accidente', icono: '🚨' },
    { id: '4', nombre: 'Documentación', icono: '📄' },
    { id: '5', nombre: 'Limpieza', icono: '🧼' },
    { id: '6', nombre: 'Otro', icono: '📝' },
  ];

  const handleNuevoReporte = () => {
    setModalVisible(true);
  };

  const handleSubmitReporte = () => {
    if (!tipoReporte || !descripcion) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    Alert.alert(
      'Reporte Enviado',
      'Tu reporte ha sido enviado exitosamente',
      [
        {
          text: 'OK',
          onPress: () => {
            setModalVisible(false);
            setTipoReporte('');
            setDescripcion('');
          }
        }
      ]
    );
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'Pendiente':
        return '#FF9800';
      case 'En Proceso':
        return '#2196F3';
      case 'Resuelto':
        return '#4CAF50';
      default:
        return '#999';
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.titulo}>Reportes de Motocarro</Text>
          <Text style={styles.subtitulo}>Gestiona el mantenimiento y problemas</Text>
        </View>

        {/* Botón nuevo reporte */}
        <TouchableOpacity style={styles.nuevoButton} onPress={handleNuevoReporte}>
          <Text style={styles.nuevoButtonIcon}>➕</Text>
          <Text style={styles.nuevoButtonText}>Crear Nuevo Reporte</Text>
        </TouchableOpacity>

        {/* Estadísticas rápidas */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValor}>3</Text>
            <Text style={styles.statLabel}>Pendientes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValor, { color: '#4CAF50' }]}>8</Text>
            <Text style={styles.statLabel}>Resueltos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={[styles.statValor, { color: '#2196F3' }]}>2</Text>
            <Text style={styles.statLabel}>En Proceso</Text>
          </View>
        </View>

        {/* Lista de reportes */}
        <View style={styles.listaContainer}>
          <Text style={styles.listaTitulo}>Reportes Recientes</Text>
          
          {reportes.map((reporte) => (
            <View key={reporte.id} style={styles.reporteCard}>
              <View style={styles.reporteHeader}>
                <Text style={styles.reporteIcono}>{reporte.icono}</Text>
                <View style={styles.reporteInfo}>
                  <Text style={styles.reporteTipo}>{reporte.tipo}</Text>
                  <Text style={styles.reporteFecha}>{reporte.fecha}</Text>
                </View>
                <View style={[
                  styles.estadoBadge,
                  { backgroundColor: getEstadoColor(reporte.estado) + '20' }
                ]}>
                  <Text style={[
                    styles.estadoTexto,
                    { color: getEstadoColor(reporte.estado) }
                  ]}>
                    {reporte.estado}
                  </Text>
                </View>
              </View>
              
              <Text style={styles.reporteDescripcion}>{reporte.descripcion}</Text>
              
              <TouchableOpacity style={styles.verDetalleButton}>
                <Text style={styles.verDetalleText}>Ver Detalles</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Información de contacto */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitulo}>📞 Soporte Técnico</Text>
          <Text style={styles.infoTexto}>
            Para emergencias o problemas graves, contacta directamente:
          </Text>
          <TouchableOpacity style={styles.contactoButton}>
            <Text style={styles.contactoButtonText}>Llamar a Soporte</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal para nuevo reporte */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitulo}>Nuevo Reporte</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCerrar}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.label}>Tipo de Reporte</Text>
              <View style={styles.tiposGrid}>
                {tiposReporte.map((tipo) => (
                  <TouchableOpacity
                    key={tipo.id}
                    style={[
                      styles.tipoButton,
                      tipoReporte === tipo.nombre && styles.tipoButtonActive
                    ]}
                    onPress={() => setTipoReporte(tipo.nombre)}
                  >
                    <Text style={styles.tipoIcono}>{tipo.icono}</Text>
                    <Text style={styles.tipoNombre}>{tipo.nombre}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.label}>Descripción del Problema</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Describe el problema o necesidad de mantenimiento..."
                value={descripcion}
                onChangeText={setDescripcion}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmitReporte}
              >
                <Text style={styles.submitButtonText}>Enviar Reporte</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  nuevoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF9800',
    margin: 15,
    padding: 18,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nuevoButtonIcon: {
    fontSize: 24,
    marginRight: 10,
    color: '#fff',
  },
  nuevoButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  statValor: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  listaContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  listaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  reporteCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  reporteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  reporteIcono: {
    fontSize: 30,
    marginRight: 12,
  },
  reporteInfo: {
    flex: 1,
  },
  reporteTipo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reporteFecha: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
  },
  estadoBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  estadoTexto: {
    fontSize: 11,
    fontWeight: '600',
  },
  reporteDescripcion: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  verDetalleButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
  },
  verDetalleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FF9800',
  },
  infoCard: {
    backgroundColor: '#E3F2FD',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },
  infoTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoTexto: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  contactoButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  contactoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  modalCerrar: {
    fontSize: 28,
    color: '#999',
  },
  modalBody: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    marginTop: 10,
  },
  tiposGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  tipoButton: {
    width: '31%',
    aspectRatio: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1%',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  tipoButtonActive: {
    backgroundColor: '#FFF3E0',
    borderColor: '#FF9800',
  },
  tipoIcono: {
    fontSize: 32,
    marginBottom: 5,
  },
  tipoNombre: {
    fontSize: 11,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  textArea: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 15,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minHeight: 120,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#FF9800',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});