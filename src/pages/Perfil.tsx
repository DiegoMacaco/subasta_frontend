import React, { useState } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  phone?: string;
  address?: string;
  createdAt?: string;
}

interface Subasta {
  id: string;
  titulo: string;
  precioActual: number;
  fechaFin: string;
  imagen?: string;
  miPuja?: number;
  estado: 'activa' | 'ganada' | 'perdida';
}

interface PerfilProps {
  user: User | null;
  onNavigate: (page: string) => void;
  subastas?: Subasta[];
}

const Perfil: React.FC<PerfilProps> = ({ user, onNavigate, subastas = [] }) => {
  const [tabActiva, setTabActiva] = useState<'activa' | 'ganada' | 'perdida'>('activa');

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F8F9F8]">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center border-t-4 border-[#89C9B8]">
          <div className="text-6xl mb-4">👤</div>
          <h2 className="text-2xl font-bold text-[#2E594E] mb-4">
            No hay usuario logueado
          </h2>
          <p className="text-gray-600 mb-6">Inicia sesión para ver tu perfil</p>
          <button
            onClick={() => onNavigate('login')}
            className="w-full px-6 py-3 bg-[#89C9B8] text-white font-semibold rounded-lg hover:bg-[#2E594E] transition-colors"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  const subastasFiltradas = subastas.filter(s => s.estado === tabActiva);

  return (
    <div className="min-h-screen bg-[#F8F9F8] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-[#101c22]">Perfl</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[#101c22] to-[#003366] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                  {user.firstName.charAt(0).toUpperCase()}
                </div>
                <h2 className="text-xl font-bold text-[#2E594E] mb-1">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center text-sm">
                  <span className="text-gray-600 w-24">Teléfono:</span>
                  <span className="text-[#2E594E] font-medium">{user.phone || 'No agregado'}</span>
                </div>
                <div className="flex items-start text-sm">
                  <span className="text-gray-600 w-24">Dirección:</span>
                  <span className="text-[#2E594E] font-medium flex-1">{user.address || 'No agregada'}</span>
                </div>
                {user.createdAt && (
                  <div className="flex items-center text-sm">
                    <span className="text-gray-600 w-24">Miembro desde:</span>
                    <span className="text-[#2E594E] font-medium">
                      {new Date(user.createdAt).toLocaleDateString('es-ES', { 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                )}
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => onNavigate('logout')}
                  className="w-full px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors text-sm"
                   > Cerrar Secion </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="border-b px-6 py-4">
                <h3 className="text-xl font-bold text-[#2E594E]">Mis Subastas</h3>
              </div>
              <div className="border-b px-6">
                <div className="flex gap-6">
                  <button 
                    onClick={() => setTabActiva('activa')}
                    className={`py-3 border-b-2 font-semibold text-sm transition-colors ${
                      tabActiva === 'activa' 
                        ? 'border-[#101c22] text-[#2E594E]' 
                        : 'border-transparent text-gray-600 hover:text-[#2E594E]'
                    }`}
                  >
                    Activas ({subastas.filter(s => s.estado === 'activa').length})
                  </button>
                  <button 
                    onClick={() => setTabActiva('ganada')}
                    className={`py-3 border-b-2 font-semibold text-sm transition-colors ${
                      tabActiva === 'ganada' 
                        ? 'border-[#101c22] text-[#2E594E]' 
                        : 'border-transparent text-gray-600 hover:text-[#2E594E]'
                    }`}
                  >
                    Ganadas ({subastas.filter(s => s.estado === 'ganada').length})
                  </button>
                  <button 
                    onClick={() => setTabActiva('perdida')}
                    className={`py-3 border-b-2 font-semibold text-sm transition-colors ${
                      tabActiva === 'perdida' 
                        ? 'border-[#101c22] text-[#2E594E]' 
                        : 'border-transparent text-gray-600 hover:text-[#2E594E]'
                    }`}
                  >
                    Perdidas ({subastas.filter(s => s.estado === 'perdida').length})
                  </button>
                </div>
              </div>
              <div className="p-6">
                {subastasFiltradas.length === 0 ? (
                  <div className="text-center py-12">
                    
                    <h4 className="text-xl font-semibold text-[#2E594E] mb-2">
                      {tabActiva === 'activa' && 'No tienes subastas activas'}
                      {tabActiva === 'ganada' && 'No has ganado subastas aún'}
                      {tabActiva === 'perdida' && 'No tienes subastas perdidas'}
                    </h4>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {subastasFiltradas.map((subasta) => (
                      <div key={subasta.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex gap-4">
                          <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                            {subasta.imagen ? (
                              <img src={subasta.imagen} alt={subasta.titulo} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-4xl"></span>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-semibold text-[#2E594E] mb-2 line-clamp-2">
                              {subasta.titulo}
                            </h4>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                              <div>
                                <span className="text-gray-600">Precio actual:</span>
                                <div className="text-lg font-bold text-[#2E594E]">
                                  Bs. {subasta.precioActual.toFixed(2)}
                                </div>
                              </div>
                              <div>
                                <span className="text-gray-600">Tu puja:</span>
                                <div className="text-lg font-bold text-[#89C9B8]">
                                  Bs. {subasta.miPuja?.toFixed(2) || '0.00'}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="text-sm">
                                <span className="text-gray-600">Finaliza: </span>
                                <span className="font-medium text-[#2E594E]">
                                  {new Date(subasta.fechaFin).toLocaleDateString('es-ES', {
                                    day: 'numeric',
                                    month: 'short',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  })}
                                </span>
                              </div>
                              
                              <button
                                onClick={() => onNavigate('subastas')}
                                className="px-4 py-2 bg-[#89C9B8] text-white font-medium rounded-lg hover:bg-[#2E594E] transition-colors text-sm"
                              >
                                Ver Subasta
                              </button>
                            </div>
                          </div>
                        </div>

                        {tabActiva === 'activa' && subasta.miPuja && subasta.miPuja >= subasta.precioActual && (
                          <div className="mt-3 px-3 py-2 bg-green-50 border border-green-200 rounded text-sm text-green-700 flex items-center gap-2">
                            <span className="font-bold">✓</span>
                            <span>Vas ganando esta subasta</span>
                          </div>
                        )}

                        {tabActiva === 'ganada' && (
                          <div className="mt-3 px-3 py-2 bg-green-50 border border-green-200 rounded text-sm text-green-700 flex items-center gap-2">
                            <span>¡Felicidades! Ganaste esta subasta</span>
                          </div>
                        )}

                        {tabActiva === 'perdida' && (
                          <div className="mt-3 px-3 py-2 bg-red-50 border border-red-200 rounded text-sm text-red-700 flex items-center gap-2">
                            <span>Alguien más ganó esta subasta</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const usuarioEjemplo: User = {
    id: '1',
    email: 'juan.perez@email.com',
    firstName: 'Juan',
    lastName: 'Pérez',
    phone: '+591 78945612',
    address: 'Av. Arce #2345, La Paz',
    createdAt: '2023-06-15T10:00:00Z'
  };

  const subastasEjemplo: Subasta[] = [
    {
      id: '1',
      titulo: 'iPhone 14 Pro Max 256GB - Nuevo en caja',
      precioActual: 5000,
      fechaFin: '2024-12-20T18:00:00',
      imagen: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400',
      miPuja: 5200,
      estado: 'activa'
    },
    {
      id: '2',
      titulo: 'MacBook Air M2 - Como nuevo',
      precioActual: 8500,
      fechaFin: '2024-12-18T20:00:00',
      miPuja: 8300,
      estado: 'activa'
    },
    {
      id: '3',
      titulo: 'PlayStation 5 + 2 Controles',
      precioActual: 4200,
      fechaFin: '2024-12-10T15:00:00',
      miPuja: 4500,
      estado: 'ganada'
    },
    {
      id: '4',
      titulo: 'Samsung Galaxy S23 Ultra',
      precioActual: 6800,
      fechaFin: '2024-12-05T19:00:00',
      miPuja: 6500,
      estado: 'perdida'
    }
  ];

  return (
    <Perfil 
      user={usuarioEjemplo}
      onNavigate={(page) => console.log('Navegar a:', page)}
      subastas={subastasEjemplo}
    />
  );
}