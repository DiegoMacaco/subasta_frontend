import React, { useState, useEffect } from "react";
import { Clock, User, X, Upload, Loader2, Gavel } from "lucide-react";
import { productosAPI, subcategoriasAPI } from "../services/api";
import type { Producto, SubcategoriaProducto } from "../types/Producto";
import { convertirPrecioANumero } from "../types/Producto";
import { formatearPrecioConSimbolo, parsePrecio } from "../utils/helpers";
import { ModalIniciarPuja } from "../iniciarpuja";
import { ModalPujar } from "../pujar";

interface SubastasProps {
  user: any;
  onNavigate: (page: string) => void;
}

const Subastas: React.FC<SubastasProps> = ({ user, onNavigate }) => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [subcategorias, setSubcategorias] = useState<SubcategoriaProducto[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [enviando, setEnviando] = useState(false);

  // Estados para el modal de iniciar puja
  const [mostrarModalIniciarPuja, setMostrarModalIniciarPuja] = useState(false);

  // Estados para el modal de pujar
  const [mostrarModalPujar, setMostrarModalPujar] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] =
    useState<Producto | null>(null);

  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    disponibilidad: "1",
    subcategoriaId: "",
    imagen: null as File | null,
  });
  const [imagenPreview, setImagenPreview] = useState<string | null>(null);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [productosRes, subcategoriasRes] = await Promise.all([
        productosAPI.obtenerActivos(),
        subcategoriasAPI.obtenerTodas(),
      ]);

      console.log("Productos recibidos:", productosRes.data);
      setProductos(productosRes.data);
      setSubcategorias(subcategoriasRes.data);
      setError(null);
    } catch (err: any) {
      console.error("Error al cargar datos:", err);
      setError(err.response?.data?.message || "Error al cargar los datos");
    } finally {
      setLoading(false);
    }
  };

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, imagen: file });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrearProducto = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("Debes iniciar sesión");
      return;
    }

    if (!formData.subcategoriaId) {
      alert("Por favor selecciona una categoría");
      return;
    }

    try {
      setEnviando(true);

      const nuevoProducto: {
        nombre: string;
        descripcion: string;
        precio: number;
        disponibilidad: number;
        subcategoriaId: number;
        imagen?: File;
      } = {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: parseFloat(formData.precio),
        disponibilidad: parseInt(formData.disponibilidad),
        subcategoriaId: parseInt(formData.subcategoriaId),
      };

      // Solo agregar imagen si existe
      if (formData.imagen) {
        nuevoProducto.imagen = formData.imagen;
      }

      await productosAPI.crear(nuevoProducto);

      alert("¡Producto creado exitosamente!");

      setFormData({
        nombre: "",
        descripcion: "",
        precio: "",
        disponibilidad: "1",
        subcategoriaId: "",
        imagen: null,
      });
      setImagenPreview(null);
      setMostrarModal(false);
      cargarDatos();
    } catch (err: any) {
      console.error("Error al crear producto:", err);
      alert(err.response?.data?.message || "Error al crear el producto");
    } finally {
      setEnviando(false);
    }
  };

  const handleEliminar = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      return;
    }

    try {
      await productosAPI.eliminar(id);
      alert("Producto eliminado exitosamente");
      cargarDatos();
    } catch (err: any) {
      console.error("Error al eliminar:", err);
      alert(err.response?.data?.message || "Error al eliminar el producto");
    }
  };

  const handleIniciarPuja = (producto: Producto) => {
    if (!user) {
      alert("Debes iniciar sesión para iniciar una puja");
      onNavigate("login");
      return;
    }

    setProductoSeleccionado(producto);
    setMostrarModalIniciarPuja(true);
  };

  const handlePujaCreada = () => {
    setMostrarModalIniciarPuja(false);
    setProductoSeleccionado(null);
    cargarDatos();
  };

  // Nueva función para abrir el modal de pujar
  const handleAbrirModalPujar = (producto: Producto) => {
    if (!user) {
      alert("Debes iniciar sesión para pujar");
      onNavigate("login");
      return;
    }

    setProductoSeleccionado(producto);
    setMostrarModalPujar(true);
  };

  // Nueva función para manejar cuando se realiza una puja exitosa
  const handlePujaRealizada = () => {
    setMostrarModalPujar(false);
    setProductoSeleccionado(null);
    // Usar setTimeout para evitar conflictos de estado
    setTimeout(() => {
      cargarDatos();
    }, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️ Error</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={cargarDatos}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white">
      <div className="h-[80px]" />
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3 mx-auto text-center w-fit">
                Productos en Subasta
              </h1>
              <p className="text-gray-600">
                {productos.length}{" "}
                {productos.length === 1
                  ? "producto disponible"
                  : "productos disponibles"}
              </p>
            </div>
            <button
              onClick={() => {
                if (!user) {
                  alert("Debes iniciar sesión para crear un producto");
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
        {productos.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-16 text-center border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              No hay productos disponibles
            </h3>
            <p className="text-gray-600 mb-6">
              Sé el primero en agregar un producto
            </p>
            <button
              onClick={() => setMostrarModal(true)}
              className="px-8 py-3 bg-[#101c22] text-white rounded-xl font-semibold hover:bg-gray-800"
            >
              Agregar Producto
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productos.map((producto) => {
              const enPuja = producto.enPuja === true;
              const pujaFinalizada = producto.pujaFinalizada === true;
              const precioMostrar =
                enPuja && producto.pujaActual !== null
                  ? convertirPrecioANumero(producto.pujaActual)
                  : convertirPrecioANumero(producto.precio);

              return (
                <div
                  key={producto.id}
                  className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:-translate-y-1"
                >
                  <div className="relative">
                    {producto.imagen ? (
                      <img
                        src={`http://localhost:3000${producto.imagen}`}
                        alt={producto.nombre}
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-lg">
                          Sin imagen
                        </span>
                      </div>
                    )}

                    <div
                      className={`absolute top-3 left-3 text-white text-xs font-bold px-3 py-2 rounded-full flex items-center gap-1 shadow-lg ${
                        pujaFinalizada
                          ? "bg-red-500"
                          : enPuja
                          ? "bg-orange-500 animate-pulse"
                          : "bg-green-500"
                      }`}
                    >
                      <Clock size={14} />
                      {pujaFinalizada
                        ? "FINALIZADA"
                        : enPuja
                        ? "EN PUJA"
                        : "DISPONIBLE"}
                    </div>

                    {user && (
                      <button
                        onClick={() => handleEliminar(producto.id)}
                        className="absolute top-3 right-3 bg-white text-red-600 w-9 h-9 rounded-full hover:bg-red-50 font-bold shadow-lg border-2 border-red-200 transition-all"
                      >
                        ×
                      </button>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-bold text-gray-900 mb-3 line-clamp-2 min-h-[48px]">
                      {producto.nombre}
                    </h3>

                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {producto.descripcion}
                    </p>

                    <div className="mb-4 bg-blue-50 rounded-2xl p-4">
                      <p className="text-xs text-gray-600 mb-1">
                        {enPuja ? "Puja actual" : "Precio base"}
                      </p>
                      <p className="text-3xl font-bold text-blue-600">
                        {formatearPrecioConSimbolo(precioMostrar)}
                      </p>
                      {enPuja && producto.incrementoMinimo && (
                        <p className="text-xs text-green-600 mt-1 font-semibold">
                          Incremento:{" "}
                          {formatearPrecioConSimbolo(
                            convertirPrecioANumero(producto.incrementoMinimo)
                          )}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1">
                        Disponibles: {producto.disponibilidad}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-600 mb-4 pb-4 border-b border-gray-200">
                      <span className="bg-purple-50 px-3 py-1.5 rounded-full truncate">
                        {producto.subcategoria?.nombre || "Sin categoría"}
                      </span>
                    </div>

                    {user ? (
                      <div className="space-y-2">
                        {!enPuja && !pujaFinalizada && (
                          <button
                            onClick={() => handleIniciarPuja(producto)}
                            className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all shadow-md flex items-center justify-center gap-2"
                          >
                            <Gavel size={18} />
                            Iniciar Puja
                          </button>
                        )}
                        {enPuja && !pujaFinalizada && (
                          <button
                            onClick={() => handleAbrirModalPujar(producto)}
                            className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md"
                          >
                            💰 Pujar Ahora
                          </button>
                        )}
                        {pujaFinalizada && (
                          <button
                            disabled
                            className="w-full py-3 bg-gray-400 text-white font-bold rounded-xl cursor-not-allowed opacity-60"
                          >
                            Puja Finalizada
                          </button>
                        )}
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

      {/* Modal Crear Producto */}
      {mostrarModal && (
        <div
          key="modal-crear-producto"
          className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50 p-4"
        >
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-[#101c22] px-8 py-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                Agregar nuevo producto
              </h2>
              <button
                onClick={() => setMostrarModal(false)}
                className="text-white hover:text-gray-200 p-2 hover:bg-white/20 rounded-full transition-colors"
                disabled={enviando}
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
                    onChange={handleImagenChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    title="Haz clic para subir una imagen"
                    disabled={enviando}
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                    {imagenPreview ? (
                      <img
                        src={imagenPreview}
                        alt="Previsualización"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 group-hover:text-[#101c22] transition-colors flex flex-col items-center">
                        <Upload size={48} />
                        <span className="text-sm font-bold mt-2">
                          Subir imagen
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-3/5 p-8 overflow-y-auto max-h-[calc(90vh-88px)]">
                <form onSubmit={handleCrearProducto} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Nombre del producto *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nombre}
                      onChange={(e) =>
                        setFormData({ ...formData, nombre: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#101c22] focus:border-transparent"
                      disabled={enviando}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Descripción *
                    </label>
                    <textarea
                      required
                      value={formData.descripcion}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          descripcion: e.target.value,
                        })
                      }
                      rows={4}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#101c22] focus:border-transparent resize-none"
                      disabled={enviando}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Precio base *
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.precio}
                        onChange={(e) =>
                          setFormData({ ...formData, precio: e.target.value })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#101c22] focus:border-transparent"
                        disabled={enviando}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Cantidad disponible *
                      </label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={formData.disponibilidad}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            disponibilidad: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#101c22] focus:border-transparent"
                        disabled={enviando}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Categoría *
                    </label>
                    <select
                      required
                      value={formData.subcategoriaId}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subcategoriaId: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#101c22] focus:border-transparent"
                      disabled={enviando}
                    >
                      <option value="">Seleccionar categoría</option>
                      {subcategorias.map((sub) => (
                        <option key={sub.id} value={sub.id}>
                          {sub.nombre} - {sub.categoria?.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setMostrarModal(false)}
                      className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                      disabled={enviando}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-6 py-4 bg-[#101c22] text-white font-bold rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      disabled={enviando}
                    >
                      {enviando ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Creando...
                        </>
                      ) : (
                        "Crear Producto"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Iniciar Puja */}
      {mostrarModalIniciarPuja && productoSeleccionado && (
        <div key="modal-iniciar-puja">
          <ModalIniciarPuja
            productoId={productoSeleccionado.id}
            productoNombre={productoSeleccionado.nombre}
            onClose={() => {
              setMostrarModalIniciarPuja(false);
              setProductoSeleccionado(null);
            }}
            onSuccess={handlePujaCreada}
          />
        </div>
      )}

      {/* Modal Pujar */}
      {mostrarModalPujar && productoSeleccionado && (
        <div key="modal-pujar">
          <ModalPujar
            productoId={productoSeleccionado.id}
            productoNombre={productoSeleccionado.nombre}
            user={user}
            onClose={() => {
              setMostrarModalPujar(false);
              setProductoSeleccionado(null);
            }}
            onSuccess={handlePujaRealizada}
          />
        </div>
      )}
    </div>
  );
};

export default Subastas;
