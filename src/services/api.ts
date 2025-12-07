// services/api.ts
import axios from "axios";
import type {
  Producto,
  CategoriaProducto,
  SubcategoriaProducto,
} from "../types/Producto";

const api = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ========================================
// INTERFACES PARA PUJAS
// ========================================

export interface Puja {
  id: number;
  monto: number;
  usuarioId: number;
  nombreUsuario: string;
  productoId: number;
  createdAt: string;
  updatedAt: string;
  activo: boolean;
}

export interface IniciarPujaDto {
  precioInicial: number;
  incrementoMinimo: number;
  fechaFinPuja: string;
}

export interface CrearPujaDto {
  monto: number;
  productoId: number;
  usuarioId: number;
  nombreUsuario: string;
}

export interface DatosPujaProducto {
  producto: {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string | null;
    subcategoria: string;
    precioInicial: number;
    pujaActual: number;
    incrementoMinimo: number;
    fechaInicioPuja: string;
    fechaFinPuja: string;
    enPuja: boolean;
    pujaFinalizada: boolean;
    proximoMontoMinimo: number;
  };
  pujas: Puja[];
  totalPujas: number;
  pujaMasAlta: Puja | null;
}

export interface ResultadoPuja {
  puja: Puja;
  mensaje: string;
  pujaActual: number;
  proximoMontoMinimo: number;
}

// ========================================
// API DE USUARIOS
// ========================================

export const usuariosAPI = {
  registro: (data: {
    firstName: string;
    lastName: string;
    motherLastName: string;
    email: string;
    password: string;
    phone: string;
  }) =>
    api.post("/usuarios/registro", {
      nombre: data.firstName,
      apellidoPaterno: data.lastName,
      apellidoMaterno: data.motherLastName,
      correo: data.email,
      contrasena: data.password,
      telefono: data.phone,
      nombreUsuario: data.email.split("@")[0],
    }),

  login: (data: { email: string; password: string }) =>
    api.post("/usuarios/login", {
      correo: data.email,
      contrasena: data.password,
    }),
};

// ========================================
// API DE PRODUCTOS
// ========================================

export const productosAPI = {
  obtenerTodos: () => api.get<Producto[]>("/productos"),

  obtenerActivos: () => api.get<Producto[]>("/productos/activos"),

  obtenerPorId: (id: number) => api.get<Producto>(`/productos/${id}`),

  crear: async (data: {
    nombre: string;
    descripcion: string;
    precio: number;
    disponibilidad: number;
    subcategoriaId: number;
    imagen?: File;
  }) => {
    const formData = new FormData();
    formData.append("nombre", data.nombre);
    formData.append("descripcion", data.descripcion);
    formData.append("precio", data.precio.toString());
    formData.append("disponibilidad", data.disponibilidad.toString());
    formData.append("subcategoriaId", data.subcategoriaId.toString());

    if (data.imagen) {
      formData.append("imagen", data.imagen);
    }

    return api.post<Producto>("/productos/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  actualizar: async (
    id: number,
    data: {
      nombre?: string;
      descripcion?: string;
      precio?: number;
      disponibilidad?: number;
      subcategoriaId?: number;
      imagen?: File;
    }
  ) => {
    const formData = new FormData();

    if (data.nombre) formData.append("nombre", data.nombre);
    if (data.descripcion) formData.append("descripcion", data.descripcion);
    if (data.precio) formData.append("precio", data.precio.toString());
    if (data.disponibilidad)
      formData.append("disponibilidad", data.disponibilidad.toString());
    if (data.subcategoriaId)
      formData.append("subcategoriaId", data.subcategoriaId.toString());
    if (data.imagen) formData.append("imagen", data.imagen);

    return api.patch<Producto>(`/productos/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  cambiarEstado: (id: number, activo: boolean) =>
    api.patch(`/productos/${id}/estado`, { activo }),

  eliminar: (id: number) => api.delete(`/productos/${id}`),
};

// ========================================
// API DE CATEGORÍAS
// ========================================

export const categoriasAPI = {
  obtenerTodas: () => api.get<CategoriaProducto[]>("/categorias"),

  obtenerPorId: (id: number) => api.get<CategoriaProducto>(`/categorias/${id}`),

  crear: (data: { nombre: string; descripcion?: string }) =>
    api.post<CategoriaProducto>("/categorias", data),

  actualizar: (id: number, data: { nombre?: string; descripcion?: string }) =>
    api.patch<CategoriaProducto>(`/categorias/${id}`, data),
};

// ========================================
// API DE SUBCATEGORÍAS
// ========================================

export const subcategoriasAPI = {
  obtenerTodas: () => api.get<SubcategoriaProducto[]>("/subcategorias"),

  obtenerPorId: (id: number) =>
    api.get<SubcategoriaProducto>(`/subcategorias/${id}`),

  crear: (data: {
    nombre: string;
    descripcion?: string;
    categoriaId: number;
  }) => api.post<SubcategoriaProducto>("/subcategorias", data),

  actualizar: (
    id: number,
    data: {
      nombre?: string;
      descripcion?: string;
      categoriaId?: number;
    }
  ) => api.patch<SubcategoriaProducto>(`/subcategorias/${id}`, data),
};

// ========================================
// API DE PUJAS ⭐ NUEVO
// ========================================

export const pujasAPI = {
  // Iniciar una puja en un producto
  iniciarPuja: (productoId: number, data: IniciarPujaDto) =>
    api.post(`/pujas/iniciar/${productoId}`, data),

  // Crear una nueva puja (pujar)
  crearPuja: (data: CrearPujaDto) => api.post<ResultadoPuja>("/pujas", data),

  // Obtener todas las pujas de un producto
  obtenerPujasProducto: (productoId: number) =>
    api.get<DatosPujaProducto>(`/pujas/producto/${productoId}`),

  // Obtener pujas de un usuario
  obtenerPujasUsuario: (usuarioId: number) =>
    api.get(`/pujas/usuario/${usuarioId}`),

  // Finalizar una puja
  finalizarPuja: (productoId: number) =>
    api.patch(`/pujas/finalizar/${productoId}`),

  // Obtener productos en puja activa
  obtenerProductosEnPuja: () => api.get("/pujas/activas"),
};

export default api;
