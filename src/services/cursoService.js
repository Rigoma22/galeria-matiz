import cursosData from "../data/cursosData.json"

export const obtenerCursos = async () => {
    return cursosData;
}

export const obtenerCursoPorId = async (id) => {
    return cursosData.find((curso) => curso.id === id);
}