import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const NotificationContext = createContext();

// Notificaciones por rol
const NOTIFICACIONES_POR_ROL = {
    cliente: [
        { id: '1', titulo: '¡Bienvenido!', mensaje: 'Gracias por usar MotoCarro App', fecha: 'hace 5 min', leida: false },
        { id: '2', titulo: 'Descuento especial', mensaje: 'Obtén 20% de descuento en tu próximo viaje', fecha: 'hace 1 hora', leida: false },
        { id: '3', titulo: 'Viaje completado', mensaje: 'Tu último viaje fue calificado exitosamente', fecha: 'hace 2 horas', leida: true },
        { id: '4', titulo: 'Nueva zona', mensaje: 'Ahora tenemos cobertura en tu área', fecha: 'hace 1 día', leida: true },
    ],
    conductor: [
        { id: '1', titulo: 'Nuevo viaje disponible', mensaje: 'Hay un viaje cerca de tu ubicación', fecha: 'hace 2 min', leida: false },
        { id: '2', titulo: 'Mantenimiento', mensaje: 'Recuerda revisar el aceite de tu motocarro', fecha: 'hace 30 min', leida: false },
        { id: '3', titulo: 'Pago recibido', mensaje: 'Se ha procesado el pago de tus últimos 5 viajes', fecha: 'hace 3 horas', leida: false },
        { id: '4', titulo: 'Calificación alta', mensaje: '¡Felicidades! Mantuviste 4.9 estrellas este mes', fecha: 'hace 1 día', leida: true },
    ],
    dueño: [
        { id: '1', titulo: 'Reporte semanal', mensaje: 'Revisa las estadísticas de esta semana', fecha: 'hace 10 min', leida: false },
        { id: '2', titulo: 'Alerta de conductor', mensaje: 'Carlos Rodríguez reportó un problema mecánico', fecha: 'hace 1 hora', leida: false },
        { id: '3', titulo: 'Ingresos actualizados', mensaje: 'Nuevos ingresos registrados en el sistema', fecha: 'hace 4 horas', leida: true },
        { id: '4', titulo: 'Nuevo conductor', mensaje: 'María López completó su registro', fecha: 'hace 2 días', leida: true },
    ]
};

export const NotificationProvider = ({ children }) => {
    const { user } = useAuth();
    const [notificaciones, setNotificaciones] = useState([]);

    // Cargar notificaciones según el rol del usuario
    useEffect(() => {
        if (user && user.rol) {
            const notificacionesDelRol = NOTIFICACIONES_POR_ROL[user.rol] || [];
            setNotificaciones(notificacionesDelRol);
        } else {
            setNotificaciones([]);
        }
    }, [user]);

    // Contar notificaciones no leídas
    const noLeidas = notificaciones.filter(n => !n.leida).length;

    // Marcar notificación como leída
    const marcarComoLeida = (id) => {
        setNotificaciones(prev =>
            prev.map(n => n.id === id ? { ...n, leida: true } : n)
        );
    };

    // Marcar todas como leídas
    const marcarTodasComoLeidas = () => {
        setNotificaciones(prev =>
            prev.map(n => ({ ...n, leida: true }))
        );
    };

    // Limpiar todas las notificaciones
    const limpiarNotificaciones = () => {
        setNotificaciones([]);
    };

    // Agregar nueva notificación
    const agregarNotificacion = (titulo, mensaje) => {
        const nuevaNotificacion = {
            id: Date.now().toString(),
            titulo,
            mensaje,
            fecha: 'Ahora',
            leida: false
        };
        setNotificaciones(prev => [nuevaNotificacion, ...prev]);
    };

    return (
        <NotificationContext.Provider value={{
            notificaciones,
            noLeidas,
            marcarComoLeida,
            marcarTodasComoLeidas,
            limpiarNotificaciones,
            agregarNotificacion
        }}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications debe usarse dentro de NotificationProvider');
    }
    return context;
};
