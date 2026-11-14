import {
  obtenerArtistaPorId,
  obtenerArtistas,
} from "../services/artistaService";
import { useState, useEffect } from "react";
import {
  Tab,
  Card,
  Row,
  Col,
  Nav,
  ListGroup,
  Button,
  Modal,
  Container,
} from "react-bootstrap";

function Artista({
  id,
  nombre,
  imagen,
  imagenArtista,
  descripcionImagen,
  especialidad,
  verObras,
}) {
  return (
    <Card className="w-100 shadow-sm" border="primary">
      <Card.Body>
        <Card.Title>
          <strong>{nombre}</strong>
        </Card.Title>
      </Card.Body>
      <Card.Img variant="top" src={imagenArtista} />
      <ListGroup className="list-group-flush">
        <ListGroup.Item>
          <strong>Especialidad: </strong>
          {especialidad}
        </ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Button variant="primary" onClick={() => verObras(id)}>
          Obras
        </Button>
      </Card.Body>
    </Card>
  );
}
function ObrasArtista({ obrasArtista, show, onHide }) {
  if (!obrasArtista) {
    return null;
  }
  return (
    <Modal show={show} onHide={onHide} dialogClassName="modal-90w" size="lg">
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Card className="mb-4">
          <Card.Img
            variant="top"
            src={obrasArtista.imagen}
            className="img-fluid mx-auto d-block"
            style={{
              aspectRatio: "15 / 6",
              objectFit: "cover",
              margin: "0 auto",
            }}
          />
          <Card.Body>
            <Card.Text>{obrasArtista.presentacion}</Card.Text>
          </Card.Body>
        </Card>
        <div>
          <Row className="justify-content-center g-3">
            {obrasArtista.obras.map((obra) => {
              const { nombre, imagenObra } = obra;
              return (
                <Col
                  key={obra.nombre}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="d-flex justify-content-center"
                >
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src={imagenObra}
                      className="w-100"
                      style={{
                        height: "15rem",
                        objectFit: "cover",
                      }}
                    />
                    <Card.Body>
                      <Card.Title>{nombre}</Card.Title>
                      <Card.Text></Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default function Artistas() {
  const [artistas, setArtistas] = useState([]);
  const [especialidadActiva, setEspecialidad] = useState("Todas");
  const [detalleObrasArtista, setDetalleObrasArtista] = useState(null);
  const [mostrarObras, setMostrarObras] = useState(false);

  useEffect(() => {
    const cargarArtistas = async () => {
      const artistas = await obtenerArtistas();
      setArtistas(artistas);
      console.log(artistas);
    };
    cargarArtistas();
  }, []);

  const normalizar = (texto) =>
    texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const especialidades = [
    "Pintura",
    "Escultura",
    "Fotografía",
    "Dibujo",
    "Otras técnicas",
    "Todas",
  ];

  const verObras = async (id) => {
    const artista = await obtenerArtistaPorId(id);
    setDetalleObrasArtista(artista);
    setMostrarObras(true);
  };
  return (
    <Container className="py-4 d-flex justify-content-center">
      <Tab.Container id="left-tabs-example" defaultActiveKey="todas">
        <Row>
          <Col sm={3} className="">
            <h2 className="border-bottom">Especialidades</h2>
            <Nav variant="pills" className="flex-column">
              {especialidades.map((especialidad) => {
                return (
                  <Nav.Item key={especialidad}>
                    <Nav.Link
                      eventKey={normalizar(especialidad)}
                      onClick={() => setEspecialidad(especialidad)}
                    >
                      <strong>{especialidad}</strong>
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content className="d-flex justify-content-center flex-column">
              <h2 className="text-center bg-primary text-white rounded">
                Nuestros artistas
              </h2>
              {especialidades.map((especialidad) => {
                return (
                  <Tab.Pane
                    eventKey={normalizar(especialidad)}
                    key={especialidad}
                  >
                    <Row className="g-3 justify-content-center">
                      {artistas
                        .filter((artista) => {
                          if (normalizar(especialidad) === "otras tecnicas") {
                            const principales = especialidades.filter(
                              (espe) =>
                                !["otras tecnicas", "todas"].includes(
                                  normalizar(espe),
                                ),
                            );
                            return !principales.some((e) =>
                              normalizar(artista.especialidad).includes(
                                normalizar(e),
                              ),
                            );
                          }
                          if (normalizar(especialidad) === "todas") {
                            return true;
                          }
                          return normalizar(artista.especialidad).includes(
                            normalizar(especialidad),
                          );
                        })
                        .map((artista) => {
                          const {
                            id,
                            nombre,
                            imagen,
                            imagenArtista,
                            especialidad,
                          } = artista;
                          return (
                            <Col
                              key={id}
                              xs={12}
                              sm={5}
                              md={6}
                              lg={4}
                              xl={3}
                              className="d-flex justify-content-center"
                            >
                              <Artista
                                key={id}
                                id={id}
                                nombre={nombre}
                                imagen={imagen}
                                imagenArtista={imagenArtista}
                                especialidad={especialidad}
                                verObras={verObras}
                              />
                            </Col>
                          );
                        })}
                    </Row>
                  </Tab.Pane>
                );
              })}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
      <ObrasArtista
        show={mostrarObras}
        obrasArtista={detalleObrasArtista}
        onHide={() => setMostrarObras(false)}
      />
    </Container>
  );
}
