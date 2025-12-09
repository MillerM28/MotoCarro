import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PaymentMethodSelector from '../../components/PaymentMethodSelector';
import { useAuth } from '../../context/AuthContext';

export default function PagoScreen({ navigation, route }) {
    const { user } = useAuth();
    const { viaje } = route.params || {};

    const [paymentMethod, setPaymentMethod] = useState('efectivo');
    const [processing, setProcessing] = useState(false);

    // Cálculo de costos
    const TARIFA_BASE = 3000;
    const COSTO_POR_KM = 1000;
    const distancia = viaje?.distancia || 3.5;
    const costoDistancia = distancia * COSTO_POR_KM;
    const total = TARIFA_BASE + costoDistancia;

    const handlePay = () => {
        setProcessing(true);

        // Validaciones
        if (paymentMethod === 'saldo' && (user?.saldo || 0) < total) {
            Alert.alert('Saldo Insuficiente', 'No tienes saldo suficiente en tu cuenta.');
            setProcessing(false);
            return;
        }

        // Simular procesamiento
        setTimeout(() => {
            setProcessing(false);
            Alert.alert(
                '¡Pago Exitoso!',
                `Tu pago de $${total.toLocaleString()} ha sido procesado.`,
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            // Navegar a pantalla de calificación
                            navigation.replace('Calificacion', { viaje });
                        }
                    }
                ]
            );
        }, 1500);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerIcon}>💳</Text>
                    <Text style={styles.headerTitle}>Pagar Viaje</Text>
                    <Text style={styles.headerSubtitle}>Completa tu pago de forma segura</Text>
                </View>

                {/* Resumen del viaje */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Resumen del viaje</Text>

                    <View style={styles.tripInfo}>
                        <View style={styles.tripRow}>
                            <Text style={styles.tripIcon}>📍</Text>
                            <View style={styles.tripDetails}>
                                <Text style={styles.tripLabel}>Origen</Text>
                                <Text style={styles.tripValue}>{viaje?.origen || 'Punto A'}</Text>
                            </View>
                        </View>

                        <View style={styles.tripDivider} />

                        <View style={styles.tripRow}>
                            <Text style={styles.tripIcon}>🎯</Text>
                            <View style={styles.tripDetails}>
                                <Text style={styles.tripLabel}>Destino</Text>
                                <Text style={styles.tripValue}>{viaje?.destino || 'Punto B'}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.conductorInfo}>
                        <Text style={styles.conductorLabel}>Conductor</Text>
                        <Text style={styles.conductorName}>{viaje?.conductorNombre || 'Carlos Rodríguez'}</Text>
                    </View>
                </View>

                {/* Desglose de costos */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Desglose de costos</Text>

                    <View style={styles.costRow}>
                        <Text style={styles.costLabel}>Tarifa base</Text>
                        <Text style={styles.costValue}>${TARIFA_BASE.toLocaleString()}</Text>
                    </View>

                    <View style={styles.costRow}>
                        <Text style={styles.costLabel}>
                            Distancia ({distancia} km × ${COSTO_POR_KM.toLocaleString()})
                        </Text>
                        <Text style={styles.costValue}>${costoDistancia.toLocaleString()}</Text>
                    </View>

                    <View style={styles.separator} />

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total a pagar</Text>
                        <Text style={styles.totalValue}>${total.toLocaleString()}</Text>
                    </View>
                </View>

                {/* Método de pago */}
                <View style={styles.card}>
                    <PaymentMethodSelector
                        selectedMethod={paymentMethod}
                        onMethodChange={setPaymentMethod}
                    />

                    {paymentMethod === 'saldo' && (
                        <View style={styles.saldoInfo}>
                            <Text style={styles.saldoLabel}>Tu saldo actual:</Text>
                            <Text style={[
                                styles.saldoValue,
                                (user?.saldo || 0) < total && styles.saldoInsuficiente
                            ]}>
                                ${(user?.saldo || 0).toLocaleString()}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Botón de pago */}
                <TouchableOpacity
                    style={[styles.payButton, processing && styles.payButtonDisabled]}
                    onPress={handlePay}
                    disabled={processing}
                >
                    <Text style={styles.payButtonText}>
                        {processing ? 'Procesando...' : `💰 Pagar $${total.toLocaleString()}`}
                    </Text>
                </TouchableOpacity>

                {/* Botón cancelar */}
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
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
    content: {
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 25,
    },
    headerIcon: {
        fontSize: 60,
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
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
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    tripInfo: {
        marginBottom: 15,
    },
    tripRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    tripIcon: {
        fontSize: 20,
        marginRight: 10,
    },
    tripDetails: {
        flex: 1,
    },
    tripLabel: {
        fontSize: 12,
        color: '#888',
        marginBottom: 3,
    },
    tripValue: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    tripDivider: {
        width: 2,
        height: 15,
        backgroundColor: '#e0e0e0',
        marginLeft: 10,
        marginVertical: 8,
    },
    conductorInfo: {
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    conductorLabel: {
        fontSize: 12,
        color: '#888',
        marginBottom: 3,
    },
    conductorName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    costRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    costLabel: {
        fontSize: 14,
        color: '#666',
    },
    costValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    separator: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 10,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    totalValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    saldoInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 15,
        padding: 12,
        backgroundColor: '#f8f8f8',
        borderRadius: 8,
    },
    saldoLabel: {
        fontSize: 14,
        color: '#666',
    },
    saldoValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    saldoInsuficiente: {
        color: '#F44336',
    },
    payButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        padding: 18,
        alignItems: 'center',
        marginTop: 10,
    },
    payButtonDisabled: {
        backgroundColor: '#9E9E9E',
    },
    payButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 18,
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#f44336',
    },
    cancelButtonText: {
        color: '#f44336',
        fontSize: 16,
        fontWeight: '600',
    },
});
