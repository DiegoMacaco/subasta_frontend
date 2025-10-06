import React, { useState } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Usuarios de prueba
  const testUsers = [
    {
      id: '1',
      email: 'admin@test.com',
      password: '123456',
      firstName: 'Admin',
      lastName: 'Test'
    },
    {
      id: '2', 
      email: 'usuario@test.com',
      password: '123456',
      firstName: 'Usuario',
      lastName: 'Test'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Buscar usuario
    const user = testUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user; // Remover password
      onLogin(userWithoutPassword);
      alert('¡Login exitoso!');
    } else {
      alert('Credenciales incorrectas. Usa: admin@test.com / 123456');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required 
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required 
          />
        </div>
        <button 
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Ingresar
        </button>
      </form>
      
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p>¿No tienes cuenta? </p>
        <button 
          onClick={() => onNavigate('registro')}
          style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
            color: '#007bff',
            border: '1px solid #007bff',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Regístrate aquí
        </button>
      </div>
    </div>
  );
};

export default Login;