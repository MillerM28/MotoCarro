import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const ViajesContext = createContext();

// Mock data de viajes disponibles
const VIAJES_MOCK = [
    {
        id: '1',
        origen: 'Centro Comercial',
        destino: 'Barrio Norte',
        tipo: 'Pasajero',
        distancia: 3.5,
        precioEstimado: 6500,
        cliente: 'Ana Martínez',
        estado: 'disponible'
    },
    {
        id: '2',
        origen: 'Terminal de Buses',
        destino: 'Universidad',
        tipo: 'Paquete',
        distancia: 5.2,
        precioEstimado: 8200,
        cliente: 'Carlos Ruiz',
        estado: 'disponible'
    },
    {
        id: '3',
        origen: 'Supermercado Central',
        destino: 'Barrio Sur',
        tipo: 'Mercancía',
        distancia: 2.8,
        precioEstimado: 5800,
        cliente: 'María López',
        estado: 'disponible'
    },
];

export const ViajesProvider = ({ children }) => {
    const { user } = useAuth();
    const [viajesDisponibles, setViajesDisponibles] = useState(VIAJES_MOCK);
    const [viajesAceptados, setViajesAceptados] = useState([]);
    const [historialViajes, setHistorialViajes] = useState([]);

    // Aceptar un viaje (Conductor)
    const aceptarViaje = (viajeId) => {
        const viaje = viajesDisponibles.find(v => v.id === viajeId);
        if (!viaje || viaje.estado !== 'disponible') {
            return { success: false, message: 'Viaje no disponible' };
        }

        // Actualizar estado del viaje
        const viajeAceptado = {
            ...viaje,
            estado: 'aceptado',
            conductorId: user?.id,
            conductorNombre: user?.nombre,
            fechaAceptacion: new Date().toISOString()
        };

        setViajesDisponibles(prev => prev.filter(v => v.id !== viajeId));
        setViajesAceptados(prev => [...prev, viajeAceptado]);

        return { success: true, viaje: viajeAceptado };
    };

    // Completar viaje
    const completarViaje = (viajeId, detalles = {}) => {
        const viaje = viajesAceptados.find(v => v.id === viajeId);
        if (!viaje) {
            return { success: false, message: 'Viaje no encontrado' };
        }

        const viajeCompletado = {
            ...viaje,
            estado: 'completado',
            fechaCompletado: new Date().toISOString(),
            ...detalles
        };

        setViajesAceptados(prev => prev.filter(v => v.id !== viajeId));
        setHistorialViajes(prev => [viajeCompletado, ...prev]);

        return { success: true, viaje: viajeCompletado };
    };

    // Cancelar viaje
    const cancelarViaje = (viajeId, motivo = '') => {
        const viaje = viajesAceptados.find(v => v.id === viajeId);
        if (!viaje) {
            return { success: false, message: 'Viaje no encontrado' };
        }

        // Devolver a disponibles
        const viajeCancelado = {
            ...viaje,
            estado: 'disponible',
            conductorId: null,
            conductorNombre: null
        };

        setViajesAceptados(prev => prev.filter(v => v.id !== viajeId));
        setViajesDisponibles(prev => [...prev, viajeCancelado]);

        return { success: true, motivo };
    };

    // Calificar conductor (Cliente)
    const calificarConductor = (viajeId, calificacion, comentario = '') => {
        setHistorialViajes(prev =>
            prev.map(v =>
                v.id === viajeId
                    ? { ...v, calificacion, comentario, calificado: true }
                    : v
            )
        );
        return { success: true };
    };

    // Agregar nuevo viaje disponible (para simular solicitudes de clientes)
    const agregarViajeDisponible = (viaje) => {
        const nuevoViaje = {
            id: Date.now().toString(),
            ...viaje,
            estado: 'disponible',
            fechaSolicitud: new Date().toISOString()
        };
        setViajesDisponibles(prev => [nuevoViaje, ...prev]);
        return { success: true, viaje: nuevoViaje };
    };

    return (
        <ViajesContext.Provider value={{
            viajesDisponibles,
            viajesAceptados,
            historialViajes,
            aceptarViaje,
            completarViaje,
            cancelarViaje,
            calificarConductor,
            agregarViajeDisponible
        }}>
            {children}
        </ViajesContext.Provider>
    );
};

export const useViajes = () => {
    const context = useContext(ViajesContext);
    if (!context) {
        throw new Error('useViajes debe usarse dentro de ViajesProvider');
    }
    return context;
};
