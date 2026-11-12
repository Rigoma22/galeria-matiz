export const TARIFAS_ENTRADAS = Object.freeze({
  general: 15000,
  preferencial: 10000,
  infantil: 0
});

export const AFORO_GALERIA = 150;
export const MAXIMO_GRUPO = 50;
export const MINIMO_GRUPO = 5;
export const MAXIMO_NINOS_INDIVIDUAL = 5;

export function obtenerTarifaGrupal(personas) {
  if (!Number.isInteger(personas) ||
      personas < MINIMO_GRUPO ||
      personas > MAXIMO_GRUPO) {
    throw new Error(
      'La reserva debe tener entre 5 y 50 personas.'
    );
  }

  if (personas <= 10) return 10000;
  if (personas <= 30) return 8000;
  return 5000;
}

export function calcularEntradas({
  generales = 0,
  preferenciales = 0,
  infantiles = 0,
  adultosResponsables = 0
}) {
  const cantidades = [
    generales,
    preferenciales,
    infantiles,
    adultosResponsables
  ];

  if (cantidades.some(
    n => !Number.isInteger(n) || n < 0
  )) {
    throw new Error('Las cantidades deben ser enteros no negativos.');
  }

  const totalPersonas =
    generales + preferenciales + infantiles;

  if (totalPersonas === 0) {
    throw new Error('Selecciona al menos una entrada.');
  }

  if (infantiles > MAXIMO_NINOS_INDIVIDUAL) {
    throw new Error(
      'Más de cinco menores requieren una reserva grupal.'
    );
  }

  const entradasPagadas = generales + preferenciales;

  if (adultosResponsables > entradasPagadas) {
    throw new Error(
      'Los adultos responsables deben tener una entrada.'
    );
  }

  if (infantiles > 0 && adultosResponsables < 1) {
    throw new Error(
      'Los menores deben ingresar con un adulto responsable.'
    );
  }

  return {
    totalPersonas,
    total:
      generales * TARIFAS_ENTRADAS.general +
      preferenciales * TARIFAS_ENTRADAS.preferencial
  };
}

export function calcularReservaGrupal(personas) {
  const precioUnitario = obtenerTarifaGrupal(personas);

  return {
    personas,
    precioUnitario,
    total: personas * precioUnitario
  };
}