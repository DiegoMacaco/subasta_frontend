import React from 'react';

interface HeaderProps {
  user: any;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onNavigate }) => {
  return (
    <header className="bg-qhatu-dark text-qhatu-light font-poppins shadow-md">
      <nav className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold cursor-pointer" onClick={() => onNavigate('home')}>
          Qhatu
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onNavigate('home')}
            className="text-qhatu-light hover:text-qhatu-accent font-semibold"
          >
            Inicio
          </button>
          <button
            onClick={() => onNavigate('subastas')}
            className="text-qhatu-light hover:text-qhatu-accent font-semibold"
          >
            Subastas
          </button>

          {user ? (
            <>
              <button
                onClick={() => onNavigate('perfil')}
                className="text-qhatu-light hover:text-qhatu-accent font-semibold"
              >
                Mi Perfil
              </button>
              <span className="text-qhatu-accent ml-2">Hola, {user.firstName}</span>
              <button
                onClick={onLogout}
                className="bg-qhatu-accent text-qhatu-dark px-3 py-1 rounded hover:bg-qhatu-light transition"
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <button
              onClick={() => onNavigate('login')}
              className="bg-qhatu-accent text-qhatu-dark px-3 py-1 rounded hover:bg-qhatu-light transition"
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
