import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNotifications } from '../context/NotificationContext';

export default function NotificationButton({ color = '#fff' }) {
    const navigation = useNavigation();
    const { noLeidas } = useNotifications();

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Notificaciones')}
            style={styles.container}
        >
            <Text style={[styles.icon, { color }]}>🔔</Text>
            {/* Badge con contador */}
            {noLeidas > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                        {noLeidas > 9 ? '9+' : noLeidas}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        marginRight: 10,
        position: 'relative',
    },
    icon: {
        fontSize: 24,
    },
    badge: {
        position: 'absolute',
        top: 2,
        right: 2,
        minWidth: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: '#FF3B30',
        borderWidth: 2,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
});
