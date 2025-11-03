import React, { useState } from 'react';

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
    address: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      motherLastName: formData.motherLastName,
      password: formData.password,
      phone: formData.phone,
      address: formData.address,
      createdAt: new Date().toISOString()
    };

    onRegister(newUser);
    alert(`¡Registro exitoso! Bienvenido/a ${formData.firstName}`);
  };

  return (
    <div className="font-display bg-[#101c22] text-slate-200 min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <img
        src="https://plus.unsplash.com/premium_photo-1681487977919-306ef7194d98?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHN1YmFzdGFzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500?auto=format&fit=crop&w=1600&q=60"
        alt="Fondo Qhatu"
        className="absolute inset-0 w-full h-full object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-[#60A5FA]/30"></div>
      <div className="relative z-10 w-full max-w-2xl p-8 bg-white/10 backdrop-blur-md rounded-xl shadow-lg text-white">
        <h1 className="text-4xl font-black mb-4 text-center">Únete a Qhatu</h1>
        <p className="text-center text-slate-200 mb-8">Crea tu cuenta y empieza a descubrir las mejores subastas.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="Nombre"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="p-3 rounded-lg bg-white/20 border border-white/30 placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EFD780] w-full"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Apellido Paterno"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="p-3 rounded-lg bg-white/20 border border-white/30 placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EFD780] w-full"
            />
            <input
              type="text"
              name="motherLastName"
              placeholder="Apellido Materno"
              value={formData.motherLastName}
              onChange={handleChange}
              required
              className="p-3 rounded-lg bg-white/20 border border-white/30 placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EFD780] md:col-span-2 w-full"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-white/20 border border-white/30 placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EFD780] w-full"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Teléfono"
            value={formData.phone}
            onChange={handleChange}
            required
            className="p-3 rounded-lg bg-white/20 border border-white/30 placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EFD780] w-full"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
              className="p-3 rounded-lg bg-white/20 border border-white/30 placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EFD780] w-full"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="p-3 rounded-lg bg-white/20 border border-white/30 placeholder:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#EFD780] w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#EFD780] text-[#2E594E] font-bold rounded-lg hover:bg-[#f5e197] transition-colors"
          >
            Crear Cuenta
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="mb-3">¿Ya tienes cuenta?</p>
          <button
            onClick={() => onNavigate('login')}
            className="bg-[#13a4ec] px-6 py-2 rounded-lg font-semibold hover:bg-[#1192d4] transition-colors"
          >
            Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
