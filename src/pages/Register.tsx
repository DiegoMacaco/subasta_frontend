import React, { useState } from 'react';

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

interface RegisterProps {
  onRegister: (user: User) => void;
  onNavigate: (page: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onNavigate }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
      password: formData.password,
      phone: formData.phone,
      address: formData.address,
      createdAt: new Date().toISOString()
    };

    onRegister(newUser);
    alert('¡Registro exitoso! Bienvenido/a ' + formData.firstName);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-qhatu-light rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-poppins font-bold text-qhatu-dark mb-2">Crear Cuenta</h2>
        <p className="text-qhatu-text">Únete a nuestra plataforma de subastas</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="firstName" className="mb-1 font-semibold text-qhatu-dark">Nombre</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
              className="p-2 border border-qhatu-dark rounded focus:outline-none focus:ring-2 focus:ring-qhatu-accent"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="lastName" className="mb-1 font-semibold text-qhatu-dark">Apellido Paterno</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Apellido Paterno"
              required
              className="p-2 border border-qhatu-dark rounded focus:outline-none focus:ring-2 focus:ring-qhatu-accent"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName" className="mb-1 font-semibold text-qhatu-dark">Apellido Materno</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Apellido Materno"
              required
              className="p-2 border border-qhatu-dark rounded focus:outline-none focus:ring-2 focus:ring-qhatu-accent"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-semibold text-qhatu-dark">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            required
            className="p-2 border border-qhatu-dark rounded focus:outline-none focus:ring-2 focus:ring-qhatu-accent"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-1 font-semibold text-qhatu-dark">Teléfono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder=""
            required
            className="p-2 border border-qhatu-dark rounded focus:outline-none focus:ring-2 focus:ring-qhatu-accent"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password" className="mb-1 font-semibold text-qhatu-dark">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mínimo 6 caracteres"
            required
            className="p-2 border border-qhatu-dark rounded focus:outline-none focus:ring-2 focus:ring-qhatu-accent"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="mb-1 font-semibold text-qhatu-dark">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Repite tu contraseña"
            required
            className="p-2 border border-qhatu-dark rounded focus:outline-none focus:ring-2 focus:ring-qhatu-accent"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-qhatu-accent text-qhatu-dark font-semibold rounded hover:bg-qhatu-dark hover:text-qhatu-light transition"
        >
          Crear Cuenta
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="mb-2 text-qhatu-text">¿Ya tienes cuenta?</p>
        <button
          onClick={() => onNavigate('login')}
          className="text-qhatu-accent font-semibold hover:text-qhatu-dark transition"
        >
          Inicia sesión aquí
        </button>
      </div>
    </div>
  );
};

export default Register;
