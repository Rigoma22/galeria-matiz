
import {
  createContext,
  useContext,
  useMemo,
  useReducer
} from 'react';

import {
  carritoReducer,
  estadoInicialCarrito,
  TIPOS_ITEM
} from '../reducers/carritoReducer';

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {

  const [estado, dispatch] = useReducer(
    carritoReducer,
    estadoInicialCarrito
  );

  const agregarItem = (item) => {

    if (!TIPOS_ITEM.includes(item.tipo)) {
      throw new Error('Tipo de artículo no válido');
    }

    if (
      !item.referenciaId ||
      !item.clave ||
      !item.nombre ||
      !Number.isInteger(item.cantidad) ||
      item.cantidad < 1 ||
      !Number.isFinite(item.precioUnitario) ||
      item.precioUnitario < 0
    ) {
      throw new Error('Datos del artículo no válidos');
    }

    dispatch({
      type: 'AGREGAR_ITEM',
      payload: item
    });
  };

  const eliminarItem = (clave) => {
    dispatch({
      type: 'ELIMINAR_ITEM',
      payload: clave
    });
  };

  const actualizarCantidad = (clave, cantidad) => {
    const item = estado.items.find(
      item => item.clave === clave
    );

    if (
      !item ||
      item.tipo !== 'producto' ||
      !Number.isInteger(cantidad) ||
      cantidad < 1
    ) {
      return;
    }

    dispatch({
      type: 'ACTUALIZAR_CANTIDAD',
      payload: { clave, cantidad }
    });
  };

  const vaciarCarrito = () => {
    dispatch({ type: 'VACIAR_CARRITO' });
  };

  const cantidadCarrito = estado.items.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const totalCarrito = estado.items.reduce(
    (total, item) =>
      total + item.precioUnitario * item.cantidad,
    0
  );

  const valor = useMemo(() => ({
    items: estado.items,
    cantidadCarrito,
    totalCarrito,
    agregarItem,
    eliminarItem,
    actualizarCantidad,
    vaciarCarrito
  }), [estado.items, cantidadCarrito, totalCarrito]);

  return (
    <CarritoContext.Provider value={valor}>
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const contexto = useContext(CarritoContext);

  if (!contexto) {
    throw new Error(
      'useCarrito debe utilizarse dentro de CarritoProvider'
    );
  }

  return contexto;
}