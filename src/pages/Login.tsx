import React, { useState } from 'react';

interface LoginProps {
  onLogin: (user: any) => void;
  onNavigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      id: email,      
      email,
      firstName: '',
      lastName: ''
    };
    onLogin(user); 
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-qhatu-light rounded shadow font-poppins">
      <h2 className="text-2xl font-bold mb-6 text-qhatu-dark text-center">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-qhatu-text">Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-qhatu-base rounded focus:outline-none focus:ring-2 focus:ring-qhatu-accent"
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium text-qhatu-text">Contraseña:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-qhatu-base rounded focus:outline-none focus:ring-2 focus:ring-qhatu-accent"
            required 
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-qhatu-base text-qhatu-light py-2 rounded hover:bg-qhatu-dark transition"
        >
          Ingresar
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-qhatu-text">¿No tienes cuenta?</p>
        <button 
          onClick={() => onNavigate('registro')}
          className="mt-2 px-4 py-2 border border-qhatu-base text-qhatu-base rounded hover:bg-qhatu-accent hover:text-qhatu-dark transition"
        >
          Regístrate aquí
        </button>
      </div>
    </div>
  );
};

export default Login;
