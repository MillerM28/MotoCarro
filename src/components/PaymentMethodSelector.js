import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PaymentMethodSelector({ selectedMethod, onMethodChange }) {
    const [selected, setSelected] = useState(selectedMethod || 'efectivo');

    const methods = [
        { id: 'efectivo', name: 'Efectivo', icon: '💵' },
        { id: 'tarjeta', name: 'Tarjeta', icon: '💳' },
        { id: 'saldo', name: 'Saldo App', icon: '💰' },
    ];

    const handleSelect = (methodId) => {
        setSelected(methodId);
        if (onMethodChange) {
            onMethodChange(methodId);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Método de pago</Text>
            <View style={styles.methods}>
                {methods.map((method) => (
                    <TouchableOpacity
                        key={method.id}
                        style={[
                            styles.methodButton,
                            selected === method.id && styles.methodButtonActive
                        ]}
                        onPress={() => handleSelect(method.id)}
                    >
                        <Text style={styles.methodIcon}>{method.icon}</Text>
                        <Text style={[
                            styles.methodText,
                            selected === method.id && styles.methodTextActive
                        ]}>
                            {method.name}
                        </Text>
                        {selected === method.id && (
                            <View style={styles.checkmark}>
                                <Text style={styles.checkmarkText}>✓</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    methods: {
        gap: 10,
    },
    methodButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#e0e0e0',
    },
    methodButtonActive: {
        backgroundColor: '#E8F5E9',
        borderColor: '#4CAF50',
    },
    methodIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    methodText: {
        fontSize: 16,
        color: '#666',
        flex: 1,
    },
    methodTextActive: {
        color: '#333',
        fontWeight: '600',
    },
    checkmark: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
