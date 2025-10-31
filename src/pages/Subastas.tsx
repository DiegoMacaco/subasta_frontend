import React, { useState, useEffect } from "react";

interface Subasta {
  id: number;
  producto: string;  
  descripcion: string;
  imagenes?: string[];
  precio: number;
  ofertaActual: number;
  duracion?: number;
  creadaEn?: string;
}

interface SubastasProps {
  user: any;
  onNavigate: (page: string) => void;
}

const Subastas: React.FC<SubastasProps> = ({ user, onNavigate }) => {
  const [subastas, setSubastas] = useState<Subasta[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [producto, setProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [precio, setPrecio] = useState<number>(0);

  useEffect(() => {
    try {
      const data = localStorage.getItem("subastas");
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          setSubastas(parsed);
        } else {
          setSubastas([]);
        }
      }
    } catch (error) {
      console.error("Error cargando subastas:", error);
      localStorage.removeItem("subastas");
      setSubastas([]);
    }
  }, []);

  useEffect(() => {
    if (subastas.length >= 0) {
      try {
        localStorage.setItem("subastas", JSON.stringify(subastas));
      } catch (error) {
        console.error("Error guardando subastas:", error);
      }
    }
  }, [subastas]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setImagenes(files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!producto.trim() || !descripcion.trim() || imagenes.length === 0 || precio <= 0) {
      alert("Completa todos los campos e incluye al menos una imagen y precio inicial.");
      return;
    }

    const nuevaSubasta: Subasta = {
      id: Date.now(),
      producto,
      descripcion,
      imagenes: previews,
      precio,
      ofertaActual: precio,
    };

    setSubastas([...subastas, nuevaSubasta]);
    
    setProducto("");
    setDescripcion("");
    setImagenes([]);
    setPreviews([]);
    setPrecio(0);
    setMostrarModal(false);

    alert("¡Subasta creada exitosamente!");
  };

  const handlePujar = (id: number) => {
    const subasta = subastas.find(s => s.id === id);
    if (!subasta) return;

    const nuevaOferta = prompt(`Oferta actual: $${subasta.ofertaActual.toFixed(2)}\n\nIngresa tu nueva oferta:`);
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

    setSubastas(subastas.map((s) =>
      s.id === id ? { ...s, ofertaActual: valor } : s
    ));

    alert(`¡Oferta realizada! Nueva oferta: $${valor.toFixed(2)}`);
  };

  const handleEliminar = (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta subasta?")) {
      setSubastas(subastas.filter(s => s.id !== id));
      alert("Subasta eliminada");
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9F8]">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md text-center border-t-4 border-[#89C9B8]">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-[#2E594E] mb-4">Acceso Requerido</h2>
          <p className="text-gray-600 mb-6">
            Debes iniciar sesión para ver las subastas
          </p>
          <button
            onClick={() => onNavigate("login")}
            className="w-full px-6 py-3 bg-[#89C9B8] text-white font-semibold rounded-lg hover:bg-[#2E594E] transition-colors"
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9F8] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#2E594E]">Subastas Activas</h1>
          <button
            onClick={() => setMostrarModal(true)}
            className="px-6 py-3 bg-[#89C9B8] text-white font-semibold rounded-lg hover:bg-[#2E594E] transition-colors"
          >
            + Agregar Producto
          </button>
        </div>

        {subastas.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-xl text-gray-600 mb-2">No hay subastas publicadas</p>
            <p className="text-gray-500 mb-6">¡Sé el primero en crear una!</p>
            <button
              onClick={() => setMostrarModal(true)}
              className="px-6 py-3 bg-[#89C9B8] text-white font-semibold rounded-lg hover:bg-[#2E594E] transition-colors"
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
                  {subasta.imagenes && subasta.imagenes[0] ? (
                    <img
                      src={subasta.imagenes[0]}
                      alt={subasta.producto}
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
                    {subasta.producto}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {subasta.descripcion}
                  </p>
                  
                  <div className="mb-4 bg-[#F8F9F8] p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Oferta actual</p>
                    <p className="text-2xl font-bold text-[#EFD780]">
                      ${subasta.ofertaActual.toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => handlePujar(subasta.id)}
                    className="w-full py-3 bg-[#89C9B8] text-white font-semibold rounded-lg hover:bg-[#2E594E] transition-colors"
                  >
                    Realizar Oferta
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {mostrarModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => setMostrarModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ✖
              </button>
              
              <h2 className="text-2xl font-bold mb-6 text-center text-[#2E594E]">
                Crear Nueva Subasta
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-[#333333] mb-2">
                    Nombre del producto *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej: iPhone 13 Pro"
                    value={producto}
                    onChange={(e) => setProducto(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#89C9B8]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[#333333] mb-2">
                    Descripción *
                  </label>
                  <textarea
                    placeholder="Describe tu producto..."
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    rows={3}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#89C9B8] resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[#333333] mb-2">
                    Precio inicial *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500 font-bold">$</span>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={precio || ""}
                      onChange={(e) => setPrecio(parseFloat(e.target.value) || 0)}
                      className="w-full pl-8 border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-[#89C9B8]"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-[#333333] mb-2">
                    Imágenes *
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full border-2 border-gray-300 rounded-lg p-3 bg-[#F8F9F8]"
                  />
                </div>
                
                {previews.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {previews.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`preview ${index}`}
                        className="h-32 w-full object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
                
                <button
                  type="submit"
                  className="w-full py-3 bg-[#89C9B8] text-white font-semibold rounded-lg hover:bg-[#2E594E] transition-colors"
                >
                  Publicar Subasta
                </button>
              </form>
            </div>
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