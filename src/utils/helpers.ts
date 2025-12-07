export const parsePrecio = (precio: string | number): number => {
  return typeof precio === 'string' ? parseFloat(precio) : precio;
};

export const formatearPrecio = (precio: string | number): string => {
  const precioNum = parsePrecio(precio);
  return precioNum.toFixed(2);
};

export const formatearPrecioConSimbolo = (precio: string | number): string => {
  return `$${formatearPrecio(precio)}`;
};