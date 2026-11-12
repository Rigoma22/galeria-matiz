export const estadoInicialCarrito = {
  items: []
};

export const TIPOS_ITEM = [
  'producto',
  'curso',
  'entrada',
  'reserva_grupal'
];

export function carritoReducer(estado, accion) {
  switch (accion.type) {

    case 'AGREGAR_ITEM': {
      const nuevo = accion.payload;

      const existente = estado.items.find(
        item => item.clave === nuevo.clave
      );

      if (existente) {
        return {
          ...estado,
          items: estado.items.map(item =>
            item.clave === nuevo.clave
              ? {
                  ...item,
                  cantidad: item.cantidad + nuevo.cantidad
                }
              : item
          )
        };
      }

      return {
        ...estado,
        items: [...estado.items, nuevo]
      };
    }

    case 'ELIMINAR_ITEM':
      return {
        ...estado,
        items: estado.items.filter(
          item => item.clave !== accion.payload
        )
      };

    case 'ACTUALIZAR_CANTIDAD':
      return {
        ...estado,
        items: estado.items.map(item =>
          item.clave === accion.payload.clave
            ? {
                ...item,
                cantidad: accion.payload.cantidad
              }
            : item
        )
      };

    case 'VACIAR_CARRITO':
      return estadoInicialCarrito;

    default:
      return estado;
  }
}