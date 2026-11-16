const API_URL =
  `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/productos`;

async function solicitar(ruta, opciones = {}) {
  let respuesta;

  try {
    respuesta = await fetch(`${API_URL}${ruta}`, {
      ...opciones,
      headers: {
        'Content-Type': 'application/json',
        ...opciones.headers
      }
    });
  } catch {
    throw new Error('No fue posible conectar con el servidor.');
  }

  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(
      datos.mensaje || 'No se pudo completar la operación.'
    );
  }

  return datos;
}

export const consultarProductosAdmin = ({
  activo = '',
  buscar = '',
  pagina = 1,
  limite = 10
} = {}) => {
  const parametros = new URLSearchParams({
    pagina: String(pagina),
    limite: String(limite)
  });

  if (activo !== '') {
    parametros.set('activo', activo);
  }

  if (buscar.trim()) {
    parametros.set('buscar', buscar.trim());
  }

  return solicitar(`/admin?${parametros.toString()}`);
};

export const crearProductoAdmin = producto =>
  solicitar('/', {
    method: 'POST',
    body: JSON.stringify(producto)
  });

export const actualizarProductoAdmin = (id, producto) =>
  solicitar(`/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(producto)
  });

export const eliminarProductoAdmin = id =>
  solicitar(`/${id}`, {
    method: 'DELETE'
  });

export const reactivarProductoAdmin = id =>
  solicitar(`/${id}/reactivar`, {
    method: 'PATCH'
  });