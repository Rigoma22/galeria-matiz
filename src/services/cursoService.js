import cursosData from "../data/cursosData.json"

function normalizarCurso(curso) {
  return {
    ...curso,
    imagen: curso.imagen?.replace('../../public/', '/') ?? '',
    sesionId: `edicion-${curso.id}-${curso.fechaInicio}`
  };
}

export const obtenerCursos = async () => {
    return cursosData.map(normalizarCurso);
};

export const obtenerCursoPorId = async (id) => {
    const curso = cursosData.find(item => String(item.id) === String(id));
    return curso ? normalizarCurso(curso) : null;
};