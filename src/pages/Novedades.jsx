import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { obtenerNovedades } from "../services/novedadService";
import { useState, useEffect } from "react";

function Novedad({
  id,
  titulo,
  fecha,
  categoria,
  descripcion,
  imagen,
  fuente,
}) {
  return (
    <Container className="my-3">
      <Card className="shadow-sm">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={8}>
              <Card.Body>
                <Card.Title>{titulo}</Card.Title>
                <div className="mb-2">
                  <span className="badge bg-primary me-2">{categoria}</span>
                  <p className="text-muted">{fecha}</p>
                </div>
                <Card.Text>{descripcion}</Card.Text>
                {fuente && (
                  <Button
                    className="btn btn-outline-primary flex-fill box-shadow text-white"
                    href={fuente}
                    target="_blank"
                  >
                    <strong>Leer más</strong>
                  </Button>
                )}
              </Card.Body>
            </Col>
            <Col md={4}>
              <Card.Img src={imagen} alt={titulo} className="img-fluid" />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default function Novedades() {
  const [novedades, setNovedades] = useState([]);

  useEffect(() => {
    const cargarNovedades = async () => {
      const novedades = await obtenerNovedades();
      novedades.sort((b, a) => {
        return new Date(b.fecha) - new Date(a.fecha);
      });
      setNovedades(novedades);
      console.log(novedades);
    };
    cargarNovedades();
  }, []);

  return (
    <div className="d-flex justify-content-center flex-column">
      <h3 className="align-self-center">Noticias</h3>
      {novedades.map((novedad) => {
        const { id, titulo, fecha, categoria, descripcion, imagen, fuente } =
          novedad;

        return (
          <Novedad
            key={id}
            id={id}
            titulo={titulo}
            fecha={fecha}
            categoria={categoria}
            descripcion={descripcion}
            imagen={imagen}
            fuente={fuente}
          />
        );
      })}
    </div>
  );
}
