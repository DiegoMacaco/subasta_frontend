// src/components/ModalIniciarPuja.tsx
import React, { useState } from "react";
import { X, Loader2, Calendar, DollarSign, TrendingUp } from "lucide-react";
import { pujasAPI } from "../src/services/api";

interface ModalIniciarPujaProps {
  productoId: number;
  productoNombre: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const ModalIniciarPuja: React.FC<ModalIniciarPujaProps> = ({
  productoId,
  productoNombre,
  onClose,
  onSuccess,
}) => {
  const [enviando, setEnviando] = useState(false);
  const [formData, setFormData] = useState({
    precioInicial: "",
    incrementoMinimo: "5",
    fechaFinPuja: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setEnviando(true);

      // Convertir la fecha local a ISO string
      const fechaISO = new Date(formData.fechaFinPuja).toISOString();

      await pujasAPI.iniciarPuja(productoId, {
        precioInicial: parseFloat(formData.precioInicial),
        incrementoMinimo: parseFloat(formData.incrementoMinimo),
        fechaFinPuja: fechaISO,
      });

      alert("¡Puja iniciada exitosamente!");
      onSuccess();
      onClose();
    } catch (err: any) {
      console.error("Error al iniciar puja:", err);
      const mensaje = err.response?.data?.message || "Error al iniciar la puja";
      alert(mensaje);
    } finally {
      setEnviando(false);
    }
  };

  // Obtener fecha mínima (1 hora desde ahora)
  const getMinDate = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-5 flex justify-between items-center rounded-t-3xl">
          <h2 className="text-xl font-bold text-white">🎯 Iniciar Puja</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 p-2 hover:bg-white/20 rounded-full transition-colors"
            disabled={enviando}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Producto info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border-2 border-blue-200">
            <p className="text-xs text-gray-600 mb-1">Producto seleccionado:</p>
            <p className="font-bold text-gray-900 text-lg">{productoNombre}</p>
          </div>

          {/* Precio inicial */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <DollarSign size={16} className="text-blue-600" />
              Precio inicial de la puja *
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              required
              value={formData.precioInicial}
              onChange={(e) =>
                setFormData({ ...formData, precioInicial: e.target.value })
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              disabled={enviando}
              placeholder="Ej: 100.00"
            />
            <p className="text-xs text-gray-500 mt-1">
              💡 Este será el precio mínimo para la primera puja
            </p>
          </div>

          {/* Incremento mínimo */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <TrendingUp size={16} className="text-green-600" />
              Incremento mínimo entre pujas *
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              required
              value={formData.incrementoMinimo}
              onChange={(e) =>
                setFormData({ ...formData, incrementoMinimo: e.target.value })
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
              disabled={enviando}
              placeholder="Ej: 5.00"
            />
            <p className="text-xs text-gray-500 mt-1">
              💡 Cada nueva puja debe superar la anterior por este monto
            </p>
          </div>

          {/* Fecha de finalización */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
              <Calendar size={16} className="text-purple-600" />
              Fecha y hora de finalización *
            </label>
            <input
              type="datetime-local"
              required
              min={getMinDate()}
              value={formData.fechaFinPuja}
              onChange={(e) =>
                setFormData({ ...formData, fechaFinPuja: e.target.value })
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
              disabled={enviando}
            />
            <p className="text-xs text-gray-500 mt-1">
              💡 La puja cerrará automáticamente en esta fecha
            </p>
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
              disabled={enviando}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
              disabled={enviando}
            >
              {enviando ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Iniciando...
                </>
              ) : (
                <>🚀 Iniciar Puja</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
