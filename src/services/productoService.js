const API_URL = import.meta.env.VITE_API_URL;

// Consultar productos con filtros y paginación
export const obtenerProductos = async ({
    pagina = 1,
    limite = 9,
    categoria = '',
    buscar = ''
} = {}) => {

    const parametros = new URLSearchParams({
        pagina: String(pagina),
        limite: String(limite)
    });

    if (categoria) {
        parametros.append('categoria', categoria);
    }

    if (buscar) {
        parametros.append('buscar', buscar);
    }

    const respuesta = await fetch(
        `${API_URL}/productos?${parametros.toString()}`
    );

    if (!respuesta.ok) {
        throw new Error(
            `Error HTTP: ${respuesta.status}`
        );
    }

    return await respuesta.json();
};

// Consultar un producto por su ID
export const obtenerProductoPorId = async (id) => {

    const respuesta = await fetch(
        `${API_URL}/productos/${encodeURIComponent(id)}`
    );

    if (!respuesta.ok) {
        throw new Error(
            `Error HTTP: ${respuesta.status}`
        );
    }

    return respuesta.json();
};
