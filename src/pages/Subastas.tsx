interface SubastasProps {
  user: any;
  onNavigate: (page: string) => void;
}

const Subastas: React.FC<SubastasProps> = ({ user, onNavigate }) => {
  if (!user) {
    return (
      <div className="card text-center">
        <h2>Acceso Requerido</h2>
        <p>Debes iniciar sesión para ver las subastas</p>
        <button onClick={() => onNavigate('login')} className="btn btn-primary">
          Iniciar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <h1 style={{ textAlign: 'center' }}>Subastas Activas</h1>
      
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <h3>Todavia no sean realizado subastas </h3>
      </div>
      
      <button 
        onClick={() => onNavigate('home')} 
        className="btn btn-secondary" 
        style={{ marginTop: '2rem' }}
      >
        Volver al Inicio
      </button>
    </div>
  );
};

export default Subastas;