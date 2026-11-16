
import { useState } from 'react';
import {
  Modal,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Spinner
} from 'react-bootstrap';

const convertirLineas = valor =>
  Array.isArray(valor) ? valor.join('\n') : '';

const convertirArreglo = texto =>
  texto.split('\n')
    .map(valor => valor.trim())
    .filter(Boolean);

const obtenerValoresIniciales = producto => ({
  sku: producto?.sku ?? '',
  nombre: producto?.nombre ?? '',
  slug: producto?.slug ?? '',
  categoria: producto?.categoria ?? '',
  subcategoria: producto?.subcategoria ?? '',
  tecnica: producto?.tecnica ?? '',
  autor: producto?.autor?.nombre ?? '',
  descripcion: producto?.descripcion ?? '',
  palabrasClave: convertirLineas(producto?.palabrasClave),
  precio: String(producto?.precio ?? ''),
  moneda: producto?.moneda ?? 'COP',
  dimensiones: producto?.dimensiones
    ? JSON.stringify(producto.dimensiones, null, 2)
    : '{}',
  materiales: convertirLineas(producto?.materiales),
  imagenes: convertirLineas(producto?.imagenes),
  stock: String(producto?.stock ?? ''),
  destacado: producto?.destacado ?? false,
  obraUnica: producto?.obraUnica ?? false,
  certificadoAutenticidad:
    producto?.certificadoAutenticidad ?? false
});

export default function AdminProductoForm({
  producto,
  onGuardar,
  onCancelar
}) {
  const editando = Boolean(producto?._id);

  const [formulario, setFormulario] = useState(
    () => obtenerValoresIniciales(producto)
  );

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  const cambiar = evento => {
    const { name, value, type, checked } = evento.target;

    setFormulario(actual => ({
      ...actual,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const guardar = async evento => {
    evento.preventDefault();
    setError('');

    const precio = Number(formulario.precio);
    const stock = Number(formulario.stock);

    if (
      formulario.precio.trim() === '' ||
      !Number.isFinite(precio) ||
      precio < 0
    ) {
      setError('El precio debe ser mayor o igual a cero.');
      return;
    }

    if (
      formulario.stock.trim() === '' ||
      !Number.isSafeInteger(stock) ||
      stock < 0
    ) {
      setError('El stock debe ser un entero no negativo.');
      return;
    }

    let dimensiones;

    try {
      dimensiones = JSON.parse(formulario.dimensiones);

      if (
        !dimensiones ||
        typeof dimensiones !== 'object' ||
        Array.isArray(dimensiones)
      ) {
        throw new Error('Formato inválido');
      }
    } catch {
      setError(
        'Las dimensiones deben ser un objeto JSON válido. Ejemplo: {"alto": 40, "ancho": 30}'
      );
      return;
    }

    const datos = {
      sku: formulario.sku.trim(),
      nombre: formulario.nombre.trim(),
      slug: formulario.slug.trim(),
      categoria: formulario.categoria.trim(),
      subcategoria: formulario.subcategoria.trim(),
      tecnica: formulario.tecnica.trim(),
      autor: formulario.autor.trim()
        ? { nombre: formulario.autor.trim() }
        : null,
      descripcion: formulario.descripcion.trim(),
      palabrasClave: convertirArreglo(formulario.palabrasClave),
      precio,
      moneda: formulario.moneda,
      dimensiones,
      materiales: convertirArreglo(formulario.materiales),
      imagenes: convertirArreglo(formulario.imagenes),
      stock,
      destacado: formulario.destacado,
      obraUnica: formulario.obraUnica,
      certificadoAutenticidad:
        formulario.certificadoAutenticidad
    };

    try {
      setGuardando(true);
      await onGuardar(datos);
    } catch (errorGuardar) {
      setError(errorGuardar.message);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <Modal
      show
      onHide={guardando ? undefined : onCancelar}
      size="lg"
      centered
      scrollable
      dialogClassName='modal-producto-admin'
    >
      <Modal.Header closeButton={!guardando}>
        <Modal.Title>
          {editando ? 'Editar producto' : 'Nuevo producto'}
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={guardar}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Row className="g-3">
            {[
              ['sku', 'SKU'],
              ['nombre', 'Nombre'],
              ['slug', 'Slug'],
              ['categoria', 'Categoría'],
              ['subcategoria', 'Subcategoría'],
              ['tecnica', 'Técnica'],
              ['autor', 'Nombre del autor']
            ].map(([campo, etiqueta]) => (
              <Col md={campo === 'nombre' ? 12 : 6} key={campo}>
                <Form.Group>
                  <Form.Label>{etiqueta}</Form.Label>
                  <Form.Control
                    name={campo}
                    value={formulario[campo]}
                    onChange={cambiar}
                    required={[
                      'sku',
                      'nombre',
                      'slug',
                      'categoria'
                    ].includes(campo)}
                  />
                </Form.Group>
              </Col>
            ))}

            <Col xs={12}>
              <Form.Group>
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  value={formulario.descripcion}
                  onChange={cambiar}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Precio (COP)</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  step="any"
                  name="precio"
                  value={formulario.precio}
                  onChange={cambiar}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  step="1"
                  name="stock"
                  value={formulario.stock}
                  onChange={cambiar}
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Moneda</Form.Label>
                <Form.Select
                  name="moneda"
                  value={formulario.moneda}
                  onChange={cambiar}
                >
                  <option value="COP">COP</option>
                </Form.Select>
              </Form.Group>
            </Col>

            {[
              ['palabrasClave', 'Palabras clave'],
              ['materiales', 'Materiales'],
              ['imagenes', 'Rutas de imágenes']
            ].map(([campo, etiqueta]) => (
              <Col md={6} key={campo}>
                <Form.Group>
                  <Form.Label>{etiqueta}</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name={campo}
                    value={formulario[campo]}
                    onChange={cambiar}
                    placeholder="Un elemento por línea"
                  />
                </Form.Group>
              </Col>
            ))}

            <Col xs={12}>
              <Form.Group>
                <Form.Label>Dimensiones (JSON)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="dimensiones"
                  value={formulario.dimensiones}
                  onChange={cambiar}
                  spellCheck={false}
                />
                <Form.Text muted>
                  Conserva las propiedades utilizadas en
                  la colección de productos.
                </Form.Text>
              </Form.Group>
            </Col>

            <Col xs={12}>
              {[
                ['destacado', 'Producto destacado'],
                ['obraUnica', 'Obra única'],
                [
                  'certificadoAutenticidad',
                  'Incluye certificado de autenticidad'
                ]
              ].map(([campo, etiqueta]) => (
                <Form.Check
                  key={campo}
                  type="checkbox"
                  className="mb-2"
                  name={campo}
                  label={etiqueta}
                  checked={formulario[campo]}
                  onChange={cambiar}
                />
              ))}
            </Col>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={onCancelar}
            disabled={guardando}
          >
            Cancelar
          </Button>

          <Button
            variant="success"
            type="submit"
            disabled={guardando}
          >
            {guardando && (
              <Spinner size="sm" className="me-2" />
            )}
            {editando ? 'Guardar cambios' : 'Crear producto'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
