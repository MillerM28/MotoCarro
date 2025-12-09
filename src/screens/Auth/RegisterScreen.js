import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen({ navigation }) {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rol, setRol] = useState('cliente');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { login } = useAuth();

    const handleRegister = async () => {
        setError(''); // Limpiar errores previos

        if (!nombre || !email || !password || !confirmPassword) {
            setError('Por favor completa todos los campos');
            return;
        }

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        // Simulación de registro exitoso
        setSuccess('¡Registro Exitoso! Ingresando...');

        // Esperar 1.5 segundos para que el usuario lea el mensaje
        setTimeout(async () => {
            await login(email, password);
        }, 1500);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>
                    <Text style={styles.title}>Crear Cuenta</Text>
                    <Text style={styles.subtitle}>Únete a MotoCarro</Text>

                    <View style={styles.form}>
                        {error ? <Text style={styles.errorText}>{error}</Text> : null}
                        {success ? <Text style={styles.successText}>{success}</Text> : null}

                        <Text style={styles.label}>Nombre Completo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ej. Juan Pérez"
                            value={nombre}
                            onChangeText={(t) => { setNombre(t); setError(''); }}
                        />

                        <Text style={styles.label}>Correo Electrónico</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ej. usuario@email.com"
                            value={email}
                            onChangeText={(t) => { setEmail(t); setError(''); }}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <Text style={styles.label}>Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="********"
                            value={password}
                            onChangeText={(t) => { setPassword(t); setError(''); }}
                            secureTextEntry
                        />

                        <Text style={styles.label}>Confirmar Contraseña</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="********"
                            value={confirmPassword}
                            onChangeText={(t) => { setConfirmPassword(t); setError(''); }}
                            secureTextEntry
                        />

                        <Text style={styles.label}>Soy:</Text>
                        <View style={styles.roleContainer}>
                            {['cliente', 'conductor', 'dueño'].map((r) => (
                                <TouchableOpacity
                                    key={r}
                                    style={[styles.roleButton, rol === r && styles.roleButtonActive]}
                                    onPress={() => setRol(r)}
                                >
                                    <Text style={[styles.roleText, rol === r && styles.roleTextActive]}>
                                        {r.charAt(0).toUpperCase() + r.slice(1)}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleRegister}>
                            <Text style={styles.buttonText}>Registrarse</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.loginLink}
                            onPress={() => navigation.goBack()}
                        >
                            <Text style={styles.loginLinkText}>
                                ¿Ya tienes cuenta? <Text style={styles.loginLinkBold}>Inicia Sesión</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4CAF50',
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        opacity: 0.9,
        marginBottom: 30,
        textAlign: 'center',
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
    errorText: {
        color: '#D32F2F',
        backgroundColor: '#FFEBEE',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 12,
        fontSize: 16,
    },
    roleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 20,
    },
    roleButton: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        alignItems: 'center',
        marginHorizontal: 2,
        backgroundColor: '#fff',
    },
    roleButtonActive: {
        backgroundColor: '#E8F5E9',
        borderColor: '#4CAF50',
    },
    roleText: {
        fontSize: 12,
        color: '#666',
    },
    roleTextActive: {
        color: '#4CAF50',
        fontWeight: 'bold',
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
    loginLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    loginLinkText: {
        color: '#666',
        fontSize: 14,
    },
    loginLinkBold: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
});
