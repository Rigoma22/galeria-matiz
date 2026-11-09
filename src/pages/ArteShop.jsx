
import { useEffect, useState } from 'react';
import {Row, Col, Card, Form, Button, Badge, Spinner, Alert, Pagination, Modal} from 'react-bootstrap';

import { obtenerProductos, obtenerProductoPorId } from '../services/productoService';

const LIMITE = 9;

const CATEGORIAS = [
  { valor: 'originales', nombre: 'Obras originales' },
  { valor: 'reproducciones', nombre: 'Reproducciones' },
  { valor: 'souvenirs', nombre: 'Souvenirs' },
  { valor: 'otros', nombre: 'Otros productos' }
];

const formatoCOP = (valor) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(valor);
};

const imagenProducto = (producto) => {
  return producto?.imagenes?.[0] || '';
};

function ArteShop() {

  // Productos y paginación
  const [productos, setProductos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalProductos, setTotalProductos] = useState(0);
  const [totalPaginas, setTotalPaginas] = useState(0);

  // Filtros editables
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState('');

  // Filtros aplicados
  const [filtros, setFiltros] = useState({
    buscar: '',
    categoria: ''
  });

  // Estados de interfaz
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  // Vista de detalles
  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const [productoDetalle, setProductoDetalle] = useState(null);
  const [cargandoDetalle, setCargandoDetalle] = useState(false);
  const [errorDetalle, setErrorDetalle] = useState('');

  // Consultar productos al cambiar página o filtros
  useEffect(() => {

    let vigente = true;

    const cargarCatalogo = async () => {
      setCargando(true);
      setError('');

      try {
        const datos = await obtenerProductos({
          pagina,
          limite: LIMITE,
          categoria: filtros.categoria,
          buscar: filtros.buscar
        });

        if (!vigente) return;

        setProductos(datos.productos);
        setTotalProductos(datos.totalProductos);
        setTotalPaginas(datos.paginacion.totalPaginas);

      } catch (err) {
        if (!vigente) return;

        setError(err.message);
        setProductos([]);

      } finally {
        if (vigente) {
          setCargando(false);
        }
      }
    };

    cargarCatalogo();

    return () => {
      vigente = false;
    };

  }, [pagina, filtros]);

  // Aplicar filtros
  const aplicarFiltros = (evento) => {
    evento.preventDefault();

    setPagina(1);

    setFiltros({
      buscar: textoBusqueda.trim(),
      categoria: categoriaSeleccionada
    });
  };

  // Limpiar filtros
  const limpiarFiltros = () => {
    setTextoBusqueda('');
    setCategoriaSeleccionada('');
    setPagina(1);

    setFiltros({
      buscar: '',
      categoria: ''
    });
  };

  // Abrir detalle desde la API
  const abrirDetalle = async (id) => {
    setMostrarDetalle(true);
    setCargandoDetalle(true);
    setProductoDetalle(null);
    setErrorDetalle('');

    try {
      const datos = await obtenerProductoPorId(id);
      setProductoDetalle(datos.producto);

    } catch (err) {
      setErrorDetalle(err.message);

    } finally {
      setCargandoDetalle(false);
    }
  };

  const cerrarDetalle = () => {
    setMostrarDetalle(false);
    setProductoDetalle(null);
  };

  const cambiarPagina = (numero) => {
    if (numero < 1 || numero > totalPaginas) return;

    setPagina(numero);
  };

  return (
    <section className="py-3">

      {/* Encabezado */}
      <div className="mb-4">
        <h1 className="fw-bold mb-2">Nuestra Tienda</h1>

        <p className="text-muted">
          Descubre obras originales, reproducciones y
          productos artísticos. En MATIZ creemos que
          el arte debe estar al alcance de todos.
        </p>
      </div>

      <Row className="g-4">

        {/* PANEL DE FILTROS */}
        <Col xs={12} lg={3}>
          <Card className="border-0 shadow-sm">
            <Card.Body>

              <h5 className="fw-semibold mb-4">
                Filtros de búsqueda
              </h5>

              <Form onSubmit={aplicarFiltros}>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">
                    Buscar producto
                  </Form.Label>

                  <Form.Control
                    type="search"
                    placeholder="Nombre de la obra..."
                    value={textoBusqueda}
                    onChange={(e) =>
                      setTextoBusqueda(e.target.value)
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">
                    Categoría
                  </Form.Label>

                  {CATEGORIAS.map((categoria) => (
                    <Form.Check
                      key={categoria.valor}
                      type="checkbox"
                      id={`categoria-${categoria.valor}`}
                      label={categoria.nombre}
                      checked={
                        categoriaSeleccionada === categoria.valor
                      }
                      onChange={(e) => {
                        setCategoriaSeleccionada(
                          e.target.checked
                            ? categoria.valor
                            : ''
                        );
                      }}
                      className="mb-2"
                    />
                  ))}
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button type="submit" variant="primary">
                    Aplicar filtros
                  </Button>

                  <Button
                    type="button"
                    variant="outline-secondary"
                    onClick={limpiarFiltros}
                  >
                    Limpiar filtros
                  </Button>
                </div>

              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* CATÁLOGO */}
        <Col xs={12} lg={9}>

          <div className="d-flex flex-wrap justify-content-between
                          align-items-center mb-3 gap-2">

            <div>
              <h2 className="h4 fw-semibold mb-1">
                Explora nuestra colección
              </h2>

              <small className="text-muted">
                {totalProductos} productos encontrados
              </small>
            </div>

            <Badge bg="light" text="dark"
                   className="border px-3 py-2">
              9 productos por página
            </Badge>

          </div>

          {error && (
            <Alert variant="danger">
              No fue posible cargar el catálogo: {error}
            </Alert>
          )}

          {cargando ? (

            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Cargando nuestra colección...</p>
            </div>

          ) : productos.length === 0 ? (

            !error && (
              <Alert variant="info">
                No encontramos productos con los filtros
                seleccionados.
              </Alert>
            )

          ) : (

            <Row className="g-3">

              {productos.map((producto) => (

                <Col
                  key={producto._id}
                  xs={12}
                  sm={6}
                  xl={4}
                >

                  <Card className="h-100 shadow-sm border-0">

                    <Card.Img
                      variant="top"
                      src={imagenProducto(producto)}
                      alt={producto.nombre}
                      style={{
                        height: '220px',
                        objectFit: 'cover'
                      }}
                    />

                    <Card.Body className="d-flex flex-column">

                      <div className="mb-2">
                        <Badge bg="primary">
                          {producto.categoria}
                        </Badge>
                      </div>

                      <Card.Title className="h6 fw-bold">
                        {producto.nombre}
                      </Card.Title>

                      <Card.Text
                        className="text-muted small flex-grow-1"
                      >
                        {producto.descripcion}
                      </Card.Text>

                      {producto.autor?.nombre && (
                        <small className="mb-2">
                          <strong>Autor: </strong>
                          {producto.autor.nombre}
                        </small>
                      )}

                      <p className="fw-bold fs-5 mb-2">
                        {formatoCOP(producto.precio)}
                      </p>

                      <div className="mb-3">
                        {producto.stock > 0 ? (
                          <Badge bg="success">
                            Disponible
                          </Badge>
                        ) : (
                          <Badge bg="secondary">
                            Agotado
                          </Badge>
                        )}
                      </div>

                      <Button
                        variant="outline-primary"
                        onClick={() =>
                          abrirDetalle(producto._id)
                        }
                      >
                        Ver detalles
                      </Button>

                    </Card.Body>
                  </Card>

                </Col>
              ))}

            </Row>
          )}

          {/* PAGINACIÓN */}
          {!cargando && !error && totalPaginas > 1 && (

            <div className="d-flex justify-content-center mt-4">

              <Pagination>

                <Pagination.Prev
                  disabled={pagina === 1}
                  onClick={() =>
                    cambiarPagina(pagina - 1)
                  }
                />

                {Array.from(
                  { length: totalPaginas },
                  (_, indice) => indice + 1
                ).map((numero) => (

                  <Pagination.Item
                    key={numero}
                    active={numero === pagina}
                    onClick={() =>
                      cambiarPagina(numero)
                    }
                  >
                    {numero}
                  </Pagination.Item>

                ))}

                <Pagination.Next
                  disabled={pagina === totalPaginas}
                  onClick={() =>
                    cambiarPagina(pagina + 1)
                  }
                />

              </Pagination>

            </div>
          )}

        </Col>
      </Row>

      {/* MODAL DE DETALLES */}
      <Modal
        show={mostrarDetalle}
        onHide={cerrarDetalle}
        centered
        size="lg"
      >

        <Modal.Header closeButton>
          <Modal.Title>
            Detalles de la obra
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>

          {cargandoDetalle && (
            <div className="text-center py-4">
              <Spinner animation="border" />
            </div>
          )}

          {errorDetalle && (
            <Alert variant="danger">
              {errorDetalle}
            </Alert>
          )}

          {productoDetalle && (

            <Row className="g-3">

              <Col md={5}>
                <img
                  src={imagenProducto(productoDetalle)}
                  alt={productoDetalle.nombre}
                  className="img-fluid rounded"
                />
              </Col>

              <Col md={7}>

                <h4>{productoDetalle.nombre}</h4>

                <p>{productoDetalle.descripcion}</p>

                <p>
                  <strong>Autor: </strong>
                  {productoDetalle.autor?.nombre ||
                    'No especificado'}
                </p>

                <p>
                  <strong>Técnica: </strong>
                  {productoDetalle.tecnica}
                </p>

                <p>
                  <strong>Materiales: </strong>
                  {productoDetalle.materiales?.join(', ') ||
                    'No especificados'}
                </p>

                <p>
                  <strong>Dimensiones: </strong>
                  {productoDetalle.dimensiones?.ancho ?? '—'}
                  {' × '}
                  {productoDetalle.dimensiones?.alto ?? '—'}
                  {' '}
                  {productoDetalle.dimensiones?.unidad || ''}
                </p>

                <p>
                  <strong>Existencias: </strong>
                  {productoDetalle.stock}
                </p>

                <h4 className="text-primary">
                  {formatoCOP(productoDetalle.precio)}
                </h4>

              </Col>

            </Row>
          )}

        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={cerrarDetalle}
          >
            Cerrar
          </Button>
        </Modal.Footer>

      </Modal>

    </section>
  );
}

export default ArteShop;