interface HomeProps {
  user: any;
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ user, onNavigate }) => {
  return (
    <div className="card">
      <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>
        {user ? `¡Bienvenido ${user.firstName}!` : 'Bienvenido a Subastas Online'}
      </h1>
      <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
        inico de secion 
      </p>
      
      {!user ? (
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => onNavigate('login')} className="btn btn-primary">
            Iniciar Sesión
          </button>
          <button onClick={() => onNavigate('registro')} className="btn btn-success" style={{ marginLeft: '1rem' }}>
            Registrarse
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <button onClick={() => onNavigate('subastas')} className="btn btn-primary">
            Ver Subastas
          </button>
          <button onClick={() => onNavigate('perfil')} className="btn btn-success" style={{ marginLeft: '1rem' }}>
            Mi Perfil
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;