import React, { useState } from 'react';
import { usuariosAPI } from '../services/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  motherLastName?: string;
  phone?: string;
  createdAt?: string;
}

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validación básica
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    setLoading(true);

    try {
      // Llamada a la API de login
      const response = await usuariosAPI.login({
        email: email,
        password: password,
      });

      // Usuario autenticado exitosamente
      const usuarioAutenticado = response.data;
      
      const user: User = {
        id: usuarioAutenticado.id,
        email: usuarioAutenticado.correo || email,
        firstName: usuarioAutenticado.nombre,
        lastName: usuarioAutenticado.apellidoPaterno,
        motherLastName: usuarioAutenticado.apellidoMaterno,
        phone: usuarioAutenticado.telefono,
        createdAt: usuarioAutenticado.createdAt,
      };

      // Guardar token si la API lo devuelve
      if (usuarioAutenticado.token) {
        localStorage.setItem('token', usuarioAutenticado.token);
      }

      onLogin(user);
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error al iniciar sesión. Verifica tus credenciales.';
      setError(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage);
      console.error('Error en login:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-display bg-[#101c22] text-slate-200 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <img
        src="https://plus.unsplash.com/premium_photo-1681487977919-306ef7194d98?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHN1YmFzdGFzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500"
        alt="Fondo Qhatu"
        className="absolute inset-0 w-full h-full object-cover opacity-45"
      />

      <div className="absolute inset-0 bg-[#003366]/30"></div>
      <div className="relative z-10 text-center max-w-lg p-8">
        <h1 className="text-5xl font-black text-white mb-4">Únete a Qhatu</h1>
        <p className="text-lg text-slate-200 mb-10">
          Descubre las mejores subastas.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-center max-w-md mx-auto">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-[#ffffff10] backdrop-blur-md p-6 rounded-xl shadow-lg max-w-md mx-auto"
        >
          <label className="flex flex-col text-left">
            <span className="text-sm font-medium text-white mb-1">Correo electrónico</span>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(''); // Limpiar error al escribir
              }}
              placeholder="tu@email.com"
              disabled={loading}
              className="px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700] disabled:opacity-50"
              required
            />
          </label>

          <label className="flex flex-col text-left">
            <span className="text-sm font-medium text-white mb-1">Contraseña</span>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(''); // Limpiar error al escribir
              }}
              placeholder="••••••••"
              disabled={loading}
              className="px-4 py-3 rounded-lg bg-white/10 text-white border border-white/30 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#FFD700] disabled:opacity-50"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#FFD700] text-[#003366] font-bold py-3 rounded-lg hover:bg-[#E0BB4A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <div className="mt-8">
          <button
            onClick={() => onNavigate('registro')}
            disabled={loading}
            className="bg-[#003366] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#004488] transition-colors disabled:opacity-50"
          >
            Crear cuenta nueva
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;