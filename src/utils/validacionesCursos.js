const ZONA_HORARIA = 'America/Bogota';

function obtenerFechaHoraBogota() {
  const partes = new Intl.DateTimeFormat('en-CA', {
    timeZone: ZONA_HORARIA,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(new Date());

  const valores = Object.fromEntries(
    partes.map(parte => [parte.type, parte.value])
  );

  return {
    fecha: `${valores.year}-${valores.month}-${valores.day}`,
    horario: `${valores.hour}:${valores.minute}`
  };
}

function fechaValida(fecha) {
  if (
    typeof fecha !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(fecha)
  ) {
    return false;
  }

  const [anio, mes, dia] = fecha.split('-').map(Number);
  const resultado = new Date(Date.UTC(anio, mes - 1, dia));

  return (
    resultado.getUTCFullYear() === anio &&
    resultado.getUTCMonth() === mes - 1 &&
    resultado.getUTCDate() === dia
  );
}

function horarioValido(horario) {
  return (
    typeof horario === 'string' &&
    /^([01]\d|2[0-3]):[0-5]\d$/.test(horario)
  );
}

export function validarInscripcionCurso(curso) {
  if (!curso) {
    throw new Error('No se encontró la actividad.');
  }

  if (!fechaValida(curso.fechaInicio)) {
    throw new Error(
      'La actividad no tiene una fecha de inicio válida.'
    );
  }

  const primerHorario = curso.horarios?.[0]?.horaInicio;

  if (!horarioValido(primerHorario)) {
    throw new Error(
      'La actividad no tiene un horario de inicio válido.'
    );
  }

  const ahora = obtenerFechaHoraBogota();

  if (
    curso.fechaInicio < ahora.fecha ||
    (
      curso.fechaInicio === ahora.fecha &&
      primerHorario <= ahora.horario
    )
  ) {
    throw new Error(
      'Las inscripciones están cerradas porque ' +
      'la actividad ya comenzó.'
    );
  }

  if (
    !Number.isInteger(curso.cupos) ||
    curso.cupos <= 0
  ) {
    throw new Error(
      'No hay cupos disponibles para esta actividad.'
    );
  }

  return true;
}

export function obtenerEstadoInscripcion(curso) {
  try {
    validarInscripcionCurso(curso);

    return {
      disponible: true,
      mensaje: 'Inscripciones abiertas'
    };
  } catch (error) {
    return {
      disponible: false,
      mensaje: error.message
    };
  }
}
