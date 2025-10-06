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
      <div className="profile-container">
        <h2>No hay usuario logueado</h2>
        <button onClick={() => onNavigate('login')}>
          Ir a Login
        </button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Mi Perfil</h2>
        
        <div className="profile-info">
          <div className="info-group">
            <label>Nombre:</label>
            <p>{user.firstName} {user.lastName}</p>
          </div>
          
          <div className="info-group">
            <label>Email:</label>
            <p>{user.email}</p>
          </div>
          
          <div className="info-group">
            <label>Teléfono:</label>
            <p>{user.phone}</p>
          </div>
          
          <div className="info-group">
            <label>Dirección:</label>
            <p>{user.address}</p>
          </div>
          
          {user.createdAt && (
            <div className="info-group">
              <label>Miembro desde:</label>
              <p>{new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          )}
        </div>

        <div className="profile-actions">
          <button 
            onClick={() => onNavigate('home')}
            className="back-btn"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Perfil;