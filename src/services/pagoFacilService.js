
const BASE_URL =
    `${import.meta.env.VITE_API_URL || 'http://localhost:4000'}/pagos`;

async function solicitar(ruta, opciones = {}) {
    const respuesta = await fetch(`${BASE_URL}${ruta}`, {
        ...opciones,
        headers: {
            'Content-Type': 'application/json',
            ...opciones.headers
        }
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(datos.mensaje || 'Error en PagoFacil.');
    }

    return datos;
}

export const simularPago = datos =>
    solicitar('/simular', {
        method: 'POST',
        body: JSON.stringify(datos)
    });

export const consultarSolicitud = clave =>
    solicitar(`/solicitud/${encodeURIComponent(clave)}`);
