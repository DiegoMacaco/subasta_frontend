import React, { useState } from 'react';
import { usuariosAPI } from '../services/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  motherLastName?: string;
  password?: string;
  phone?: string;
  address?: string;
  createdAt?: string;
}

interface RegisterProps {
  onRegister: (user: User) => void;
  onNavigate: (page: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onNavigate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    motherLastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones del frontend
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!formData.phone || formData.phone.length < 8) {
      setError('Ingresa un número de teléfono válido');
      return;
    }

    setLoading(true);

    try {
      const response = await usuariosAPI.registro({
        firstName: formData.firstName,
        lastName: formData.lastName,
        motherLastName: formData.motherLastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });

      // Registro exitoso - solo mostrar mensaje y redirigir al login
      alert(`¡Registro exitoso! ${formData.firstName}, ahora puedes iniciar sesión.`);
      
      // Redirigir al login SIN auto-loguear
      onNavigate('login');
      
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Error al registrar. Intenta nuevamente.';
      setError(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage);
      console.error('Error en registro:', error);
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
      
      <div className="relative z-10 w-full max-w-2xl p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg text-white">
        <h1 className="text-4xl font-black mb-4 text-center">Únete a Qhatu</h1>
        <p className="text-center text-slate-200 mb-8">
          Crea tu cuenta y empieza a descubrir las mejores subastas.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="Nombre"
              value={formData.firstName}
              onChange={handleChange}
              required
              disabled={loading}
              className="p-3 rounded-lg bg-white/20 border border-white/30 placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FFD700] w-full disabled:opacity-50"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Apellido Paterno"
              value={formData.lastName}
              onChange={handleChange}
              required
              disabled={loading}
              className="p-3 rounded-lg bg-white/20 border border-white/30 placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FFD700] w-full disabled:opacity-50"
            />
            <input
              type="text"
              name="motherLastName"
              placeholder="Apellido Materno"
              value={formData.motherLastName}
              onChange={handleChange}
              disabled={loading}
              className="p-3 rounded-lg bg-white/20 border border-white/30 placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FFD700] md:col-span-2 w-full disabled:opacity-50"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
            className="p-3 rounded-lg bg-white/20 border border-white/30 placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FFD700] w-full disabled:opacity-50"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={loading}
            className="p-3 rounded-lg bg-white/20 border border-white/30 placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FFD700] w-full disabled:opacity-50"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="p-3 rounded-lg bg-white/20 border border-white/30 placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FFD700] w-full disabled:opacity-50"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={loading}
              className="p-3 rounded-lg bg-white/20 border border-white/30 placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#FFD700] w-full disabled:opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#FFD700] text-[#101c22] font-bold rounded-lg hover:bg-[#E0BB4A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="mb-3">¿Ya tienes cuenta?</p>
          <button
            onClick={() => onNavigate('login')}
            disabled={loading}
            className="bg-[#003366] px-6 py-2 rounded-lg font-semibold hover:bg-[#004488] transition-colors disabled:opacity-50"
          >
            Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;