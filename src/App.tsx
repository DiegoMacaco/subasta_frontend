import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Subastas from './pages/Subastas';
import Perfil from './pages/Perfil';
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

 
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home user={user} onNavigate={setCurrentPage} />;
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'registro':
        return <Register onRegister={handleRegister} onNavigate={setCurrentPage} />;
      case 'subastas':
        return user ? <Subastas user={user} onNavigate={setCurrentPage} /> : <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
      case 'perfil':
        return user ? <Perfil user={user} onNavigate={setCurrentPage} /> : <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
      default:
        return <Home user={user} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="app">
      <Header 
        user={user} 
        onLogout={handleLogout} 
        onNavigate={setCurrentPage} 
      />
      
      <main className="main-content">
        <div className="container">
          {renderCurrentPage()}
        </div>
      </main>
    </div>
  );
}

export default App;