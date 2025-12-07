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
    nombreUsuario: data.email.split('@')[0], // Generado automáticamente
  }),
  
  login: (data: { email: string; password: string }) => 
    api.post('/usuarios/login', {
      correo: data.email,
      contrasena: data.password,
    }),
};

export const productosAPI = {
  // Obtener todos los productos
  obtenerTodos: () => 
    api.get<Producto[]>('/productos'),

  // Obtener solo productos activos
  obtenerActivos: () => 
    api.get<Producto[]>('/productos/activos'),

  // Obtener un producto por ID
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

  // Eliminar (soft delete)
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

export default api;