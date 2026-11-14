import novedadesData from "../data/novedadesData.json"

export const obtenerNovedades = async () => {
    return novedadesData;
}

export const obtenerNovedadPorId = async (id) => {
    return novedadesData.find((novedad) => novedad.id === id);
}