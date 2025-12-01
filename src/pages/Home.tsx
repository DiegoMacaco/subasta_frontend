import React from "react";

interface Subasta {
  id: number;
  nombre: string;
  descripcion: string;
  precio: string;
  imagen: string | null;
  ofertaActual: number;
  duracion: number;
  creadaEn: string;
  creador: string;
}

interface HomeProps {
  user: any;
  onNavigate: (page: string) => void;
  subastas: Subasta[];
}

const Home: React.FC<HomeProps> = ({ user, onNavigate, subastas }) => {
  return (
    <div className="min-h-screen bg-[#F8F9F8]">
      <div className="h-[100px]" />
      

      <div className="mx-4 md:mx-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#333333]">
            Subastas Destacadas
          </h2>
          <p className="text-gray-600">
            {subastas.length} {subastas.length === 1 ? 'subasta' : 'subastas'} activas
          </p>
        </div>

        {subastas.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4"></div>
            <p className="text-xl text-gray-600 mb-2">No hay subastas disponibles</p>
            <p className="text-gray-500 mb-6">
              {user ? '¡Sé el primero en crear una!' : 'Inicia sesión para crear subastas'}
            </p>
            {user && (
              <button
                onClick={() => onNavigate("crear-subasta")}
                className="px-6 py-3 bg-[#003366] text-white font-semibold rounded-lg hover:bg-[#101c22] transition-colors"
              >
                Crear Subasta
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subastas.map((subasta) => (
              <div
                key={subasta.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border-t-4 border-[#89C9B8] cursor-pointer"
                onClick={() => onNavigate("subastas")}
              >
                <div className="relative h-48 bg-gray-100">
                  {subasta.imagen ? (
                    <img
                      src={subasta.imagen}
                      alt={subasta.nombre}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-6xl"></span>
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-[#FFD700] text-black text-xs font-bold px-2 py-1 rounded-full">
                    NUEVO
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#333333] mb-2 line-clamp-1">
                    {subasta.nombre}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">
                    {subasta.descripcion || 'Sin descripción'}
                  </p>

                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500">Oferta actual</p>
                      <p className="text-xl font-bold text-[#EFD780]">
                        ${subasta.ofertaActual.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Duración</p>
                      <p className="text-base font-semibold text-[#2E594E]">
                        {subasta.duracion} min
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>Por: {subasta.creador}</span>
                    <span>{new Date(subasta.creadaEn).toLocaleDateString()}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate("subastas");
                    }}
                    className="w-full bg-[#89C9B8] text-white py-2.5 rounded-lg font-semibold hover:bg-[#2E594E] transition-colors"
                  >
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {subastas.length > 0 && (
          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate("subastas")}
              className="px-8 py-3 bg-white text-[#003366] font-semibold rounded-lg border-2 border-[#003366] hover:bg-[#003366] hover:text-white transition-colors"
            >
              Ver Todas las Subastas ({subastas.length})
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;