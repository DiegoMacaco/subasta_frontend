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
    <div className="flex items-center justify-center min-h-screen bg-[#F8F9F8] py-12 px-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#89C9B8]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#2E594E] mb-2">Crear Cuenta</h2>
          <p className="text-[#333333]">Únete a nuestra plataforma de subastas</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="mb-2 font-semibold text-[#333333]">Nombre *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
                className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#89C9B8] transition-colors"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="lastName" className="mb-2 font-semibold text-[#333333]">Apellido Paterno *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Apellido paterno"
                required
                className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#89C9B8] transition-colors"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label htmlFor="motherLastName" className="mb-2 font-semibold text-[#333333]">Apellido Materno *</label>
              <input
                type="text"
                id="motherLastName"
                name="motherLastName"
                value={formData.motherLastName}
                onChange={handleChange}
                placeholder="Apellido materno"
                required
                className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#89C9B8] transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2 font-semibold text-[#333333]">Correo electrónico *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
              className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#89C9B8] transition-colors"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-2 font-semibold text-[#333333]">Teléfono *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Tu número de teléfono"
              required
              className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#89C9B8] transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2 font-semibold text-[#333333]">Contraseña *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 6 caracteres"
                required
                className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#89C9B8] transition-colors"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="mb-2 font-semibold text-[#333333]">Confirmar Contraseña *</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
                required
                className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#89C9B8] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#89C9B8] text-white font-semibold rounded-lg hover:bg-[#2E594E] transition-colors"
          >
            Crear Cuenta
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="mb-3 text-[#333333]">¿Ya tienes cuenta?</p>
          <button
            onClick={() => onNavigate('login')}
            className="text-[#89C9B8] font-semibold hover:text-[#2E594E] transition-colors"
          >
            Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;