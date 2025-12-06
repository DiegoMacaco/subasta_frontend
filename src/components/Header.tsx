import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  user?: any;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) 
        setShowHeader(false);
      else 
        setShowHeader(true);

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-[#101c22] transition-transform duration-300 z-50 ${
        showHeader ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-3xl font-bold text-white select-none">
          Qhatu
        </Link>

        <div className="flex gap-4">

          {!user && (
            <Link
              to="/login"
              className="bg-[#003366] text-white px-4 py-2 rounded-full font-semibold 
                         hover:bg-[#FFD700] hover:text-black transition-colors"
            >
              Iniciar Sesión
            </Link>
          )}
          {user && (
            <button
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold 
                         hover:bg-red-400 transition-colors"
            >
              Cerrar Sesión
            </button>
          )}

        </div>

      </nav>
    </header>
  );
};

export default Header;
