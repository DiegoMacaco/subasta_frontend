import React from "react";

interface Subasta {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string | null;
  precio: string;
  ofertaActual: number;
  duracion: number;
  creadaEn: string;
  creador: string;
}

interface SubastasProps {
  user: any;
  onNavigate: (page: string) => void;
  subastas: Subasta[]; // ← NUEVO
  onActualizarOferta: (id: number, nuevaOferta: number) => void; // ← NUEVO
  onEliminarSubasta: (id: number) => void; // ← NUEVO
}

const Subastas: React.FC<SubastasProps> = ({ 
  user, 
  onNavigate, 
  subastas,
  onActualizarOferta,
  onEliminarSubasta
}) => {
  const handlePujar = (id: number) => {
    const subasta = subastas.find((s) => s.id === id);
    if (!subasta) return;

    const nuevaOferta = prompt(
      `Oferta actual: $${subasta.ofertaActual.toFixed(2)}\n\nIngresa tu nueva oferta:`
    );
    if (!nuevaOferta) return;

    const valor = parseFloat(nuevaOferta);
    if (isNaN(valor)) {
      alert("La oferta debe ser un número válido.");
      return;
    }
    if (valor <= subasta.ofertaActual) {
      alert(`Tu oferta debe ser mayor a $${subasta.ofertaActual.toFixed(2)}`);
      return;
    }

    onActualizarOferta(id, valor);
    alert(`¡Oferta realizada! Nueva oferta: $${valor.toFixed(2)}`);
  };

  const handleEliminar = (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta subasta?")) {
      onEliminarSubasta(id);
      alert("Subasta eliminada");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9F8] p-6">
      <div className="h-[40px]" />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#101c22]">
            Subastas Activas
          </h1>
          <button
            onClick={() => {
              if (!user) {
                alert("Debes iniciar sesión para crear una subasta.");
                onNavigate("login");
                return;
              }
              onNavigate("crear-subasta");
            }}
            className="px-6 py-3 bg-[#003366] text-white font-semibold rounded-lg hover:bg-[#101c22] transition-colors"
          >
            Agregar Producto
          </button>
        </div>

        {subastas.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4"></div>
            <p className="text-xl text-gray-600 mb-2">
              No hay subastas publicadas
            </p>
            <p className="text-gray-500 mb-6">¡Sé el primero en crear una!</p>
            <button
              onClick={() => {
                if (!user) {
                  alert("Debes iniciar sesión para crear una subasta.");
                  onNavigate("login");
                  return;
                }
                onNavigate("crear-subasta");
              }}
              className="px-6 py-3 bg-[#003366] text-white font-semibold rounded-lg hover:bg-[#101c22] transition-colors"
            >
              Crear mi primera subasta
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subastas.map((subasta) => (
              <div
                key={subasta.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border-t-4 border-[#89C9B8]"
              >
                <div className="relative">
                  {subasta.imagen ? (
                    <img
                      src={subasta.imagen}
                      alt={subasta.nombre}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-6xl">📷</span>
                    </div>
                  )}
                  <button
                    onClick={() => handleEliminar(subasta.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full hover:bg-red-600 font-bold"
                  >
                    ✕
                  </button>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#333333] mb-2">
                    {subasta.nombre}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {subasta.descripcion}
                  </p>

                  <div className="mb-4 bg-[#F8F9F8] p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Oferta actual</p>
                    <p className="text-2xl font-bold text-[#003366">
                      ${subasta.ofertaActual.toFixed(2)}
                    </p>
                  </div>

                  <p className="text-xs text-gray-500 mb-3">
                    Publicado por: {subasta.creador}
                  </p>

                  <button
                    onClick={() => {
                      if (!user) {
                        alert("Debes iniciar sesión para realizar una oferta.");
                        onNavigate("login");
                        return;
                      }
                      handlePujar(subasta.id);
                    }}
                    className="w-full py-3 bg-[#D4AF37] text-nega font-semibold rounded-lg hover:bg-[#E0BB4A] transition-colors"
                  >
                    Realizar Oferta
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => onNavigate("home")}
          className="mt-8 py-3 px-6 bg-gray-200 text-[#333333] font-semibold rounded-lg hover:bg-gray-300 transition-colors"
        >
          ← Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default Subastas;