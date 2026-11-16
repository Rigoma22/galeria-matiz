import { useCallback, useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Form,
  Alert,
  Spinner,
  Badge,
  Modal
} from 'react-bootstrap';

import AdminProductoForm from '../components/AdminProductoForm';

import {
  consultarProductosAdmin,
  crearProductoAdmin,
  actualizarProductoAdmin,
  eliminarProductoAdmin,
  reactivarProductoAdmin
} from '../services/adminProductoService';

const formatearPrecio = valor =>
  Number(valor).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  });

export default function AdminProductos({ onSalir }) {
  const [productos, setProductos] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState('');
  const [textoBusqueda, setTextoBusqueda] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [pagina, setPagina] = useState(1);

  const [paginacion, setPaginacion] = useState({
    totalProductos: 0,
    totalPaginas: 0
  });

  const [cargando, setCargando] = useState(false);
  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [formularioAbierto, setFormularioAbierto] =
    useState(false);

  const [productoEditar, setProductoEditar] = useState(null);
  const [productoEliminar, setProductoEliminar] =
    useState(null);

  const cargarProductos = useCallback(async () => {
    setCargando(true);
    setError('');

    try {
      const datos = await consultarProductosAdmin({
        activo: estadoFiltro,
        buscar: busqueda,
        pagina,
        limite: 10
      });

      setProductos(datos.productos);
      setPaginacion({
        totalProductos: datos.totalProductos,
        totalPaginas: datos.paginacion.totalPaginas
      });

      // Si la última página quedó vacía tras eliminar
      // un producto, regresar a la página anterior.
      if (
        pagina > 1 &&
        pagina > datos.paginacion.totalPaginas
      ) {
        setPagina(Math.max(1, datos.paginacion.totalPaginas));
      }
    } catch (errorConsulta) {
      setError(errorConsulta.message);
      setProductos([]);
    } finally {
      setCargando(false);
    }
  }, [estadoFiltro, busqueda, pagina]);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  const mostrarExito = texto => {
    setError('');
    setMensaje(texto);
  };

  const abrirCreacion = () => {
    setProductoEditar(null);
    setFormularioAbierto(true);
  };

  const abrirEdicion = producto => {
    setProductoEditar(producto);
    setFormularioAbierto(true);
  };

  const guardarProducto = async datos => {
    let respuesta;

    if (productoEditar) {
      respuesta = await actualizarProductoAdmin(
        productoEditar._id,
        datos
      );
    } else {
      respuesta = await crearProductoAdmin(datos);
    }

    setFormularioAbierto(false);
    setProductoEditar(null);
    mostrarExito(respuesta.mensaje);
    await cargarProductos();
  };

  const eliminarProducto = async () => {
    if (!productoEliminar) return;

    setProcesando(true);
    setError('');

    try {
      const respuesta = await eliminarProductoAdmin(
        productoEliminar._id
      );

      setProductoEliminar(null);
      mostrarExito(respuesta.mensaje);
      await cargarProductos();
    } catch (errorEliminar) {
      setError(errorEliminar.message);
    } finally {
      setProcesando(false);
    }
  };

  const reactivarProducto = async producto => {
    setProcesando(true);
    setError('');

    try {
      const respuesta = await reactivarProductoAdmin(
        producto._id
      );

      mostrarExito(respuesta.mensaje);
      await cargarProductos();
    } catch (errorReactivar) {
      setError(errorReactivar.message);
    } finally {
      setProcesando(false);
    }
  };

  const buscarProductos = evento => {
    evento.preventDefault();
    setPagina(1);
    setBusqueda(textoBusqueda.trim());
  };

  return (
    <Container fluid className="py-4 px-3 px-md-5">
      <Row className="align-items-center g-3 mb-4">
        <Col>
          <h2>Administración de productos</h2>
          <p className="text-muted mb-0">
            Gestión del catálogo ArteShop MATIZ
          </p>
        </Col>

        <Col xs="auto">
          <div className="d-flex flex-wrap gap-2">
            <Button
              variant="success"
              onClick={abrirCreacion}
            >
              + Nuevo producto
            </Button>

            {onSalir && (
              <Button
                variant="outline-secondary"
                onClick={onSalir}
              >
                Salir
              </Button>
            )}
          </div>
        </Col>
      </Row>

      {mensaje && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setMensaje('')}
        >
          {mensaje}
        </Alert>
      )}

      {error && (
        <Alert
          variant="danger"
          dismissible
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}

      <Form onSubmit={buscarProductos}>
        <Row className="g-2 mb-4">
          <Col xs={12} md={5}>
            <Form.Control
              placeholder="Buscar por nombre, SKU, slug o categoría"
              value={textoBusqueda}
              onChange={evento =>
                setTextoBusqueda(evento.target.value)
              }
              aria-label="Buscar productos"
            />
          </Col>

          <Col xs={12} md={3}>
            <Form.Select
              value={estadoFiltro}
              onChange={evento => {
                setEstadoFiltro(evento.target.value);
                setPagina(1);
              }}
              aria-label="Filtrar por estado"
            >
              <option value="">Todos los estados</option>
              <option value="true">Activos</option>
              <option value="false">Inactivos</option>
            </Form.Select>
          </Col>

          <Col xs={12} md="auto">
            <Button type="submit" variant="primary">
              Buscar
            </Button>
          </Col>

          <Col xs={12} md="auto">
            <Button
              variant="outline-secondary"
              onClick={() => {
                setTextoBusqueda('');
                setBusqueda('');
                setEstadoFiltro('');
                setPagina(1);
              }}
            >
              Limpiar filtros
            </Button>
          </Col>
        </Row>
      </Form>

      <p className="text-muted">
        Productos encontrados: {paginacion.totalProductos}
      </p>

      {cargando ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
          <p className="mt-2">Cargando productos...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <Table striped hover bordered align="middle">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {productos.map(producto => (
                <tr key={producto._id}>
                  <td>{producto.sku}</td>
                  <td>{producto.nombre}</td>
                  <td>{formatearPrecio(producto.precio)}</td>
                  <td>{producto.stock}</td>

                  <td>
                    <Badge
                      bg={
                        producto.activo
                          ? 'success'
                          : 'secondary'
                      }
                    >
                      {producto.activo
                        ? 'Activo'
                        : 'Inactivo'}
                    </Badge>
                  </td>

                  <td>
                    <div className="d-flex flex-wrap gap-2">
                      {producto.activo ? (
                        <>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() =>
                              abrirEdicion(producto)
                            }
                          >
                            Editar
                          </Button>

                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() =>
                              setProductoEliminar(producto)
                            }
                          >
                            Eliminar
                          </Button>
                        </>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline-success"
                          disabled={procesando}
                          onClick={() =>
                            reactivarProducto(producto)
                          }
                        >
                          Reactivar
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {productos.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-4"
                  >
                    No se encontraron productos.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}

      <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
        <Button
          variant="outline-secondary"
          disabled={pagina <= 1 || cargando}
          onClick={() => setPagina(actual => actual - 1)}
        >
          Anterior
        </Button>

        <span>
          Página {pagina} de {Math.max(
            1,
            paginacion.totalPaginas
          )}
        </span>

        <Button
          variant="outline-secondary"
          disabled={
            pagina >= paginacion.totalPaginas ||
            cargando
          }
          onClick={() => setPagina(actual => actual + 1)}
        >
          Siguiente
        </Button>
      </div>

      {/* Formulario de creación y edición */}
      {formularioAbierto && (
        <AdminProductoForm
          key={productoEditar?._id ?? 'nuevo'}
          producto={productoEditar}
          onGuardar={guardarProducto}
          onCancelar={() => {
            setFormularioAbierto(false);
            setProductoEditar(null);
          }}
        />
      )}

      {/* Confirmación de eliminación lógica */}
      <Modal
        show={Boolean(productoEliminar)}
        onHide={() => {
          if (!procesando) setProductoEliminar(null);
        }}
        centered
      >
        <Modal.Header closeButton={!procesando}>
          <Modal.Title>
            Confirmar eliminación
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            ¿Deseas retirar del catálogo el producto
            <strong> {productoEliminar?.nombre}</strong>?
          </p>

          <Alert variant="warning">
            El producto quedará inactivo, pero no será
            eliminado físicamente de MongoDB.
          </Alert>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            disabled={procesando}
            onClick={() => setProductoEliminar(null)}
          >
            Cancelar
          </Button>

          <Button
            variant="danger"
            disabled={procesando}
            onClick={eliminarProducto}
          >
            {procesando ? 'Procesando...' : 'Eliminar producto'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
