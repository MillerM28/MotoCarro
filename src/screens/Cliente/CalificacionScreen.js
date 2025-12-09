import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import StarRating from '../../components/StarRating';
import { useViajes } from '../../context/ViajesContext';

export default function CalificacionScreen({ navigation, route }) {
    const { viaje } = route.params || {};
    const { calificarConductor } = useViajes();

    const [rating, setRating] = useState(0);
    const [comentario, setComentario] = useState('');

    const handleSubmit = () => {
        if (rating === 0) {
            Alert.alert('Calificación requerida', 'Por favor selecciona una calificación.');
            return;
        }

        // Guardar calificación
        calificarConductor(viaje?.id || '1', rating, comentario);

        Alert.alert(
            '¡Gracias!',
            'Tu calificación ha sido enviada.',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        // Volver a la pantalla principal
                        navigation.navigate('Solicitar');
                    }
                }
            ]
        );
    };

    const handleSkip = () => {
        Alert.alert(
            'Omitir calificación',
            '¿Estás seguro de que deseas omitir la calificación?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Omitir',
                    onPress: () => navigation.navigate('Solicitar')
                }
            ]
        );
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerIcon}>⭐</Text>
                    <Text style={styles.headerTitle}>Califica tu viaje</Text>
                    <Text style={styles.headerSubtitle}>Ayúdanos a mejorar el servicio</Text>
                </View>

                {/* Información del conductor */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Conductor</Text>
                    <View style={styles.driverInfo}>
                        <View style={styles.driverAvatar}>
                            <Text style={styles.avatarText}>
                                {(viaje?.conductorNombre || 'C').charAt(0).toUpperCase()}
                            </Text>
                        </View>
                        <View style={styles.driverDetails}>
                            <Text style={styles.driverName}>{viaje?.conductorNombre || 'Carlos Rodríguez'}</Text>
                            <Text style={styles.driverPlate}>🛺 {viaje?.placa || 'ABC-123'}</Text>
                        </View>
                    </View>
                </View>

                {/* Resumen del viaje */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Tu viaje</Text>
                    <View style={styles.routeInfo}>
                        <View style={styles.routeRow}>
                            <Text style={styles.routeIcon}>📍</Text>
                            <Text style={styles.routeText}>{viaje?.origen || 'Punto A'}</Text>
                        </View>
                        <View style={styles.routeDivider} />
                        <View style={styles.routeRow}>
                            <Text style={styles.routeIcon}>🎯</Text>
                            <Text style={styles.routeText}>{viaje?.destino || 'Punto B'}</Text>
                        </View>
                    </View>
                </View>

                {/* Calificación */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>¿Cómo fue tu experiencia?</Text>
                    <Text style={styles.ratingSubtitle}>
                        {rating === 0 ? 'Selecciona una calificación' :
                            rating === 1 ? 'Muy mala' :
                                rating === 2 ? 'Mala' :
                                    rating === 3 ? 'Regular' :
                                        rating === 4 ? 'Buena' : 'Excelente'}
                    </Text>
                    <View style={styles.starContainer}>
                        <StarRating
                            rating={rating}
                            onRatingChange={setRating}
                            size={50}
                        />
                    </View>
                </View>

                {/* Comentario */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Comentario (opcional)</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Cuéntanos más sobre tu experiencia..."
                        value={comentario}
                        onChangeText={setComentario}
                        multiline
                        numberOfLines={4}
                        maxLength={200}
                    />
                    <Text style={styles.characterCount}>{comentario.length}/200</Text>
                </View>

                {/* Botones */}
                <TouchableOpacity
                    style={[styles.submitButton, rating === 0 && styles.submitButtonDisabled]}
                    onPress={handleSubmit}
                    disabled={rating === 0}
                >
                    <Text style={styles.submitButtonText}>✓ Enviar Calificación</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                    <Text style={styles.skipButtonText}>Omitir por ahora</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: 'center',
        marginBottom: 25,
        marginTop: 20,
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
    driverInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    driverAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    avatarText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    driverDetails: {
        flex: 1,
    },
    driverName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    driverPlate: {
        fontSize: 14,
        color: '#666',
    },
    routeInfo: {
        paddingVertical: 5,
    },
    routeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    routeIcon: {
        fontSize: 18,
        marginRight: 10,
    },
    routeText: {
        fontSize: 16,
        color: '#333',
    },
    routeDivider: {
        width: 2,
        height: 15,
        backgroundColor: '#e0e0e0',
        marginLeft: 9,
        marginVertical: 5,
    },
    ratingSubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 15,
    },
    starContainer: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    textArea: {
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        height: 100,
        textAlignVertical: 'top',
    },
    characterCount: {
        fontSize: 12,
        color: '#888',
        textAlign: 'right',
        marginTop: 5,
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        padding: 18,
        alignItems: 'center',
        marginTop: 10,
    },
    submitButtonDisabled: {
        backgroundColor: '#9E9E9E',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    skipButton: {
        backgroundColor: 'transparent',
        borderRadius: 10,
        padding: 18,
        alignItems: 'center',
        marginTop: 10,
    },
    skipButtonText: {
        color: '#666',
        fontSize: 16,
    },
});
