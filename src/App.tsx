import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Subastas from './pages/Subastas';
import Perfil from './pages/Perfil';
import CrearSubasta from './pages/CrearSubasta';

import "tailwindcss";
import './App.css';
import './index.css';

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

interface Subasta {
  id: number;
  nombre: string;
  descripcion: string;
  duracion: number;
  precio: string;
  imagen: string | null;
  creador: string;
  creadaEn: string;
  ofertaActual: number;
}

const authUtils = {
  getCurrentUser: (): User | null => {
    const user = localStorage.getItem('current_user');
    return user ? JSON.parse(user) : null;
  },
  
  logout: (): void => {
    localStorage.removeItem('current_user');
  }
};

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [subastas, setSubastas] = useState<Subasta[]>([]); // ← NUEVO: Estado para subastas

  useEffect(() => {
    const currentUser = authUtils.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLogin = (userData: User) => {
    const completeUser: User = {
      ...userData,
      phone: userData.phone || '',
      address: userData.address || '',
      createdAt: userData.createdAt || new Date().toISOString()
    };
    
    localStorage.setItem('current_user', JSON.stringify(completeUser));
    setUser(completeUser);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    authUtils.logout();
    setUser(null);
    setCurrentPage('home');
  };

  const handleRegister = (userData: User) => {
    const completeUser: User = {
      ...userData,
      phone: '',
      address: '',
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('current_user', JSON.stringify(completeUser));
    setUser(completeUser);
    setCurrentPage('home');
  };

  const handleCrearSubasta = (nuevaSubasta: Omit<Subasta, 'ofertaActual'>) => {
    const subastaCompleta: Subasta = {
      ...nuevaSubasta,
      ofertaActual: parseFloat(nuevaSubasta.precio)
    };
    setSubastas(prev => [...prev, subastaCompleta]);
  };

  const handleActualizarOferta = (id: number, nuevaOferta: number) => {
    setSubastas(prev => 
      prev.map(s => s.id === id ? { ...s, ofertaActual: nuevaOferta } : s)
    );
  };

  const handleEliminarSubasta = (id: number) => {
    setSubastas(prev => prev.filter(s => s.id !== id));
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home user={user} onNavigate={setCurrentPage} subastas={subastas} />;
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'registro':
        return <Register onRegister={handleRegister} onNavigate={setCurrentPage} />;
      case 'subastas':
        return (
          <Subastas 
            user={user} 
            onNavigate={setCurrentPage} 
            subastas={subastas}
            onActualizarOferta={handleActualizarOferta}
            onEliminarSubasta={handleEliminarSubasta}
          />
        );
      case 'perfil':
        return user ? <Perfil user={user} onNavigate={setCurrentPage} /> : <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'crear-subasta':
        return user ? (
          <CrearSubasta 
            user={user} 
            onNavigate={setCurrentPage}
            onCrearSubasta={handleCrearSubasta}
          />
        ) : <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
      default:
        return <Home user={user} onNavigate={setCurrentPage} subastas={subastas} />;
    }
  };
  
  const isAuthPage = currentPage === 'login' || currentPage === 'registro';

  return (
    <div className="min-h-screen bg-[#F8F9F8]">
      {!isAuthPage && (
        <Header 
          user={user} 
          onLogout={handleLogout} 
          onNavigate={setCurrentPage} 
        />
      )}

      <main className={`flex-1 ${isAuthPage ? '' : 'container mx-auto px-4 py-6'}`}>
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;