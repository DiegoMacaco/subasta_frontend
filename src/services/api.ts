import axios from 'axios';
import type { Producto, CategoriaProducto, SubcategoriaProducto } from '../types/Producto';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const usuariosAPI = {
  registro: (data: {
    firstName: string;
    lastName: string;
    motherLastName: string;
    email: string;
    password: string;
    phone: string;
  }) => api.post('/usuarios/registro', {
    nombre: data.firstName,
    apellidoPaterno: data.lastName,
    apellidoMaterno: data.motherLastName,
    correo: data.email,
    contrasena: data.password,
    telefono: data.phone,
    nombreUsuario: data.email.split('@')[0], 
  }),
  
  login: (data: { email: string; password: string }) => 
    api.post('/usuarios/login', {
      correo: data.email,
      contrasena: data.password,
    }),
};


export const productosAPI = {
  obtenerTodos: () => 
    api.get<Producto[]>('/productos'),

  obtenerActivos: () => 
    api.get<Producto[]>('/productos/activos'),

  obtenerPorId: (id: number) => 
    api.get<Producto>(`/productos/${id}`),

  crear: async (data: {
    nombre: string;
    descripcion: string;
    precio: number;
    disponibilidad: number;
    subcategoriaId: number;
    imagen?: File;
  }) => {
    const formData = new FormData();
    formData.append('nombre', data.nombre);
    formData.append('descripcion', data.descripcion);
    formData.append('precio', data.precio.toString());
    formData.append('disponibilidad', data.disponibilidad.toString());
    formData.append('subcategoriaId', data.subcategoriaId.toString());
    
    if (data.imagen) {
      formData.append('imagen', data.imagen);
    }

    return api.post<Producto>('/productos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  actualizar: async (id: number, data: {
    nombre?: string;
    descripcion?: string;
    precio?: number;
    disponibilidad?: number;
    subcategoriaId?: number;
    imagen?: File;
  }) => {
    const formData = new FormData();
    
    if (data.nombre) formData.append('nombre', data.nombre);
    if (data.descripcion) formData.append('descripcion', data.descripcion);
    if (data.precio) formData.append('precio', data.precio.toString());
    if (data.disponibilidad) formData.append('disponibilidad', data.disponibilidad.toString());
    if (data.subcategoriaId) formData.append('subcategoriaId', data.subcategoriaId.toString());
    if (data.imagen) formData.append('imagen', data.imagen);

    return api.patch<Producto>(`/productos/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  cambiarEstado: (id: number, activo: boolean) => 
    api.patch(`/productos/${id}/estado`, { activo }),

  eliminar: (id: number) => 
    api.delete(`/productos/${id}`),
};


export const categoriasAPI = {
  obtenerTodas: () => 
    api.get<CategoriaProducto[]>('/categorias'),

  obtenerPorId: (id: number) => 
    api.get<CategoriaProducto>(`/categorias/${id}`),

  crear: (data: { nombre: string; descripcion?: string }) => 
    api.post<CategoriaProducto>('/categorias', data),

  actualizar: (id: number, data: { nombre?: string; descripcion?: string }) => 
    api.patch<CategoriaProducto>(`/categorias/${id}`, data),
};


export const subcategoriasAPI = {
  obtenerTodas: () => 
    api.get<SubcategoriaProducto[]>('/subcategorias'),

  obtenerPorId: (id: number) => 
    api.get<SubcategoriaProducto>(`/subcategorias/${id}`),

  crear: (data: { 
    nombre: string; 
    descripcion?: string; 
    categoriaId: number 
  }) => 
    api.post<SubcategoriaProducto>('/subcategorias', data),

  actualizar: (id: number, data: { 
    nombre?: string; 
    descripcion?: string;
    categoriaId?: number;
  }) => 
    api.patch<SubcategoriaProducto>(`/subcategorias/${id}`, data),
};


// Tipo para una puja individual
export interface Puja {
  id: number;
  monto: string | number;
  usuarioId: number;
  nombreUsuario: string;
  productoId: number;
  fechaCreacion: string;
}

// Tipo para la información completa del producto en puja
export interface ProductoPujaInfo {
  id: number;
  nombre: string;
  descripcion: string | null;
  imagen: string | null;
  subcategoria: string;
  precioInicial: string | number;
  pujaActual: string | number;
  incrementoMinimo: string | number;
  fechaInicioPuja: string;
  fechaFinPuja: string;
  enPuja: boolean;
  pujaFinalizada: boolean;
  proximoMontoMinimo: number | null;
}

// Tipo para la respuesta completa de pujas de un producto
export interface DatosPujaProducto {
  producto: ProductoPujaInfo;
  pujas: Puja[];
  totalPujas: number;
  pujaMasAlta: Puja | null;
}

// Tipo para crear una nueva puja
export interface CrearPujaData {
  monto: number;
  productoId: number;
  usuarioId: number;
  nombreUsuario: string;
}

// Tipo para iniciar una puja en un producto
export interface IniciarPujaData {
  precioInicial: number;
  incrementoMinimo: number;
  fechaFinPuja: string; // ISO string
}

// Tipo para la respuesta al crear una puja
export interface CrearPujaResponse {
  puja: Puja;
  mensaje: string;
  pujaActual: number;
  proximoMontoMinimo: number;
}

// Tipo para la respuesta al iniciar una puja
export interface IniciarPujaResponse {
  mensaje: string;
  producto: {
    id: number;
    nombre: string;
    precioInicial: number;
    incrementoMinimo: number;
    fechaFinPuja: string;
  };
}


export interface PujaUsuario {
  id: number;
  monto: string | number;
  fecha: string;
  producto: {
    id: number;
    nombre: string;
    imagen: string | null;
    pujaActual: string | number;
    fechaFinPuja: string;
    enPuja: boolean;
  };
  esGanadora: boolean;
}

export interface ProductoEnPuja {
  id: number;
  nombre: string;
  descripcion: string | null;
  imagen: string | null;
  subcategoria: string;
  precioInicial: string | number;
  pujaActual: string | number;
  incrementoMinimo: string | number;
  fechaFinPuja: string;
  horasRestantes: number;
  pujaFinalizada: boolean;
}


export const pujasAPI = {
  
  iniciarPuja: (productoId: number, data: IniciarPujaData) =>
    api.post<IniciarPujaResponse>(`/pujas/iniciar/${productoId}`, data),

  crearPuja: (data: CrearPujaData) =>
    api.post<CrearPujaResponse>('/pujas', data),

  obtenerPujasProducto: (productoId: number) =>
    api.get<DatosPujaProducto>(`/pujas/producto/${productoId}`),

  obtenerPujasUsuario: (usuarioId: number) =>
    api.get<{ totalPujas: number; pujas: PujaUsuario[] }>(`/pujas/usuario/${usuarioId}`),
  finalizarPuja: (productoId: number) =>
    api.patch(`/pujas/finalizar/${productoId}`),

  obtenerProductosEnPuja: () =>
    api.get<ProductoEnPuja[]>('/pujas/activas'),
};

export default api;