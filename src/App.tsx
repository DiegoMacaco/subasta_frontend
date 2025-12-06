import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Subastas from './pages/Subastas';
import Perfil from './pages/Perfil';
import CrearSubasta from './pages/CrearSubasta';

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

function AppContent() {
  const [user, setUser] = useState<User | null>(null);
  const [subastas, setSubastas] = useState<Subasta[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentUser = authUtils.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLegacyNavigate = (page: string) => {
    switch (page) {
      case 'home': navigate('/'); break;
      case 'login': navigate('/login'); break;
      case 'registro': navigate('/registro'); break;
      case 'subastas': navigate('/subastas'); break;
      case 'perfil': navigate('/perfil'); break;
      case 'crear-subasta': navigate('/crear-subasta'); break;
      default: navigate('/');
    }
  };

  const handleLogin = (userData: User) => {
    const completeUser: User = {
      ...userData,
      phone: userData.phone || '',
      address: userData.address || '',
      createdAt: userData.createdAt || new Date().toISOString()
    };
    localStorage.setItem('current_user', JSON.stringify(completeUser));
    setUser(completeUser);
    navigate('/'); 
  };

  const handleLogout = () => {
    authUtils.logout();
    setUser(null);
    navigate('/login'); 
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
    navigate('/');
  };

  const handleCrearSubasta = (nuevaSubasta: Omit<Subasta, 'ofertaActual'>) => {
    const subastaCompleta: Subasta = {
      ...nuevaSubasta,
      ofertaActual: parseFloat(nuevaSubasta.precio)
    };
    setSubastas(prev => [...prev, subastaCompleta]);
    navigate('/subastas'); 
  };

  const handleActualizarOferta = (id: number, nuevaOferta: number) => {
    setSubastas(prev => 
      prev.map(s => s.id === id ? { ...s, ofertaActual: nuevaOferta } : s)
    );
  };

  const handleEliminarSubasta = (id: number) => {
    setSubastas(prev => prev.filter(s => s.id !== id));
  };

  
  const isAuthPage = location.pathname === '/login' || location.pathname === '/registro';

  return (
    <div className="min-h-screen bg-[#F8F9F8]">
      {!isAuthPage && (
        <Header 
          user={user} 
          onLogout={handleLogout} 
          onNavigate={handleLegacyNavigate} 
        />
      )}

      <main className={`flex-1 ${isAuthPage ? '' : 'container mx-auto px-4 py-6'}`}>
        <Routes>

          <Route 
            path="/" 
            element={<Home user={user} onNavigate={handleLegacyNavigate} subastas={subastas} />} 
          />
          
          <Route 
            path="/login" 
            element={!user ? <Login onLogin={handleLogin} onNavigate={handleLegacyNavigate} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/registro" 
            element={!user ? <Register onRegister={handleRegister} onNavigate={handleLegacyNavigate} /> : <Navigate to="/" />} 
          />
 
          <Route 
            path="/subastas" 
            element={
              <Subastas 
                user={user} 
                onNavigate={handleLegacyNavigate} 
                subastas={subastas}
                onActualizarOferta={handleActualizarOferta}
                onEliminarSubasta={handleEliminarSubasta}
              />
            } 
          />

          <Route 
            path="/perfil" 
            element={user ? <Perfil user={user} onNavigate={handleLegacyNavigate} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/crear-subasta" 
            element={
              user ? (
                <CrearSubasta 
                  user={user} 
                  onNavigate={handleLegacyNavigate}
                  onCrearSubasta={handleCrearSubasta}
                />
              ) : <Navigate to="/login" />
            } 
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;