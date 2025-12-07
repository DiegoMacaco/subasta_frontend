import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Subastas from './pages/Subastas';
import Perfil from './pages/Perfil';

import './index.css';

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

const authUtils = {
  getCurrentUser: (): User | null => {
    const user = localStorage.getItem('current_user');
    return user ? JSON.parse(user) : null;
  },
  setCurrentUser: (user: User): void => {
    localStorage.setItem('current_user', JSON.stringify(user));
  },
  logout: (): void => {
    localStorage.removeItem('current_user');
    localStorage.removeItem('token');
  }
};

function AppContent() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentUser = authUtils.getCurrentUser();
    setUser(currentUser);
  }, []);

  const handleLegacyNavigate = (page: string) => {
    if (page === 'logout') {
      handleLogout();
      return;
    }

    switch (page) {
      case 'home': navigate('/'); break;
      case 'login': navigate('/login'); break;
      case 'registro': navigate('/registro'); break;
      case 'subastas': navigate('/subastas'); break;
      case 'perfil': navigate('/perfil'); break;
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
    authUtils.setCurrentUser(completeUser);
    setUser(completeUser);
    navigate('/perfil');
  };

  const handleLogout = () => {
    authUtils.logout();
    setUser(null);
    navigate('/login');
  };

  const handleRegister = (userData: User) => {
    navigate('/login');
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/registro';

  return (
    <div className="min-h-screen bg-[#F8F9F8] flex flex-col">
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
            element={<Home user={user} onNavigate={handleLegacyNavigate} subastas={[]} />} 
          />
          
          <Route 
            path="/login" 
            element={!user ? <Login onLogin={handleLogin} onNavigate={handleLegacyNavigate} /> : <Navigate to="/perfil" />} 
          />
          
          <Route 
            path="/registro" 
            element={!user ? <Register onRegister={handleRegister} onNavigate={handleLegacyNavigate} /> : <Navigate to="/perfil" />} 
          />
 
          <Route 
            path="/subastas" 
            element={
              <Subastas 
                user={user} 
                onNavigate={handleLegacyNavigate}
              />
            } 
          />

          <Route 
            path="/perfil" 
            element={user ? <Perfil user={user} onNavigate={handleLegacyNavigate} /> : <Navigate to="/login" />} 
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      
      {!isAuthPage && <Footer />}
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