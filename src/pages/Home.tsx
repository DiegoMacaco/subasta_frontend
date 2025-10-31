import React, { useEffect, useState } from "react";

interface Subasta {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  duracion: number;
  creadaEn: string;
}

interface HomeProps {
  user: any;
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ user, onNavigate }) => {
  const [subastas, setSubastas] = useState<Subasta[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("subastas_locales") || "[]");
    setSubastas(data);
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9F8] py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#2E594E] to-[#89C9B8] text-white rounded-2xl p-8 mb-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-3">
          Bienvenido a Qhatu
        </h1>
        <p className="text-lg text-[#F8F9F8] opacity-90">
          Descubre las mejores subastas y encuentra lo que buscas
        </p>
      </div>

      {/* Título de sección */}
      <h2 className="text-2xl font-bold text-[#333333] mb-6">
        Subastas Destacadas
      </h2>

      {subastas.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">🏷️</div>
          <p className="text-xl text-gray-600 mb-2">No hay subastas disponibles</p>
          <p className="text-gray-500">Pronto habrá nuevas subastas</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subastas.map((subasta) => (
            <div
              key={subasta.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-t-4 border-[#89C9B8]"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#333333] mb-2">
                  {subasta.nombre}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {subasta.descripcion}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Precio base</p>
                    <p className="text-2xl font-bold text-[#EFD780]">
                      ${subasta.precio}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Duración</p>
                    <p className="text-lg font-semibold text-[#2E594E]">
                      {subasta.duracion}h
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate("subastas")}
                  className="w-full bg-[#89C9B8] text-white py-3 rounded-lg font-semibold hover:bg-[#2E594E] transition-colors"
                >
                  Ver Subasta
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;