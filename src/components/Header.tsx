import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  user?: { nombre?: string }; 
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

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

  const firstLetter = user?.nombre?.[0]?.toUpperCase() || "";

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

        <div className="flex gap-4 items-center">

          <Link
            to="/subastas"
            className="text-white font-semibold px-4 py-2 hover:text-[#FFD700] transition-colors"
          >
            Subastas
          </Link>

          {!user ? (
            <Link
              to="/login"
              className="bg-[#003366] text-white px-4 py-2 rounded-full font-semibold 
                         hover:bg-[#FFD700] hover:text-black transition-colors"
            >
              Iniciar Sesión
            </Link>
          ) : (
            <button
              onClick={() => navigate("/perfil")}
              className="w-10 h-10 bg-[#FFD700] text-black font-bold rounded-full 
                         flex items-center justify-center hover:bg-white transition-colors"
            >
              {firstLetter}
            </button>
          )}

        </div>

      </nav>
    </header>
  );
};

export default Header;
