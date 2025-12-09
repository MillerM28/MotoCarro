import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function EstadisticasScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Resumen Financiero</Text>
      <Text style={styles.subtitle}>Esta semana</Text>

      <View style={styles.statsRow}>
        <View style={[styles.card, styles.cardBlue]}>
          <Text style={styles.cardLabel}>Ingresos</Text>
          <Text style={styles.cardValue}>$450.000</Text>
          <Text style={styles.cardTrend}>+12% vs semana anterior</Text>
        </View>
        <View style={[styles.card, styles.cardRed]}>
          <Text style={styles.cardLabel}>Gastos</Text>
          <Text style={styles.cardValue}>$120.000</Text>
          <Text style={styles.cardTrend}>Gasolina y Mant.</Text>
        </View>
      </View>

      <View style={[styles.card, styles.fullCard]}>
        <Text style={styles.cardLabel}>Beneficio Neto</Text>
        <Text style={styles.netValue}>$330.000</Text>
      </View>

      <Text style={styles.sectionTitle}>Últimos Viajes de la Flota</Text>

      <View style={styles.tripList}>
        <TripItem placa="ABC-123" hora="10:30 AM" monto="$8.000" conductor="Juan P." />
        <TripItem placa="DEF-456" hora="10:15 AM" monto="$5.000" conductor="María G." />
        <TripItem placa="ABC-123" hora="09:45 AM" monto="$12.000" conductor="Juan P." />
        <TripItem placa="JKL-012" hora="09:30 AM" monto="$6.000" conductor="Ana M." />
      </View>
    </ScrollView>
  );
}

const TripItem = ({ placa, hora, monto, conductor }) => (
  <View style={styles.tripItem}>
    <View>
      <Text style={styles.tripPlaca}>{placa}</Text>
      <Text style={styles.tripSub}>{conductor} • {hora}</Text>
    </View>
    <Text style={styles.tripMonto}>{monto}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  card: { backgroundColor: '#fff', borderRadius: 15, padding: 15, width: '48%', elevation: 3 },
  fullCard: { width: '100%', alignItems: 'center', marginBottom: 30 },
  cardBlue: { borderLeftWidth: 5, borderLeftColor: '#2196F3' },
  cardRed: { borderLeftWidth: 5, borderLeftColor: '#F44336' },
  cardLabel: { fontSize: 14, color: '#666', marginBottom: 5 },
  cardValue: { fontSize: 22, fontWeight: 'bold', color: '#333' },
  netValue: { fontSize: 32, fontWeight: 'bold', color: '#4CAF50' },
  cardTrend: { fontSize: 11, color: '#888', marginTop: 5 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  tripList: { backgroundColor: '#fff', borderRadius: 15, padding: 10, elevation: 3, marginBottom: 30 },
  tripItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  tripPlaca: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  tripSub: { fontSize: 12, color: '#666' },
  tripMonto: { fontSize: 16, fontWeight: 'bold', color: '#4CAF50' },
});