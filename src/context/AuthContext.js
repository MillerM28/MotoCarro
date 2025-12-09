import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [viajeActual, setViajeActual] = useState(null);

    // Cargar usuario al iniciar
    useEffect(() => {
        checkUser();
    }, []);

    const checkUser = async () => {
        try {
            const userData = await AsyncStorage.getItem('user');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        } catch (error) {
            console.error('Error al cargar usuario:', error);
        } finally {
            setLoading(false);
        }
    };

    const solicitarViaje = (origen, destino, tipo) => {
        console.log('Solicitando viaje:', { origen, destino, tipo });

        // 1. Estado inicial: Buscando
        setViajeActual({
            status: 'buscando',
            origen: origen || 'Origen desconocido',
            destino: destino || 'Destino desconocido',
            tipo: tipo || 'Pasajero',
            fecha: new Date().toISOString(),
            conductor: null,
            tiempoLlegada: null
        });

        // 2. Simular encontrar conductor (3 segundos)
        setTimeout(() => {
            console.log('Conductor encontrado (Simulación)');
            setViajeActual(prev => {
                if (!prev) return null; // Si el viaje se canceló, no hacer nada
                return {
                    ...prev,
                    status: 'aceptado',
                    tiempoLlegada: '5 min',
                    conductor: {
                        nombre: 'Carlos Rodríguez',
                        placa: 'ABC-123',
                        modelo: 'Bajaj RE 4S',
                        calificacion: 4.8,
                        telefono: '3001234567'
                    }
                };
            });
        }, 3000);
    };

    const cancelarViaje = () => {
        console.log('Cancelando viaje');
        setViajeActual(null);
    };

    const login = async (email, password) => {
        try {
            // Aquí irá la llamada a tu API
            // Por ahora simulamos el login
            const mockUser = {
                id: 1,
                email: email,
                nombre: 'Usuario Test',
                saldo: 50000,
                rol: email.includes('cliente') ? 'cliente' :
                    email.includes('conductor') ? 'conductor' : 'dueño'
            };

            await AsyncStorage.setItem('user', JSON.stringify(mockUser));
            setUser(mockUser);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
            setViajeActual(null);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            loading,
            viajeActual,
            solicitarViaje,
            cancelarViaje
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de AuthProvider');
    }
    return context;
};