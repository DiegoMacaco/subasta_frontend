interface HomeProps {
  user: any;
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ user, onNavigate }) => {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-qhatu-light rounded-lg shadow-lg">
      <h1 className="text-center text-3xl font-poppins font-bold mb-4 text-qhatu-dark">
        {user ? `¡Bienvenido ${user.firstName}!` : 'Bienvenido a Qhatu'}
      </h1>
      <p className="text-center mb-8 text-qhatu-text">
        Inicio de sesión
      </p>

      <div className="flex justify-center gap-4">
        {!user ? (
          <>
            <button
              onClick={() => onNavigate('login')}
              className="px-6 py-2 bg-qhatu-accent text-qhatu-dark font-semibold rounded hover:bg-qhatu-dark hover:text-qhatu-light transition"
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => onNavigate('registro')}
              className="px-6 py-2 bg-qhatu-dark text-qhatu-light font-semibold rounded hover:bg-qhatu-accent hover:text-qhatu-dark transition"
            >
              Registrarse
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onNavigate('subastas')}
              className="px-6 py-2 bg-qhatu-accent text-qhatu-dark font-semibold rounded hover:bg-qhatu-dark hover:text-qhatu-light transition"
            >
              Ver Subastas
            </button>
            <button
              onClick={() => onNavigate('perfil')}
              className="px-6 py-2 bg-qhatu-dark text-qhatu-light font-semibold rounded hover:bg-qhatu-accent hover:text-qhatu-dark transition"
            >
              Mi Perfil
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
