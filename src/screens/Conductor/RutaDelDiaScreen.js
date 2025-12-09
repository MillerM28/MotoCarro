import { useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function RutaDelDiaScreen() {
  const [fecha] = useState(new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));

  const [viajes] = useState([
    {
      id: '1',
      hora: '08:30 AM',
      cliente: 'María González',
      origen: 'Calle 10 #5-20',
      destino: 'Av. Principal #30-15',
      distancia: '3.2 km',
      tarifa: '$8.500',
      estado: 'completado',
      calificacion: 5
    },
    {
      id: '2',
      hora: '09:15 AM',
      cliente: 'Carlos Pérez',
      origen: 'Centro Comercial',
      destino: 'Residencias El Bosque',
      distancia: '5.8 km',
      tarifa: '$12.000',
      estado: 'completado',
      calificacion: 4
    },
    {
      id: '3',
      hora: '10:00 AM',
      cliente: 'Ana Martínez',
      origen: 'Hospital Central',
      destino: 'Universidad del Norte',
      distancia: '2.5 km',
      tarifa: '$7.000',
      estado: 'completado',
      calificacion: 5
    },
    {
      id: '4',
      hora: '11:30 AM',
      cliente: 'Luis Rodríguez',
      origen: 'Terminal de Buses',
      destino: 'Barrio San José',
      distancia: '4.1 km',
      tarifa: '$9.500',
      estado: 'en_curso',
      calificacion: null
    },
  ]);

  const [estadisticas] = useState({
    totalViajes: 12,
    viajesCompletados: 11,
    gananciaTotal: '$85.000',
    kmRecorridos: '48.5 km',
    tiempoActivo: '5h 30min'
  });

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'completado':
        return '#4CAF50';
      case 'en_curso':
        return '#2196F3';
      case 'cancelado':
        return '#f44336';
      default:
        return '#999';
    }
  };

  const getEstadoTexto = (estado) => {
    switch (estado) {
      case 'completado':
        return 'Completado';
      case 'en_curso':
        return 'En Curso';
      case 'cancelado':
        return 'Cancelado';
      default:
        return 'Desconocido';
    }
  };

  const renderViaje = ({ item, index }) => (
    <View style={styles.viajeCard}>
      <View style={styles.viajeHeader}>
        <View style={styles.numeroCirculo}>
          <Text style={styles.numeroTexto}>#{index + 1}</Text>
        </View>
        <View style={styles.viajeHeaderInfo}>
          <Text style={styles.viajeHora}>{item.hora}</Text>
          <Text style={styles.viajeCliente}>{item.cliente}</Text>
        </View>
        <View style={[
          styles.estadoBadge,
          { backgroundColor: getEstadoColor(item.estado) + '20' }
        ]}>
          <Text style={[
            styles.estadoTexto,
            { color: getEstadoColor(item.estado) }
          ]}>
            {getEstadoTexto(item.estado)}
          </Text>
        </View>
      </View>

      <View style={styles.rutaInfo}>
        <View style={styles.rutaItem}>
          <Text style={styles.rutaIcon}>📍</Text>
          <Text style={styles.rutaTexto} numberOfLines={1}>{item.origen}</Text>
        </View>
        <View style={styles.rutaDivider} />
        <View style={styles.rutaItem}>
          <Text style={styles.rutaIcon}>🎯</Text>
          <Text style={styles.rutaTexto} numberOfLines={1}>{item.destino}</Text>
        </View>
      </View>

      <View style={styles.viajeFooter}>
        <View style={styles.viajeInfoItem}>
          <Text style={styles.viajeInfoLabel}>Distancia</Text>
          <Text style={styles.viajeInfoValue}>{item.distancia}</Text>
        </View>
        <View style={styles.viajeInfoItem}>
          <Text style={styles.viajeInfoLabel}>Tarifa</Text>
          <Text style={styles.viajeTarifa}>{item.tarifa}</Text>
        </View>
        {item.calificacion && (
          <View style={styles.viajeInfoItem}>
            <Text style={styles.viajeInfoLabel}>Calificación</Text>
            <View style={styles.calificacion}>
              <Text style={styles.estrella}>⭐</Text>
              <Text style={styles.calificacionValor}>{item.calificacion}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header con fecha */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Ruta del Día</Text>
        <Text style={styles.fecha}>{fecha}</Text>
      </View>

      {/* Resumen del día */}
      <View style={styles.resumenCard}>
        <Text style={styles.resumenTitulo}>📊 Resumen del Día</Text>
        
        <View style={styles.resumenGrid}>
          <View style={styles.resumenItem}>
            <Text style={styles.resumenValor}>{estadisticas.totalViajes}</Text>
            <Text style={styles.resumenLabel}>Viajes Totales</Text>
          </View>
          <View style={styles.resumenItem}>
            <Text style={styles.resumenValor}>{estadisticas.viajesCompletados}</Text>
            <Text style={styles.resumenLabel}>Completados</Text>
          </View>
        </View>

        <View style={styles.resumenGrid}>
          <View style={styles.resumenItem}>
            <Text style={[styles.resumenValor, { color: '#4CAF50' }]}>
              {estadisticas.gananciaTotal}
            </Text>
            <Text style={styles.resumenLabel}>Ganancia Total</Text>
          </View>
          <View style={styles.resumenItem}>
            <Text style={styles.resumenValor}>{estadisticas.kmRecorridos}</Text>
            <Text style={styles.resumenLabel}>Km Recorridos</Text>
          </View>
        </View>

        <View style={styles.tiempoActivoContainer}>
          <Text style={styles.tiempoActivoLabel}>⏱️ Tiempo Activo:</Text>
          <Text style={styles.tiempoActivoValor}>{estadisticas.tiempoActivo}</Text>
        </View>
      </View>

      {/* Lista de viajes */}
      <View style={styles.listaContainer}>
        <Text style={styles.listaTitulo}>Viajes Realizados</Text>
        <FlatList
          data={viajes}
          renderItem={renderViaje}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.lista}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Botón de finalizar día */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.finalizarButton}>
          <Text style={styles.finalizarButtonText}>Finalizar Jornada</Text>
        </TouchableOpacity>
      </View>
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
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  fecha: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textTransform: 'capitalize',
  },
  resumenCard: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resumenTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  resumenGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  resumenItem: {
    alignItems: 'center',
  },
  resumenValor: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 5,
  },
  resumenLabel: {
    fontSize: 12,
    color: '#666',
  },
  tiempoActivoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  tiempoActivoLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  tiempoActivoValor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  listaContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  listaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  lista: {
    paddingBottom: 100,
  },
  viajeCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  viajeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  numeroCirculo: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#FF9800',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  numeroTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  viajeHeaderInfo: {
    flex: 1,
  },
  viajeHora: {
    fontSize: 12,
    color: '#999',
    marginBottom: 3,
  },
  viajeCliente: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
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
  rutaInfo: {
    marginBottom: 12,
  },
  rutaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rutaIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  rutaTexto: {
    fontSize: 13,
    color: '#666',
    flex: 1,
  },
  rutaDivider: {
    height: 12,
    width: 2,
    backgroundColor: '#e0e0e0',
    marginLeft: 8,
    marginVertical: 5,
  },
  viajeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  viajeInfoItem: {
    alignItems: 'center',
  },
  viajeInfoLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
  },
  viajeInfoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  viajeTarifa: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  calificacion: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  estrella: {
    fontSize: 14,
    marginRight: 3,
  },
  calificacionValor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  finalizarButton: {
    backgroundColor: '#f44336',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
  },
  finalizarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});