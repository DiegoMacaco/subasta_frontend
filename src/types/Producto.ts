// src/types/Producto.ts

export interface CategoriaProducto {
  id: number;
  nombre: string;
  descripcion: string | null;
  activo: boolean;
  fechaCreacion: string;
  fechaModificacion: string;
}

export interface SubcategoriaProducto {
  id: number;
  nombre: string;
  descripcion: string | null;
  activo: boolean;
  categoriaId: number;
  categoria?: CategoriaProducto;
  fechaCreacion: string;
  fechaModificacion: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string | null;
  precio: string | number; // TypeORM devuelve DECIMAL como string
  disponibilidad: number | null;
  imagen: string | null;
  activo: boolean;
  subcategoriaId: number;
  subcategoria?: SubcategoriaProducto;
  fechaCreacion: string;
  fechaModificacion: string;
}

export interface CrearProductoDTO {
  nombre: string;
  descripcion: string;
  precio: number;
  disponibilidad: number;
  subcategoriaId: number;
  imagen?: File | null;
}

export interface ActualizarProductoDTO {
  nombre?: string;
  descripcion?: string;
  precio?: number;
  disponibilidad?: number;
  subcategoriaId?: number;
  imagen?: File | null;
}