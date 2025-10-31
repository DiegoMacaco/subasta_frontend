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
      firstName: email.split('@')[0],
      lastName: ''
    };
    onLogin(user); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F9F8] py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#89C9B8]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#2E594E]">Iniciar Sesión</h2>
          <p className="text-gray-600 mt-2">Bienvenido de vuelta a Qhatu</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 font-semibold text-[#333333]">
              Correo electrónico
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#89C9B8] transition-colors"
              required 
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-[#333333]">
              Contraseña
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#89C9B8] transition-colors"
              required 
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#89C9B8] text-white py-3 rounded-lg font-semibold hover:bg-[#2E594E] transition-colors"
          >
            Ingresar
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#333333] mb-3">¿No tienes cuenta?</p>
          <button 
            onClick={() => onNavigate('registro')}
            className="w-full px-4 py-3 border-2 border-[#89C9B8] text-[#89C9B8] rounded-lg font-semibold hover:bg-[#EFD780] hover:border-[#EFD780] hover:text-[#2E594E] transition-colors"
          >
            Crear cuenta nueva
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;