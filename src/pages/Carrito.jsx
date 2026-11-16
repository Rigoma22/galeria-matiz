import { Button, Card, Alert } from 'react-bootstrap';
import { useCarrito } from '../context/CarritoContext';

const moneda = (valor) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(valor);

function Carrito({ setPaginaActual }) {

  const {
    items,
    cantidadCarrito,
    totalCarrito,
    eliminarItem,
    vaciarCarrito
  } = useCarrito();

  // PagoFacil procesa inicialmente productos de ArteShop.
  const contieneOtrosServicios = items.some(
    (item) => item.tipo !== 'producto'
  );

  const continuarPago = () => {
    if (items.length === 0 || contieneOtrosServicios) {
      return;
    }

    setPaginaActual('pagofacil');
  };

  return (
    <section className="container py-4 py-md-5">

      <div
        className="mx-auto"
        style={{ maxWidth: '900px' }}
      >

        {/* Encabezado */}
        <div className="mb-4">
          <h1 className="fw-bold mb-2">
            Mi carrito de compras
          </h1>

          <p className="text-muted mb-0">
            Revisa los artículos seleccionados antes de finalizar tu compra.
          </p>
        </div>

        {items.length === 0 ? (

          <Alert
            variant="info"
            className="rounded-3 shadow-sm"
          >
            Tu carrito está vacío.
            Explora nuestra tienda, cursos y experiencias.
          </Alert>

        ) : (

          <div className="row g-4">

            {/* Artículos del carrito */}
            <div className="col-12 col-lg-7">

              <h5 className="fw-semibold mb-3">
                Artículos seleccionados
                <span className="text-muted ms-2">
                  ({cantidadCarrito})
                </span>
              </h5>

              {items.map((item) => (

                <Card
                  key={item.clave}
                  className="mb-3 border-0 shadow-sm rounded-3"
                >
                  <Card.Body className="p-3">

                    <div className="d-flex flex-column gap-3">

                      <div>
                        <h6 className="fw-bold mb-2">
                          {item.nombre}
                        </h6>

                        <span className="badge bg-primary mb-2">
                          {item.tipo}
                        </span>

                        <p className="text-muted small mb-1">
                          Cantidad: {item.cantidad}
                        </p>

                        <strong className="fs-5">
                          {moneda(item.subtotal)}
                        </strong>
                      </div>

                      <div className="d-flex justify-content-end">

                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() =>
                            eliminarItem(item.clave)
                          }
                        >
                          Eliminar
                        </Button>

                      </div>

                    </div>

                  </Card.Body>
                </Card>

              ))}

            </div>

            {/* Resumen de compra */}
            <div className="col-12 col-lg-5">

              <Card className="border-0 shadow-sm rounded-3">

                <Card.Body className="p-4">

                  <h5 className="fw-bold mb-4">
                    Resumen de compra
                  </h5>

                  <div className="d-flex justify-content-between mb-3">
                    <span className="text-muted">
                      Unidades
                    </span>

                    <strong>
                      {cantidadCarrito}
                    </strong>
                  </div>

                  <hr />

                  <div className="d-flex justify-content-between align-items-center mb-4 gap-2">

                    <span className="fw-semibold">
                      Total
                    </span>

                    <h4 className="fw-bold mb-0">
                      {moneda(totalCarrito)}
                    </h4>

                  </div>

                  {contieneOtrosServicios && (

                    <Alert
                      variant="warning"
                      className="small"
                    >
                      PagoFacil procesa actualmente
                      productos de ArteShop.

                      Para continuar, retira los cursos,
                      entradas o reservas grupales.
                    </Alert>

                  )}

                  <div className="d-grid gap-2">

                    <Button
                      variant="primary"
                      onClick={continuarPago}
                      disabled={contieneOtrosServicios}
                    >
                      Continuar a PagoFacil
                    </Button>

                    <Button
                      variant="outline-primary"
                      onClick={vaciarCarrito}
                    >
                      Vaciar carrito
                    </Button>

                  </div>

                </Card.Body>

              </Card>

            </div>

          </div>

        )}

      </div>

    </section>
  );

}

export default Carrito;