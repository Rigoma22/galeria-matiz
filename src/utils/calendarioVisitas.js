const LUNES_FESTIVOS_2027 = new Set([
  '2027-01-11',
  '2027-03-22',
  '2027-05-10',
  '2027-05-31',
  '2027-06-07',
  '2027-07-05',
  '2027-07-12',
  '2027-08-16',
  '2027-10-18',
  '2027-11-01',
  '2027-11-15'
]);

const CALENDARIO_FESTIVOS_2027 = new Set([
  '2026-12-08',
  '2026-12-25',
  '2027-01-01',
  '2027-03-25',
  '2027-03-26',
  '2027-05-01',
  '2027-07-20',
  '2027-08-07',
  '2027-12-08',
  '2027-12-25'
]);

const HORARIOS = {
  regular: ['10:00', '12:00', '14:00', '16:00'],
  festivo: ['11:00', '13:00', '15:00']
};

function fechaISOValida(fecha) {
  if (
    typeof fecha !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(fecha)
  ) {
    return false;
  }

  const [anio, mes, dia] = fecha.split('-').map(Number);
  const fechaUTC = new Date(Date.UTC(anio, mes - 1, dia));

  return (
    fechaUTC.getUTCFullYear() === anio &&
    fechaUTC.getUTCMonth() === mes - 1 &&
    fechaUTC.getUTCDate() === dia
  );
}

function sumarDias(fecha, dias) {
  const [anio, mes, dia] = fecha.split('-').map(Number);
  const resultado = new Date(
    Date.UTC(anio, mes - 1, dia + dias)
  );

  return resultado.toISOString().slice(0, 10);
}

export function consultarApertura(fecha) {
    if (!fechaISOValida(fecha)) {
        return {
            abierto: false,
            motivo: 'Fecha inválida.'
        };
    }

    const [anio, mes, dia] = fecha.split('-').map(Number);
    const diaSemana = new Date(Date.UTC(anio, mes - 1, dia)).getUTCDay();
  
    // Validación Lunes festivos.
    if ( diaSemana === 2 && LUNES_FESTIVOS_2027.has(sumarDias(fecha, -1))) {
        return {
            abierto: false,
            motivo: 'Cerrado por compensación del lunes festivo.'
        };
    }

    if (LUNES_FESTIVOS_2027.has(fecha)) {
        return {
            abierto: true,
            horario: 'festivo',
            motivo: 'Apertura especial por lunes festivo.'
        };
    }
  
    if (CALENDARIO_FESTIVOS_2027.has(fecha)) {
        return {
            abierto: true,
            horario: 'festivo',
            motivo: 'Día festivo.'
        };
    }
    if ( diaSemana === 1 ) {
        return {
            abierto: false,
            motivo: 'Cerrado por mantenimiento.'
        };
    }
    
    return {
        abierto: true,
        horario: diaSemana === 0 ? 'festivo' : 'regular',
        motivo: ''
    };
}

export function obtenerHorariosVisita(fecha) {
  if (!fecha) return [];

  const apertura = consultarApertura(fecha);

  if (!apertura.abierto) return [];

  return [...HORARIOS[apertura.horario]];
}

export function validarSesionVisita(fecha, horario) {
  const apertura = consultarApertura(fecha);

  if (!apertura.abierto) {
    throw new Error(apertura.motivo);
  }

  if (!obtenerHorariosVisita(fecha).includes(horario)) {
    throw new Error(
      'El horario seleccionado no corresponde a la fecha.'
    );
  }

  const ahora = new Date();

  const anio = ahora.getFullYear();
  const mes = String(
    ahora.getMonth() + 1
  ).padStart(2, '0');
  const dia = String(
    ahora.getDate()
  ).padStart(2, '0');

  const hoy = `${anio}-${mes}-${dia}`;

  if (fecha < hoy) {
    throw new Error(
      'No se permiten visitas en fechas anteriores.'
    );
  }

  if (fecha === hoy) {
    const [hora, minuto] = horario.split(':').map(Number);
    const minutosSesion = hora * 60 + minuto;
    const minutosActuales =
      ahora.getHours() * 60 + ahora.getMinutes();

    if (minutosSesion <= minutosActuales) {
      throw new Error(
        'El horario seleccionado ya no está disponible.'
      );
    }
  }

  return true;
}