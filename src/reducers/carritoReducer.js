export const estadoInicialCarrito = {
  items: []
};

export function carritoReducer(estado, accion) {
  switch (accion.type) {

    case 'GUARDAR_ITEM': {
      const nuevo = accion.payload;

      const existe = estado.items.some(
        item => item.clave === nuevo.clave
      );

      return {
        ...estado,
        items: existe
          ? estado.items.map(item =>
              item.clave === nuevo.clave ? nuevo : item
            )
          : [...estado.items, nuevo]
      };
    }

    case 'ELIMINAR_ITEM':
      return {
        ...estado,
        items: estado.items.filter(
          item => item.clave !== accion.payload
        )
      };

    case 'VACIAR_CARRITO':
      return estadoInicialCarrito;

    default:
      return estado;
  }
}