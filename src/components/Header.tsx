import React from 'react';

interface HeaderProps {
  user: any;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onNavigate }) => {
  return (
    <header className="bg-[#2E594E] text-[#F8F9F8] shadow-lg">
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <div 
          className="text-2xl font-bold cursor-pointer hover:text-[#EFD780] transition-colors"
          onClick={() => onNavigate('home')}
        >
          Qhatu
        </div>
        
        <div className="flex items-center space-x-6">
          <button
            onClick={() => onNavigate('home')}
            className="text-[#F8F9F8] hover:text-[#EFD780] font-semibold transition-colors"
          >
            Inicio
          </button>
          
          <button
            onClick={() => onNavigate('subastas')}
            className="text-[#F8F9F8] hover:text-[#EFD780] font-semibold transition-colors"
          >
            Subastas
          </button>

          {user ? (
            <>
              <button
                onClick={() => onNavigate('perfil')}
                className="text-[#F8F9F8] hover:text-[#EFD780] font-semibold transition-colors"
              >
                Mi Perfil
              </button>
              
              <button
                onClick={onLogout}
                className="bg-[#EFD780] text-[#2E594E] px-4 py-2 rounded-lg font-semibold hover:bg-[#89C9B8] transition-colors"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className="bg-[#EFD780] text-[#2E594E] px-4 py-2 rounded-lg font-semibold hover:bg-[#89C9B8] transition-colors"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;