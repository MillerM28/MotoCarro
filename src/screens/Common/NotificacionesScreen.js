import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNotifications } from '../../context/NotificationContext';

export default function NotificacionesScreen() {
    const navigation = useNavigation();
    const { notificaciones, marcarComoLeida, marcarTodasComoLeidas, noLeidas } = useNotifications();

    // Marcar todas como leídas al entrar
    useEffect(() => {
        if (noLeidas > 0) {
            const timer = setTimeout(() => {
                marcarTodasComoLeidas();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.card, !item.leida && styles.cardNoLeida]}
            onPress={() => marcarComoLeida(item.id)}
        >
            <View style={styles.cardHeader}>
                <View style={styles.headerLeft}>
                    {!item.leida && <View style={styles.unreadDot} />}
                    <Text style={styles.titulo}>{item.titulo}</Text>
                </View>
                <Text style={styles.fecha}>{item.fecha}</Text>
            </View>
            <Text style={styles.mensaje}>{item.mensaje}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Volver</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notificaciones</Text>
                {noLeidas > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{noLeidas}</Text>
                    </View>
                )}
            </View>

            <FlatList
                data={notificaciones}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No tienes notificaciones</Text>
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
    header: {
        backgroundColor: '#fff',
        padding: 16,
        paddingTop: 50, // Ajuste para status bar
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        elevation: 2,
    },
    badge: {
        marginLeft: 'auto',
        backgroundColor: '#FF3B30',
        borderRadius: 12,
        minWidth: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    backButton: {
        padding: 8,
        marginRight: 16,
    },
    backButtonText: {
        fontSize: 16,
        color: '#2196F3',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    list: {
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    cardNoLeida: {
        backgroundColor: '#E3F2FD',
        borderLeftWidth: 4,
        borderLeftColor: '#2196F3',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        alignItems: 'center',
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#2196F3',
        marginRight: 8,
    },
    titulo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        flex: 1,
    },
    fecha: {
        fontSize: 12,
        color: '#888',
    },
    mensaje: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: '#888',
    },
});
