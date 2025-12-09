import { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        const result = await login(email, password);
        if (!result.success) {
            Alert.alert('Error', 'Credenciales inválidas');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.content}>
                {/* Logo */}
                <View style={styles.logoContainer}>
                    <Text style={styles.logoText}>🛺</Text>
                    <Text style={styles.title}>MotoCarro</Text>
                    <Text style={styles.subtitle}>Sistema de Transporte</Text>
                </View>

                {/* Formulario */}
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Correo electrónico"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.registerLink}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.registerLinkText}>
                            ¿No tienes cuenta? <Text style={styles.registerLinkBold}>Regístrate aquí</Text>
                        </Text>
                    </TouchableOpacity>

                    {/* Información de prueba */}
                    <View style={styles.infoBox}>
                        <Text style={styles.infoTitle}>Usuarios de prueba:</Text>
                        <Text style={styles.infoText}>Cliente: cliente@test.com</Text>
                        <Text style={styles.infoText}>Conductor: conductor@test.com</Text>
                        <Text style={styles.infoText}>Dueño: dueño@test.com</Text>
                        <Text style={styles.infoText}>Contraseña: cualquiera</Text>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4CAF50',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    logoText: {
        fontSize: 80,
        marginBottom: 10,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
    },
    form: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    registerLinkText: {
        color: '#666',
        fontSize: 14,
    },
    registerLinkBold: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    infoBox: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#E8F5E9',
        borderRadius: 10,
    },
    infoTitle: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#2E7D32',
    },
    infoText: {
        fontSize: 12,
        color: '#555',
        marginTop: 2,
    },
});