import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

interface HeaderProps {
  user: any;
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onNavigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);


  const getInitial = (name: string) => (name ? name.charAt(0).toUpperCase() : "?");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) setShowHeader(false);
      else setShowHeader(true);
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
      <nav className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 space-x-6">
        <div
          className="text-3xl font-bold text-[#ffff] cursor-pointer hover:text-[#F2F2F2] transition-colors whitespace-nowrap"
          onClick={() => onNavigate("home")}
        >
          Qhatu
        </div>

        <div className="flex flex-1 max-w-3xl border border-gray-300 rounded-full bg-gray-50 overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Buscar.. "
            className="flex-1 bg-transparent outline-none text-gray-700 px-4 py-2 text-sm"
          />
          <button className="bg-[#101c22] hover:bg-[#101c22] text-white px-5 flex items-center justify-center">
            <FaSearch />
          </button>
        </div>
        <div className="flex items-center space-x-5">
          <button
            onClick={() => onNavigate("subastas")}
            className="text-gray-600 hover:text-[#ffff] flex items-center gap-1">
            <span className="hidden sm:inline text-sm font-medium">Vender</span>
          </button>
          <button
            onClick={() => onNavigate("crear-subasta")}
            className="text-gray-600 hover:text-[#003366 ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8h13.2L17 13M7 13h10M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
          </button>
          <button
            onClick={() => onNavigate("notificaciones")}
            className="text-gray-600 hover:text-[#003366 ] relative group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-5-5.917V4a1 1 0 10-2 0v1.083A6.002 6.002 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0h6z"
              />
            </svg>
            <div className="absolute hidden group-hover:block right-0 mt-2 bg-white border text-gray-600 text-sm px-3 py-2 rounded-md shadow-lg w-60">
              {!user ? "Inicia sesión para ver tus notificaciones." : "No tienes notificaciones."}
            </div>
          </button>
          {user ? (
            <div
              className="relative"
            >
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-[#003366] text-white font-semibold w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#101c22]"
              >
                {getInitial(user.firstName)}
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-10">
                  <div className="px-4 py-3 border-b">
                    <p className="text-sm text-gray-600">Hola {user.firstName}

                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onNavigate("perfil");
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Mi Perfil
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 font-semibold"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => onNavigate("login")}
              className="bg-[#2E594E] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#1D4036] transition-colors"
            >
              Iniciar Sesión
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
