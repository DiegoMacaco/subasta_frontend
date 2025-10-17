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
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-qhatu-light rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-poppins font-bold text-qhatu-dark mb-4">
          No hay usuario logueado
        </h2>
        <button
          onClick={() => onNavigate('login')}
          className="px-6 py-2 bg-qhatu-accent text-qhatu-dark font-semibold rounded hover:bg-qhatu-dark hover:text-qhatu-light transition"
        >
          Ir a Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-qhatu-light rounded-lg shadow-lg">
      <h2 className="text-3xl font-poppins font-bold text-qhatu-dark mb-6 text-center">
        Mi Perfil
      </h2>

      <div className="space-y-4 text-qhatu-dark">
        <div className="flex justify-between">
          <span className="font-semibold">Nombre:</span>
          <span>{user.firstName} {user.lastName}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Email:</span>
          <span>{user.email}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Teléfono:</span>
          <span>{user.phone || '-'}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold">Dirección:</span>
          <span>{user.address || '-'}</span>
        </div>

        {user.createdAt && (
          <div className="flex justify-between">
            <span className="font-semibold">Miembro desde:</span>
            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => onNavigate('home')}
          className="px-6 py-2 bg-qhatu-accent text-qhatu-dark font-semibold rounded hover:bg-qhatu-dark hover:text-qhatu-light transition"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default Perfil;
