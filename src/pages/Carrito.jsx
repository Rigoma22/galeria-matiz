import { Button, Card, Alert } from 'react-bootstrap';
import { useCarrito } from '../context/CarritoContext';

const moneda = (valor) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(valor);

function Carrito() {

  const {
    items,
    cantidadCarrito,
    totalCarrito,
    eliminarItem,
    vaciarCarrito
  } = useCarrito();

  return (
    <section className="py-4">

      <h1 className="mb-4 fw-bold">
        Mi carrito de compras
      </h1>

      {items.length === 0 ? (

        <Alert variant="info">
          Tu carrito está vacío.
          Explora nuestra tienda, cursos y experiencias.
        </Alert>

      ) : (

        <>
          {items.map((item) => (

            <Card
              key={item.clave}
              className="mb-3 shadow-sm border-0"
            >
              <Card.Body
                className="d-flex justify-content-between
                           align-items-center gap-3"
              >

                <div>
                  <h5 className="mb-1">
                    {item.nombre}
                  </h5>

                  <p className="text-muted mb-1">
                    Tipo: {item.tipo}
                  </p>

                  <p className="mb-1">
                    Cantidad: {item.cantidad}
                  </p>

                  <strong>
                    {moneda(
                      item.subtotal
                    )}
                  </strong>
                </div>

                <Button
                  variant="outline-danger"
                  onClick={() =>
                    eliminarItem(item.clave)
                  }
                >
                  Eliminar
                </Button>

              </Card.Body>
            </Card>
          ))}

          <Card className="shadow-sm border-0 mt-4">
            <Card.Body>

              <h4>Resumen de compra</h4>

              <p>
                Unidades seleccionadas:
                {' '}{cantidadCarrito}
              </p>

              <h3 className="fw-bold">
                Total: {moneda(totalCarrito)}
              </h3>

              <Button
                variant="outline-danger"
                onClick={vaciarCarrito}
              >
                Vaciar carrito
              </Button>

            </Card.Body>
          </Card>

        </>
      )}

    </section>
  );
}

export default Carrito;
