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
  precio: string | number;
  disponibilidad: number | null;
  imagen: string | null;
  activo: boolean;
  subcategoriaId: number;
  subcategoria?: SubcategoriaProducto;
  fechaCreacion: string;
  fechaModificacion: string;

  // Campos de puja
  enPuja: boolean;
  precioInicial: string | number | null;
  pujaActual: string | number | null;
  incrementoMinimo: string | number;
  fechaInicioPuja: string | null;
  fechaFinPuja: string | null;
  pujaFinalizada?: boolean;
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
  precioInicial?: number;
  pujaActual?: number;
  incrementoMinimo?: number;
  enPuja?: boolean;
  fechaInicioPuja?: string;
  fechaFinPuja?: string;
}

// Helper para convertir precios
export function convertirPrecioANumero(
  precio: string | number | null | undefined
): number {
  if (precio === null || precio === undefined) return 0;
  return typeof precio === "string" ? parseFloat(precio) : precio;
}
