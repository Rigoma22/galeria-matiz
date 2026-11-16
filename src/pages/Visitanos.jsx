import { useState } from 'react';

//Importaciones necesarias para la página Visitanos
import { Alert, Badge, Button, Card, Col, Row, Form, Modal } from 'react-bootstrap';
import { useCarrito } from '../context/CarritoContext';
import { consultarApertura, obtenerHorariosVisita, validarSesionVisita } from '../utils/calendarioVisitas';
import { TARIFAS_ENTRADAS, AFORO_GALERIA, calcularEntradas, calcularReservaGrupal } from '../config/tarifasVisitas';

const DIRECCION = 'Av. Calle 26 # 70-40, Bogotá, Colombia';

const URL_MAPA = 'https://www.google.com/maps?q=' + encodeURIComponent(DIRECCION) + '&output=embed';

const URL_MAPS = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(DIRECCION);

const ENTRADAS_INICIALES = {
  fecha: '',
  horario: '',
  generales: 0,
  preferenciales: 0,
  infantiles: 0
};

const GRUPO_INICIAL = {
  fecha: '',
  horario: '',
  personas: 5
};

function formatoCOP(valor) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(valor);
}

function fechaLocal() {
  const ahora = new Date();

  const anio = ahora.getFullYear();
  const mes = String(
    ahora.getMonth() + 1
  ).padStart(2, '0');
  const dia = String(
    ahora.getDate()
  ).padStart(2, '0');

  return `${anio}-${mes}-${dia}`;
}

