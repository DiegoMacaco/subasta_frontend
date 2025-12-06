import React, { useState } from "react";
import { Clock, User, X, Upload } from "lucide-react";

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
  subastas: Subasta[];
  onActualizarOferta: (id: number, nuevaOferta: number) => void;
  onEliminarSubasta: (id: number) => void;
}

const Subastas: React.FC<SubastasProps> = ({
  user,
  onNavigate,
  subastas,
  onActualizarOferta,
  onEliminarSubasta
}) => {
  const [ofertaInput, setOfertaInput] = useState<{ [key: number]: string }>({});
  const [mostrarModal, setMostrarModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    duracion: "24",
    imagen: ""
  });

  const handlePujar = (subasta: Subasta) => {
    const valor = parseFloat(ofertaInput[subasta.id] || "0");

    if (isNaN(valor) || valor <= 0) {
      alert("Por favor ingresa una oferta válida");
      return;
    }

    if (valor <= subasta.ofertaActual) {
      alert(`Tu oferta debe ser mayor a $${subasta.ofertaActual.toFixed(2)}`);
      return;
    }

    onActualizarOferta(subasta.id, valor);
    setOfertaInput({ ...ofertaInput, [subasta.id]: "" });
    alert(`¡Oferta realizada exitosamente! Nueva oferta: $${valor.toFixed(2)}`);
  };

  const handleEliminar = (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta subasta?")) {
      onEliminarSubasta(id);
    }
  };

  const handleCrearSubasta = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Debes iniciar sesión");
      return;
    }

    const nuevaSubasta = {
      id: Date.now(),
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      precio: formData.precio,
      ofertaActual: parseFloat(formData.precio),
      duracion: parseInt(formData.duracion),
      imagen: formData.imagen || null,
      creador: user.email,
      creadaEn: new Date().toISOString()
    };

    alert("¡Subasta creada exitosamente!");

    setFormData({
      nombre: "",
      descripcion: "",
      precio: "",
      duracion: "24",
      imagen: ""
    });

    setMostrarModal(false);
    onNavigate("subastas");
  };

  const calcularTiempoRestante = (creadaEn: string, duracion: number) => {
    const inicio = new Date(creadaEn).getTime();
    const fin = inicio + duracion * 60 * 60 * 1000;
    const ahora = Date.now();
    const restante = fin - ahora;

    if (restante <= 0) return "Finalizada";

    const horas = Math.floor(restante / (1000 * 60 * 60));
    const minutos = Math.floor((restante % (1000 * 60 * 60)) / (1000 * 60));

    return `${horas}h ${minutos}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <div className="h-[80px]" />
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3 mx-auto text-center w-fit">Subastas</h1>
              <p className="text-gray-600">
                {subastas.length} {subastas.length === 1 ? "subasta disponible" : "subastas disponibles"}
              </p>
            </div>
            <button
              onClick={() => {
                if (!user) {
                  alert("Debes iniciar sesión para crear una subasta");
                  onNavigate("login");
                  return;
                }
                setMostrarModal(true);
              }}
              className="w-14 h-14 bg-[#101c22] text-white text-3xl font-light rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-110 flex items-center justify-center"
              title="Agregar producto"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {subastas.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-16 text-center border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No hay subastas por el momento</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subastas.map((subasta) => {
              const esCreador = user && user.email === subasta.creador;

              return (
                <div
                  key={subasta.id}
                  className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:-translate-y-1"
                >
                  <div className="relative">
                    {subasta.imagen ? (
                      <img
                        src={subasta.imagen}
                        alt={subasta.nombre}
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-lg">Sin imagen</span>
                      </div>
                    )}

                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-full flex items-center gap-1 shadow-lg">
                      <Clock size={14} /> EN VIVO
                    </div>
                    {esCreador && (
                      <button
                        onClick={() => handleEliminar(subasta.id)}
                        className="absolute top-3 right-3 bg-white text-red-600 w-9 h-9 rounded-full hover:bg-red-50 font-bold shadow-lg border-2 border-red-200 transition-all"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2 min-h-[48px]">
                      {subasta.nombre}
                    </h3>
                    <div className="mb-4 bg-green-50 rounded-2xl p-4">
                      <p className="text-xs text-gray-600 mb-1">Puja actual</p>
                      <p className="text-3xl font-bold text-green-600">
                        ${subasta.ofertaActual.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Inicial: <span className="line-through">${parseFloat(subasta.precio).toFixed(2)}</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-4 pb-4 border-b border-gray-200">
                      <span className="flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-full">
                        <Clock size={14} />
                        {calcularTiempoRestante(subasta.creadaEn, subasta.duracion)}
                      </span>
                      <span className="flex items-center gap-1.5 bg-purple-50 px-3 py-1.5 rounded-full truncate max-w-[120px]">
                        <User size={14} />
                        {subasta.creador.split(" ")[0]}
                      </span>
                    </div>
                    {user ? (
                      <div className="flex gap-2">
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Tu oferta"
                          value={ofertaInput[subasta.id] || ""}
                          onChange={(e) =>
                            setOfertaInput({
                              ...ofertaInput,
                              [subasta.id]: e.target.value
                            })
                          }
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                        <button
                          onClick={() => handlePujar(subasta)}
                          className="px-5 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md"
                        >
                          Pujar
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onNavigate("login")}
                        className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-xl transition-all shadow-md"
                      >
                        Iniciar sesión para pujar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate("home")}
            className="text-blue-600 hover:text-blue-800 font-semibold text-lg hover:underline"
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
      {mostrarModal && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-[#101c22] px-8 py-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Crear nueva subasta</h2>
              <button
                onClick={() => setMostrarModal(false)}
                className="text-white hover:text-gray-200 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex">
              <div className="w-2/5 bg-gradient-to-br from-gray-100 to-gray-200 p-8 flex flex-col items-center justify-center border-r">
                <div className="w-full aspect-square bg-white rounded-2xl shadow-inner overflow-hidden mb-6 relative group border-2 border-dashed border-gray-300 hover:border-[#101c22] transition-all">
    
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                          const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({ ...formData, imagen: reader.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    title="Haz clic para subir una imagen"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                    {formData.imagen ? (
                      <img 
                        src={formData.imagen} 
                        alt="Previsualización" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 group-hover:text-[#101c22] transition-colors flex flex-col items-center">
                
                        <span className="text-sm font-bold mt-2">Subir imagen</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full">
                </div>

              </div>

              <div className="w-3/5 p-8 overflow-y-auto max-h-[calc(90vh-88px)]">
                <form onSubmit={handleCrearSubasta} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Nombre del producto 
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:[#101c22] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Descripción 
                    </label>
                    <textarea
                      required
                      value={formData.descripcion}
                      onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:[#101c22] focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Precio inicial
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.precio}
                        onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:[#101c22] focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Duración (horas) 
                      </label>
                      <select
                        required
                        value={formData.duracion}
                        onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:[#101c22] focus:border-transparent"
                      >
                        <option value="12">12 horas</option>
                        <option value="24">24 horas</option>
                        <option value="48">48 horas</option>
                        <option value="72">72 horas</option>
                        <option value="168">1 semana</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setMostrarModal(false)}
                      className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-4 bg-[#101c22] hover:from-orange-600 hover:to-red-600 text-white font-bold rounded-xl shadow-lg transition-all"
                    >
                      Crear Subasta
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Subastas;