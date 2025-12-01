import React, { useState, useRef } from "react";

interface CrearSubastaProps {
  user: any;
  onNavigate: (page: string) => void;
  onCrearSubasta: (subasta: any) => void; // ← NUEVO
}

const CrearSubasta: React.FC<CrearSubastaProps> = ({ user, onNavigate, onCrearSubasta }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [duracion, setDuracion] = useState(60);
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagen(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

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
      imagen,
      creador: user?.email || "Anónimo",
      creadaEn: new Date().toISOString(),
    };
    onCrearSubasta(nuevaSubasta);

    alert("Subasta creada con éxito");

    setNombre("");
    setDescripcion("");
    setPrecio("");
    setImagen(null);
    setDuracion(60);
    
    onNavigate("subastas");
  };

  return (
    <div className="min-h-screen bg-white flex justify-center pt-28 pb-10 px-4">
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-[#003366] text-center mb-8">
          Publicar un nuevo producto
        </h1>
        <div className="mb-8">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Imagen del producto
          </label>
          <div
            className="w-full h-56 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-[#003366] hover:bg-[#DBEAFE] transition"
            onClick={() => fileInputRef.current?.click()}
          >
            {imagen ? (
              <img
                src={imagen}
                alt="Vista previa"
                className="w-auto h-40 object-contain rounded-lg"
              />
            ) : (
              <>
                <p className="text-gray-500">Haz clic aquí para subir una imagen</p>
                <p className="text-xs text-gray-400">Formatos: JPG, PNG, WEBP</p>
              </>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nombre del producto
            </label>
            <input
              type="text"
              placeholder="Ej: Laptop HP Pavilion 15"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:ring-2 focus:ring-[#003366] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Descripción
            </label>
            <textarea
              placeholder="Describe el producto, estado, características, etc."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:ring-2 focus:ring-[#003366] focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Precio base
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500 font-bold">$</span>
              <input
                type="number"
                placeholder="0.00"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="w-full border border-gray-300 rounded-md pl-8 pr-3 py-3 text-gray-700 focus:ring-2 focus:ring-[#003366] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Duración 
            </label>
            <input
              type="number"
              value={duracion}
              onChange={(e) => setDuracion(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-gray-700 focus:ring-2 focus:ring-[#003366] focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-10 bg-[#F9FAFB] border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#2E594E] mb-4">Vista previa</h2>
          <div className="flex flex-col items-center text-center">
            {imagen ? (
              <img
                src={imagen}
                alt="Vista previa"
                className="w-40 h-40 object-contain mb-4 rounded-lg"
              />
            ) : (
              <div className="w-40 h-40 bg-gray-100 flex items-center justify-center text-gray-400 mb-4 rounded-lg">
                Sin imagen
              </div>
            )}
            <p className="text-lg font-bold text-[#333333]">{nombre || "Nombre del producto"}</p>
            <p className="text-sm text-gray-600 mb-1">
              {descripcion || "Descripción breve del producto"}
            </p>
            <p className="text-xl text-[#EFD780] font-bold mb-1">
              ${precio || "0.00"}
            </p>
            <p className="text-sm text-gray-500">Duración: {duracion} min</p>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => onNavigate("subastas")}
            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleCrearSubasta}
            className="flex-1 bg-[#FFD700] text-black py-3 rounded-lg font-semibold hover:bg-[#FEF08A] transition"
          >
            Publicar Subasta
          </button>
        </div>
      </div>
    </div>
  );
};

export default CrearSubasta;