function SelectorFechaHorario({ fecha, horario, onFecha, onHorario }) {
  const apertura = fecha? consultarApertura(fecha) : null;
  const horarios = obtenerHorariosVisita(fecha);

  return (
    <>
    <Row className="g-3 mb-3">
      <Col md={6}>
        <Form.Group>
          <Form.Label>Fecha de visita</Form.Label>
          <Form.Control
            type="date"
            min={fechaLocal()}
            value={fecha}
            required
            onChange={e => onFecha(e.target.value)}
          />
        </Form.Group>
      </Col>

      <Col md={6}>
        <Form.Group>
          <Form.Label>Bloque Horario de visita</Form.Label>
          <Form.Select
            required
            disabled={!apertura?.abierto}
            value={horario}
            onChange={e => onHorario(e.target.value)}
          >
            <option value="">Seleccionar horario</option>
            {horarios.map(hora => (
              <option key={hora} value={hora}>{hora}</option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
    </Row>

    {apertura && !apertura.abierto && (
      <Alert variant="warning">
        {apertura.motivo}
      </Alert>
    )}

    {apertura?.abierto && apertura.motivo && (
      <p className="small text-muted">
        {apertura.motivo}
      </p>
    )}
    </>
  );
}

function CampoCantidad({ etiqueta, valor, maximo, onChange }) {
  return (
    <Form.Group>
      <Form.Label>{etiqueta}</Form.Label>
      <Form.Control
        type="number"
        min="0"
        max={maximo}
        step="1"
        required
        value={valor}
        onChange={e => onChange(e.target.value ==='' ? 0 : Number(e.target.value))}
      />
    </Form.Group>
  );
}

export default function Visitanos({setPaginaActual}) {

  const { agregarEntradas, agregarReservaGrupal } = useCarrito();
  const [modalidad, setModalidad] = useState(null);
  const [entradas, setEntradas] = useState(ENTRADAS_INICIALES);
  const [grupo, setGrupo] = useState(GRUPO_INICIAL);

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const abrirModal = tipo => { setError(''); setModalidad(tipo); };
  const cerrarModal = () => { setModalidad(null); setError(''); };

  const actualizarEntradas = (campo, valor) => {
    setEntradas(actual => ({
      ...actual,
      [campo]: valor,
      ...(campo === 'fecha'? { horario: '' } : {} )
    }));
    setError('');
  };

  const actualizarGrupo = (campo, valor) => {
    setGrupo(actual => ({
      ...actual,
      [campo]: valor,
      ...(campo === 'fecha'? { horario: '' } : {} )
    }));
    setError('');
  };

  const totalVisitantes = entradas.generales + entradas.preferenciales + entradas.infantiles;
  const totalIndividual = entradas.generales * TARIFAS_ENTRADAS.general + entradas.preferenciales * TARIFAS_ENTRADAS.preferencial;

  let resumenGrupo = null;

  try {
    resumenGrupo = calcularReservaGrupal(grupo.personas);
  } catch { }

  const comprarEntradas = evento => {
    evento.preventDefault();
    setError('');

    try {
      validarSesionVisita(entradas.fecha, entradas.horario);

      calcularEntradas(entradas);
      agregarEntradas(entradas);

      setEntradas(ENTRADAS_INICIALES);
      cerrarModal();

      setMensaje('Entradas agregadas al carrito correctamente.');
    } catch (exception) {
      setError(exception.message);
    }
  };

  const reservarGrupo = evento => {
    evento.preventDefault();
    setError('');

    try {
      validarSesionVisita(grupo.fecha, grupo.horario);

      calcularReservaGrupal(grupo.personas);
      agregarReservaGrupal(grupo);

      setGrupo(GRUPO_INICIAL);
      cerrarModal();
      setMensaje('Reserva Grupal agregada al carrito correctamente.');

    } catch (exception) {
      setError(exception.message);
    }
  };

  return (
    <section className="planea-visita py-3">
      {/* Título de la página */}
      <header className="text-center mb-4">
        <h1 className="display-5 fw-bold text-dark">Planea tu visita</h1>
        <p className="text-muted">
          Organiza tu experiencia artística en Galería MATIZ.
        </p>
      </header>

      {/* BANNER de Presentación */}
      <div className="mb-4">
        <img
          src="/assets/matiz-banner-visita.png"
          alt="Representación arquitectónica de Galería MATIZ"
          className="w-100 rounded shadow-sm"
          style={{
            height: 'clamp(180px, 28vw, 320px)',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </div>

      {mensaje && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setMensaje('')}
          role="status"
        >
          {mensaje}
        </Alert>
      )}

      {/* Sección 1: Horarios y Precios */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <h2 className="fs-3 text-primary mb-4">Horarios y Precios</h2>

        <Row className="gy-4">
          <Col md={6}>
            <h3 className="fs-5 fw-bold">Horarios de Apertura</h3>
            <p className = "mb-2">Martes a sábado: 10:00 AM - 7:00 PM</p>
            <p className = "mb-2">Domingos y Festivos: 11:00 AM - 5:00 PM</p>
            <p className = "mb-2">
              Lunes cerrados, excepto aperturas especiales por festivo. 
              El martes siguiente a dichas aperturas no habrá servicio.
            </p>
          </Col>

          <Col md={6}>
            <h3 className="fs-5 fw-bold">Tarifas individuales</h3>
            <p className="mb-2">Entrada General:{' '} 
              <strong> {formatoCOP(TARIFAS_ENTRADAS.general)}</strong>
            </p>
            <p className="mb-2">Estudiantes y Tercera Edad:{' '}
              <strong> {formatoCOP(TARIFAS_ENTRADAS.preferencial)}</strong>
            </p>
            <p className="mb-0">Menores de 12 años:{' '}
              <Badge bg="success">Gratis</Badge>
            </p>
          </Col>
        </Row>
        </Card.Body>
      </Card>
      
      {/* Sección 2: Visitas Individuales y Grupales */}
      <Row className="g-4 mb-2">
        <Col md={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="p-4 d-flex flex-column">
              <h2 className="h4 fw-bold">
                Visitas Individuales
              </h2>

              <p className="text-muted flex-grow-1">
                Compra tus entradas, selecciona el día y
                el bloque horario. Los menores de 12 años
                ingresan gratis, acompañados por al menos
                una persona con entrada general.
                Máximo cinco menores por compra individual.
              </p>

              <Button
                variant="primary"
                className="align-self-start rounded-pill px-4"
                onClick={() =>
                  abrirModal('individual')
                }
              >
                Comprar entradas
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="p-4 d-flex flex-column">
              <h2 className="h4 fw-bold">
                Visitas Grupales
              </h2>

              <p className="text-muted">
                Recorridos para colegios, universidades,
                empresas y otros grupos de 5 a 50 personas.
              </p>

              <p className="small mb-1">
                5 a 10 personas: $10.000 por persona
              </p>
              <p className="small mb-1">
                11 a 30 personas: $8.000 por persona
              </p>
              <p className="small mb-3 flex-grow-1">
                31 a 50 personas: $5.000 por persona
              </p>

              <Button
                variant="primary"
                className="align-self-start rounded-pill px-4"
                onClick={() =>
                  abrirModal('grupal')
                }
              >
                Reservar visita
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <p className="small text-muted text-center mb-4">
        Las visitas agregadas al carrito están sujetas
        a la validación definitiva de disponibilidad
        antes de confirmar la compra.
      </p>

      {/* Sección 3: Ubicación */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body className="p-4">
          <h2 className="fs-3 text-primary mb-3">
            Ubicación
          </h2>

          <Row className="g-4 align-items-center">
            <Col md={5}>
              <p>
                <strong>Dirección:</strong>
                <br />
                {DIRECCION}
              </p>

              <p>
                <strong>Parqueaderos cercanos:</strong>
                <br />
                Convenio con el parqueadero del edificio
                Central. Descuento del 20% al sellar
                el ticket en taquilla.
              </p>

              <Button
                as="a"
                href={URL_MAPS}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline-primary"
                className="rounded-pill"
              >
                Abrir en Google Maps
              </Button>
            </Col>

            <Col md={7}>
              <div
                className="rounded overflow-hidden border"
                style={{ height: 320 }}
              >
                <iframe
                  title="Ubicación de Galería MATIZ"
                  src={URL_MAPA}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Sección 4: Exposiciones y Cursos */}
      <Row className="g-4 mb-4">
        <Col md={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="p-4 d-flex flex-column">
              <h2 className="h4 fw-bold">
                Exposiciones Actuales
              </h2>

              <h3 className="h5">
                Matices Urbanos
              </h3>
              <img
                src="/assets/sala1.png"
                alt="Exposiciones Actuales"
                className="mb-3 img-fluid "
                style={{ maxHeight: 280 }}
              />
              <p className="text-muted flex-grow-1">
                Conoce nuestra programación artística,
                las obras y los artistas participantes.
              </p>
              <Button
                variant="outline-primary"
                className="align-self-start rounded-pill"
                onClick={() =>
                  setPaginaActual('exposiciones')
                }
              >
                Ver exposiciones
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 border-0 shadow-sm">
            <Card.Body className="p-4 d-flex flex-column">
              <h2 className="h4 fw-bold">
                Cursos y Talleres
              </h2>

              <h3 className="h5">
                Técnicas de acuarela
              </h3>
              <img
                src="/assets/cursos/mat-tal-002.png"
                alt="Técnicas de acuarela"
                className="mb-3 img-fluid"
                style={{ maxHeight: 280 }}
              />
              <p className="text-muted flex-grow-1">
                Descubre nuestras actividades de formación
                y experiencias creativas.
              </p>
              <Button
                variant="outline-primary"
                className="align-self-start rounded-pill"
                onClick={() =>
                  setPaginaActual('cursos')
                }
              >
                Explorar cursos
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* MODAL INDIVIDUAL */}
      <Modal
        show={modalidad === 'individual'}
        onHide={cerrarModal}
        centered
        size="lg"
      >
        <Form onSubmit={comprarEntradas}>
          <Modal.Header closeButton>
            <Modal.Title>
              Compra de entradas individuales
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {error && (
              <Alert variant="danger">
                {error}
              </Alert>
            )}

            <SelectorFechaHorario
              fecha={entradas.fecha}
              horario={entradas.horario}
              onFecha={valor =>
                actualizarEntradas('fecha', valor)
              }
              onHorario={valor =>
                actualizarEntradas('horario', valor)
              }
            />

            <Row className="g-3">
              <Col md={4}>
                <CampoCantidad
                  etiqueta="Entradas generales"
                  valor={entradas.generales}
                  maximo={AFORO_GALERIA}
                  onChange={valor =>
                    actualizarEntradas(
                      'generales',
                      valor
                    )
                  }
                />
              </Col>

              <Col md={4}>
                <CampoCantidad
                  etiqueta="Estudiantes y tercera edad"
                  valor={entradas.preferenciales}
                  maximo={AFORO_GALERIA}
                  onChange={valor =>
                    actualizarEntradas(
                      'preferenciales',
                      valor
                    )
                  }
                />
              </Col>

              <Col md={4}>
                <CampoCantidad
                  etiqueta="Menores de 12 años"
                  valor={entradas.infantiles}
                  maximo={5}
                  onChange={valor =>
                    actualizarEntradas(
                      'infantiles',
                      valor
                    )
                  }
                />
              </Col>
            </Row>

            <p className="small text-muted mt-3">
              Si incluyes menores, debes comprar al menos
              una entrada general.
            </p>

            <div className="bg-light rounded p-3 mt-3">
              <p className="mb-1">
                Total de visitantes:{' '}
                <strong>{totalVisitantes}</strong>
              </p>
              <h3 className="h5 fw-bold mb-0">
                Total: {formatoCOP(totalIndividual)}
              </h3>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={cerrarModal}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              type="submit"
            >
              Agregar al carrito
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

            {/* MODAL GRUPAL */}
      <Modal
        show={modalidad === 'grupal'}
        onHide={cerrarModal}
        centered
        size="lg"
      >
        <Form onSubmit={reservarGrupo}>
          <Modal.Header closeButton>
            <Modal.Title>
              Reserva de visita grupal
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {error && (
              <Alert variant="danger">
                {error}
              </Alert>
            )}

            <p className="text-muted">
              La tarifa grupal depende del número de
              asistentes y no acumula descuentos individuales.
            </p>

            <SelectorFechaHorario
              fecha={grupo.fecha}
              horario={grupo.horario}
              onFecha={valor =>
                actualizarGrupo('fecha', valor)
              }
              onHorario={valor =>
                actualizarGrupo('horario', valor)
              }
            />

            <Form.Group className="mb-3">
              <Form.Label>
                Número de participantes
              </Form.Label>
              <Form.Control
                type="number"
                min="5"
                max="50"
                step="1"
                required
                value={grupo.personas}
                onChange={evento =>
                  actualizarGrupo(
                    'personas',
                    evento.target.value === ''
                      ? 0
                      : Number(evento.target.value)
                  )
                }
              />
            </Form.Group>

            <div className="bg-light rounded p-3">
              {resumenGrupo ? (
                <>
                  <p className="mb-1">
                    Tarifa por persona:{' '}
                    <strong>
                      {formatoCOP(
                        resumenGrupo.precioUnitario
                      )}
                    </strong>
                  </p>
                  <h3 className="h5 fw-bold mb-0">
                    Total: {formatoCOP(
                      resumenGrupo.total
                    )}
                  </h3>
                </>
              ) : (
                <p className="text-danger mb-0">
                  Ingresa entre 5 y 50 participantes.
                </p>
              )}
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="outline-secondary"
              onClick={cerrarModal}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              type="submit"
            >
              Agregar al carrito
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

    </section>
  );
}