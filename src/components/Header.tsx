interface HeaderProps {
  user: any;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onNavigate }) => {
  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">Subastas-App</div>
        <div className="nav-links">
          <button 
            onClick={() => onNavigate('home')} 
            className="nav-link"
          >
            Inicio
          </button>
          <button 
            onClick={() => onNavigate('subastas')} 
            className="nav-link"
          >
            Subastas
          </button>
          {user ? (
            <>
              <button 
                onClick={() => onNavigate('perfil')} 
                className="nav-link"
              >
                Mi Perfil
              </button>
              <span>Hola, {user.firstName}</span>
              <button onClick={onLogout} className="btn btn-danger">
                Cerrar Sesión
              </button>
            </>
          ) : (
            <button onClick={() => onNavigate('login')} className="btn btn-primary">
              Iniciar Sesión
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;