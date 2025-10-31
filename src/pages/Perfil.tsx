import React from 'react';

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

interface PerfilProps {
  user: User | null;
  onNavigate: (page: string) => void;
}

const Perfil: React.FC<PerfilProps> = ({ user, onNavigate }) => {
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F9F8] py-12 px-4">
      <div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#89C9B8]">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-[#89C9B8] to-[#2E594E] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
            {user.firstName.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-3xl font-bold text-[#2E594E]">
            Mi Perfil
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-[#F8F9F8] p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#333333]">Nombre completo:</span>
              <span className="text-[#2E594E]">{user.firstName} {user.lastName}</span>
            </div>
          </div>

          <div className="bg-[#F8F9F8] p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#333333]">Email:</span>
              <span className="text-[#2E594E]">{user.email}</span>
            </div>
          </div>

          <div className="bg-[#F8F9F8] p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#333333]">Teléfono:</span>
              <span className="text-[#2E594E]">{user.phone || 'No proporcionado'}</span>
            </div>
          </div>

          <div className="bg-[#F8F9F8] p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-[#333333]">Dirección:</span>
              <span className="text-[#2E594E]">{user.address || 'No proporcionada'}</span>
            </div>
          </div>

          {user.createdAt && (
            <div className="bg-[#F8F9F8] p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#333333]">Miembro desde:</span>
                <span className="text-[#2E594E]">{new Date(user.createdAt).toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => onNavigate('home')}
            className="flex-1 px-6 py-3 bg-gray-200 text-[#333333] font-semibold rounded-lg hover:bg-gray-300 transition-colors"
          >
            Volver al Inicio
          </button>
          <button
            onClick={() => onNavigate('subastas')}
            className="flex-1 px-6 py-3 bg-[#89C9B8] text-white font-semibold rounded-lg hover:bg-[#2E594E] transition-colors"
          >
            Ver Subastas
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;