import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';
import NotificationButton from './NotificationButton';

export default function HeaderRight({ color = '#fff' }) {
    const { logout } = useAuth();

    return (
        <View style={styles.container}>
            <NotificationButton color={color} />
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                <Text style={[styles.logoutText, { color }]}>Salir</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    logoutButton: {
        marginLeft: 10,
        padding: 5,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
