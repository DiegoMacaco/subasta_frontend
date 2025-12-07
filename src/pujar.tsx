// src/components/ModalPujar.tsx
import React, { useState, useEffect } from "react";
import {
  X,
  Loader2,
  DollarSign,
  TrendingUp,
  Clock,
  User as UserIcon,
} from "lucide-react";
import { pujasAPI } from "../src/services/api";
import type { DatosPujaProducto } from "../src/services/api";
import { convertirPrecioANumero } from "../src/types/Producto";
import { formatearPrecioConSimbolo } from "../src/utils/helpers";

interface ModalPujarProps {
  productoId: number;
  productoNombre: string;
  user: any;
  onClose: () => void;
  onSuccess: () => void;
}

export const ModalPujar: React.FC<ModalPujarProps> = ({
  productoId,
  productoNombre,
  user,
  onClose,
  onSuccess,
}) => {
  const [enviando, setEnviando] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [datosPuja, setDatosPuja] = useState<DatosPujaProducto | null>(null);
  const [montoPuja, setMontoPuja] = useState("");

  useEffect(() => {
    cargarDatosPuja();
  }, [productoId]);

  const cargarDatosPuja = async () => {
    try {
      setCargando(true);
      const response = await pujasAPI.obtenerPujasProducto(productoId);
      setDatosPuja(response.data);

      // Establecer el monto mínimo sugerido
      const proximoMonto =
        response.data.producto.proximoMontoMinimo ||
        convertirPrecioANumero(response.data.producto.pujaActual) +
          convertirPrecioANumero(response.data.producto.incrementoMinimo);
      setMontoPuja(proximoMonto.toFixed(2));
    } catch (err: any) {
      console.error("Error al cargar datos de puja:", err);
      alert("Error al cargar la información de la puja");
    } finally {
      setCargando(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user.id) {
      alert("Debes iniciar sesión para pujar");
      return;
    }

    try {
      setEnviando(true);

      const pujaData = {
        monto: parseFloat(montoPuja),
        productoId: productoId,
        usuarioId: user.id,
        nombreUsuario: user.nombre || user.email || "Usuario",
      };

      await pujasAPI.crearPuja(pujaData);

      alert("¡Puja realizada exitosamente!");
      onSuccess();

      setTimeout(() => {
        onClose();
      }, 100);
    } catch (err: any) {
      console.error("Error al realizar puja:", err);
      const mensaje =
        err.response?.data?.message || "Error al realizar la puja";
      alert(mensaje);
      // Recargar datos para actualizar el monto mínimo
      cargarDatosPuja();
    } finally {
      setEnviando(false);
    }
  };

  const calcularTiempoRestante = () => {
    if (!datosPuja?.producto.fechaFinPuja) return "Calculando...";

    const ahora = new Date();
    const fechaFin = new Date(datosPuja.producto.fechaFinPuja);
    const diferencia = fechaFin.getTime() - ahora.getTime();

    if (diferencia <= 0) return "Puja finalizada";

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor(
      (diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));

    if (dias > 0) return `${dias}d ${horas}h ${minutos}m`;
    if (horas > 0) return `${horas}h ${minutos}m`;
    return `${minutos}m`;
  };

  if (cargando) {
    return (
      <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando información...</p>
        </div>
      </div>
    );
  }

  if (!datosPuja) {
    return null;
  }

  const pujaActual = convertirPrecioANumero(datosPuja.producto.pujaActual);
  const incrementoMinimo = convertirPrecioANumero(
    datosPuja.producto.incrementoMinimo
  );
  const proximoMontoMinimo = pujaActual + incrementoMinimo;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-5 flex justify-between items-center rounded-t-3xl sticky top-0 z-10">
          <h2 className="text-xl font-bold text-white">💰 Realizar Puja</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 p-2 hover:bg-white/20 rounded-full transition-colors"
            disabled={enviando}
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Info del producto */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border-2 border-blue-200">
            <p className="text-xs text-gray-600 mb-1">Producto:</p>
            <p className="font-bold text-gray-900 text-lg">{productoNombre}</p>
            {datosPuja.producto.descripcion && (
              <p className="text-sm text-gray-600 mt-2">
                {datosPuja.producto.descripcion}
              </p>
            )}
          </div>

          {/* Estado actual de la puja */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign size={16} className="text-green-600" />
                <p className="text-xs text-gray-600 font-semibold">
                  Puja actual
                </p>
              </div>
              <p className="text-2xl font-bold text-green-600">
                {formatearPrecioConSimbolo(pujaActual)}
              </p>
              {datosPuja.pujaMasAlta && (
                <p className="text-xs text-gray-500 mt-1">
                  por {datosPuja.pujaMasAlta.nombreUsuario}
                </p>
              )}
            </div>

            <div className="bg-orange-50 p-4 rounded-xl border-2 border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-orange-600" />
                <p className="text-xs text-gray-600 font-semibold">
                  Tiempo restante
                </p>
              </div>
              <p className="text-2xl font-bold text-orange-600">
                {calcularTiempoRestante()}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {datosPuja.totalPujas}{" "}
                {datosPuja.totalPujas === 1 ? "puja" : "pujas"}
              </p>
            </div>
          </div>

          {/* Historial de pujas */}
          {datosPuja.pujas && datosPuja.pujas.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp size={16} />
                Últimas pujas
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {datosPuja.pujas.slice(0, 5).map((puja, index) => (
                  <div
                    key={puja.id}
                    className={`flex justify-between items-center p-2 rounded-lg ${
                      index === 0
                        ? "bg-green-100 border border-green-300"
                        : "bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <UserIcon size={14} className="text-gray-500" />
                      <span className="text-sm font-medium text-gray-900">
                        {puja.nombreUsuario}
                      </span>
                      {index === 0 && (
                        <span className="text-xs bg-green-600 text-white px-2 py-0.5 rounded-full">
                          Líder
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {formatearPrecioConSimbolo(
                        convertirPrecioANumero(puja.monto)
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formulario de puja */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-blue-600" />
                <p className="text-xs text-gray-600 font-semibold">
                  Incremento mínimo
                </p>
              </div>
              <p className="text-lg font-bold text-blue-600">
                {formatearPrecioConSimbolo(incrementoMinimo)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-2">
                <DollarSign size={16} className="text-indigo-600" />
                Tu puja *
              </label>
              <input
                type="number"
                step="0.01"
                min={proximoMontoMinimo}
                required
                value={montoPuja}
                onChange={(e) => setMontoPuja(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all text-lg font-bold"
                disabled={enviando}
                placeholder={`Mínimo: ${proximoMontoMinimo.toFixed(2)}`}
              />
              <p className="text-xs text-gray-500 mt-1">
                💡 Tu puja debe ser al menos{" "}
                {formatearPrecioConSimbolo(proximoMontoMinimo)}
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
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                disabled={enviando}
              >
                {enviando ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>💰 Confirmar Puja</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
