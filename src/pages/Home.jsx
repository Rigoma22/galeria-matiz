// Página Principal del Sitio Home
// En esta se tendrá contenido destacado y secciones principales del sitio.

//importaciones necesarias para la página Home
import React from 'react';
//Componentes de Bootstrap necesarios para la página Home
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

function Home() {
  return (
    <>
      {/* Sección HERO Banner con video de la página Home */}
      <section id="hero-banner" className="position-relative overflow-hidden w-100 bg-dark text-white mb-5 rounded shadow-sm" style={{ height: '60vh' }}>
        
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="position-absolute top-50 start-50 translate-middle w-100 h-100"
          style={{ objectFit: 'cover', opacity: '0.8', zIndex: 0 }}
        >
          <source src="/assets/videoHome.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="position-relative d-flex flex-column align-items-center justify-content-center text-center h-100 px-3" style={{ zIndex: 1 }}>
          <h1 className="display-4 fw-bold mb-3">Descubre, Aprende <br />y Disfruta con el Arte.</h1>
          <p className="lead mb-4 fw-medium text-light">Un espacio amigable y cercano para explorar, aprender y conectar con la cultura.</p>
          <div className="d-flex gap-3 flex-wrap justify-content-center">
            <Button variant="outline-light" size="lg" className="rounded-pill px-4 fw-semibold shadow-sm">
              Planea tu Visita
            </Button>
            <Button variant="outline-light" size="lg" className="rounded-pill px-4 fw-semibold">
              Explorar Cursos
            </Button>
          </div>
        </div>

      </section>

      {/* Sección Operativa: Accesos Directos a información clave */}
      <section id="accesos-rapidos" className="py-4" aria-label="Información logística inmediata">
        <Container>
          <Row className="gy-4">
            
            {/* Acceso rápido 1 - Horarios y Tarifas */}
            <Col lg={4}>
              <Card className="h-100 border-0 shadow-sm bg-white p-3 text-center transition-card">
                <Card.Body>
                  <div className="fs-1 mb-2 text-primary">📅</div>
                  <Card.Title className="fw-bold text-dark fs-5">Horarios y Tarifas</Card.Title>
                  <Card.Text className="text-muted small lh-lg mt-2">
                    Martes a Sábado: <br />
                    10:00 AM - 7:00 PM <br />
                    Domingos y Festivos: <br />
                    11:00 AM - 5:00 PM <br />
                    
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Acceso rápido 2 - Ubicación y Transporte */}
            <Col lg={4}>
              <Card className="h-100 border-0 shadow-sm bg-white p-3 text-center transition-card">
                <Card.Body>
                  <div className="fs-1 mb-2 text-primary">📍</div>
                  <Card.Title className="fw-bold text-dark fs-5">Ubicación y Llegada</Card.Title>
                  <Card.Text className="text-muted small lh-lg mt-2">
                    Av. Calle 26 # 70-40 <br />
                    Bogotá, Colombia <br />
                    Cerca a la estación de Transmilenio AV Rojas <br />
                    <span className="text-secondary d-block mt-2">🚗 Convenio de Parqueadero con edificio Central.</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            {/* Acceso rápido 3 - Exposiciones Vigente */}
            <Col lg={4}>
              <Card className="h-100 border-0 shadow-sm bg-white p-3 text-center transition-card">
                <Card.Body>
                  <div className="fs-1 mb-2 text-primary">🖼️</div>
                  <Card.Title className="fw-bold text-dark fs-5">Exposición Recomendada</Card.Title>
                  <Card.Text className="text-muted small lh-lg mt-2">
                    <strong>"Matices Urbanos"</strong> <br />
                    Una muestra contemporánea de 15 artistas locales enfocada en la vida cotidiana de Bogotá. <br />
                    <span className="text-primary d-block mt-2 fw-medium">Sala Principal • Abierta hoy</span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          
          </Row>
        </Container>
        
      </section>

    </>
  );
}

export default Home;