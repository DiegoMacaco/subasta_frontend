import React, { useState } from "react";

interface CrearSubastaProps {
  user: any;
  onNavigate: (page: string) => void;
}

const CrearSubasta: React.FC<CrearSubastaProps> = ({ user, onNavigate }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [duracion, setDuracion] = useState(60 * 5); 
  const [precio, setPrecio] = useState("");

  const handleCrearSubasta = () => {
    if (!nombre || !precio) {
      alert("Completa todos los campos obligatorios");
      return;
    }

    const nuevaSubasta = {
      id: Date.now(),
      nombre,
      descripcion,
      duracion,
      precio,
      creador: user?.email || "Anónimo",
      creadaEn: new Date().toISOString(),
    };

    const subastasGuardadas = JSON.parse(localStorage.getItem("subastas") || "[]");
    subastasGuardadas.push(nuevaSubasta);
    localStorage.setItem("subastas", JSON.stringify(subastasGuardadas));

    alert("Subasta creada con éxito");
    onNavigate("subastas");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9F8] p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md border-t-4 border-[#89C9B8]">
        <h2 className="text-3xl font-bold text-[#2E594E] mb-6 text-center">Crear Subasta</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#333333] mb-2">
              Nombre del producto *
            </label>
            <input
              type="text"
              placeholder="Ej: iPhone 13 Pro"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#89C9B8] transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#333333] mb-2">
              Descripción
            </label>
            <textarea
              placeholder="Describe tu producto..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={4}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#89C9B8] transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#333333] mb-2">
              Precio base *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500 font-bold">$</span>
              <input
                type="number"
                placeholder="0.00"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="w-full p-3 pl-8 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#89C9B8] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#333333] mb-2">
              Duración (minutos)
            </label>
            <input
              type="number"
              value={duracion}
              onChange={(e) => setDuracion(Number(e.target.value))}
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#89C9B8] transition-colors"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() => onNavigate("subastas")}
            className="flex-1 bg-gray-200 text-[#333333] px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleCrearSubasta}
            className="flex-1 bg-[#89C9B8] text-white px-4 py-3 rounded-lg font-semibold hover:bg-[#2E594E] transition-colors"
          >
            Crear Subasta
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrearSubasta;