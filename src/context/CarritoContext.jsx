import { createContext, useContext, useReducer } from 'react';
import { carritoReducer, estadoInicialCarrito } from '../reducers/carritoReducer';
import { AFORO_GALERIA, calcularEntradas, calcularReservaGrupal } from '../config/tarifasVisitas';

const CarritoContext = createContext(null);

const esEnteroPositivo = valor =>
   Number.isInteger(valor) && valor > 0;

const esPrecioValido = valor =>
   Number.isFinite(valor) && valor >= 0;

const validarSesion = (fecha, horario) => {
  if (
    typeof fecha !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(fecha) ||
    typeof horario !== 'string' ||
    !horario.trim()
  ) {
    throw new Error('Selecciona una fecha y un horario válidos');
  }
};

const generarClave = (tipo) => 
  `${tipo}:${crypto.randomUUID()}`;  

export function CarritoProvider({ children }) {

  const [estado, dispatch] = useReducer(
    carritoReducer,
    estadoInicialCarrito
  );

  const guardarItem = item => {

    dispatch({
      type: 'GUARDAR_ITEM',
      payload: item
    });
  };

  const buscarItem = clave => 
    estado.items.find(item => item.clave === clave);

  //Validación de la cantidad de entradas y reservas grupales
  const validarAforo = (
    fecha, horario, nuevosVisitantes
  ) => {
    const ocupacionCarrito = estado.items
      .filter(item => ['entrada', 'reserva_grupal'].includes(item.tipo) && 
        item.detalles.fecha === fecha && 
        item.detalles.horario === horario)
      .reduce((total, item) => total + item.cantidad, 0);

      if (ocupacionCarrito + nuevosVisitantes > AFORO_GALERIA) {
        throw new Error(`La selección supera los ${AFORO_GALERIA} ` + 'visitantes por horario.');
      }
  };

  //Control Productos Tienda de Arte
  const agregarProducto = producto => {
    const id = producto.referenciaId ?? producto._id;
    const precio = producto.precioUnitario ?? producto.precio;
    const stock = producto.stock;

    if (!id || !esPrecioValido(precio) ||
        !Number.isInteger(stock) || stock < 0) {
      throw new Error('Información del producto incompleta.');
    }

    const clave = `producto:${id}`;
    const existente = buscarItem(clave);
    const cantidad = (existente?.cantidad ?? 0) + 1;

    if (cantidad > stock) {
      throw new Error(
        'La cantidad solicitada supera el inventario disponible.'
      );
    }

    guardarItem({
      clave,
      tipo: 'producto',
      referenciaId: String(id),
      nombre: producto.nombre,
      imagen: producto.imagenes?.[0] ??
        producto.imagen ?? '',
      precioUnitario: precio,
      cantidad,
      subtotal: precio * cantidad,
      detalles: { stock }
    });
  };

  //Control Cursos 
  const agregarCurso = curso => {
    const id = curso.referenciaId ?? curso.id;

    if (
      id == null ||
      !curso.sesionId ||
      !esPrecioValido(curso.precioUnitario ?? curso.precio) ||
      !esEnteroPositivo(curso.cupos)
    ) {
      throw new Error(
        'El curso requiere precio, sesión y cupos válidos.'
      );
    }

    const precio = curso.precioUnitario ?? curso.precio;
    const clave = `curso:${id}:${curso.sesionId}`;
    const existente = buscarItem(clave);
    const cantidad = (existente?.cantidad ?? 0) + 1;

    if (cantidad > curso.cupos) {
      throw new Error('No hay suficientes cupos disponibles.');
    }

    guardarItem({
      clave,
      tipo: 'curso',
      referenciaId: String(id),
      nombre: curso.nombre,
      imagen: curso.imagen || '',
      precioUnitario: precio,
      cantidad,
      subtotal: precio * cantidad,
      detalles: {
        sesionId: curso.sesionId,
        cupos: curso.cupos,
        docente: curso.docente || '',
        tipoActividad: curso.tipo || 'curso'
      }
    });
  };

  //Control Entradas Individuales
  const agregarEntradas = seleccion => {
    const {
      fecha,
      horario,
      generales = 0,
      preferenciales = 0,
      infantiles = 0,
      adultosResponsables = 0
    } = seleccion;

    validarSesion(fecha, horario);

    const calculo = calcularEntradas({
      generales,
      preferenciales,
      infantiles,
      adultosResponsables
    });

    validarAforo(
      fecha,
      horario,
      calculo.totalPersonas
    );

    guardarItem({
      clave: generarClave('entrada'),
      tipo: 'entrada',
      referenciaId: 'entrada-galeria',
      nombre: 'Entradas Galería MATIZ',
      imagen: '',
      precioUnitario: null,
      cantidad: calculo.totalPersonas,
      subtotal: calculo.total,
      detalles: {
        fecha,
        horario,
        generales,
        preferenciales,
        infantiles,
        adultosResponsables
      }
    });
  };

  //Control Reservas Grupales
  const agregarReservaGrupal = reserva => {
    const {
      fecha,
      horario,
      personas
    } = reserva;

    validarSesion(fecha, horario);

    const calculo = calcularReservaGrupal(personas);

    validarAforo(fecha, horario, personas);

    guardarItem({
      clave: generarClave('reserva_grupal'),
      tipo: 'reserva_grupal',
      referenciaId: 'visita-grupal',
      nombre: 'Reserva grupal Galería MATIZ',
      imagen: '',
      precioUnitario: calculo.precioUnitario,
      cantidad: personas,
      subtotal: calculo.total,
      detalles: {
        fecha,
        horario,
        asistentes: personas
      }
    });
  };

//Compatibilidad inicial con la Tienda de Arte
const agregarItem = item => {
    if (item.tipo !== 'producto') {
      throw new Error(
        'Utiliza el método específico para este tipo de artículo.'
      );
    }

    agregarProducto(item);
  };

  const eliminarItem = clave => {
    dispatch({
      type: 'ELIMINAR_ITEM',
      payload: clave
    });
  };

  const actualizarCantidad = (clave, cantidad) => {
    const item = buscarItem(clave);

    if (!item || item.tipo !== 'producto') {
      throw new Error(
        'Solo se permite editar directamente productos.'
      );
    }

    if (
      !esEnteroPositivo(cantidad) ||
      cantidad > item.detalles.stock
    ) {
      throw new Error('Cantidad fuera del inventario disponible.');
    }

    guardarItem({
      ...item,
      cantidad,
      subtotal: cantidad * item.precioUnitario
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
    (total, item) => total + item.subtotal,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        items: estado.items,
        cantidadCarrito,
        totalCarrito,
        agregarItem,
        agregarProducto,
        agregarCurso,
        agregarEntradas,
        agregarReservaGrupal,
        eliminarItem,
        actualizarCantidad,
        vaciarCarrito
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  const contexto = useContext(CarritoContext);

  if (!contexto) {
    throw new Error(
      'useCarrito debe utilizarse dentro de CarritoProvider.'
    );
  }

  return contexto;
}