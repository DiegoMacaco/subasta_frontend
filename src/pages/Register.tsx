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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>Crear Cuenta</h2>
          <p>Únete a nuestra plataforma de subastas</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Nombre</label>
              <input 
                type="text" 
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Tu nombre"
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Apellido</label>
              <input 
                type="text" 
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Tu apellido"
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono (Opcional)</label>
            <input 
              type="tel" 
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 234 567 8900"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Dirección (Opcional)</label>
            <input 
              type="text" 
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Tu dirección"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input 
              type="password" 
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input 
              type="password" 
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repite tu contraseña"
              required 
            />
          </div>

          <button type="submit" className="register-btn">
            Crear Cuenta
          </button>
        </form>

        <div className="register-footer">
          <p>¿Ya tienes cuenta?</p>
          <button 
            onClick={() => onNavigate('login')}
            className="login-link-btn"
          >
            Inicia sesión aquí
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;