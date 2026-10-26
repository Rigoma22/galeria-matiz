// Pie de página del Sitio Web que sirve como cierre del sitio
// contiene información de acceso directo y contacto de la galería MATIZ

// Importaciones necesarias para el funcionamiento del pie de página
import React from 'react';
// Componentes de React Bootstrap para el pie de página
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function CustomFooter({setPaginaActual}) {
  // Obtener el año actual para mostrar en el pie de página
  const currentYear = new Date().getFullYear();

  return (
    //Regla W3C: usamos la etiqueta semantica <footer> con fondo oscuro para contraste
    <footer className="bg-dark text-light pt-5 pb-3 border-top border-secondary mt-auto">
      <Container>

        <Row className="gy-4">
          
          {/* Bloque con información de la Galería */}
          <Col lg={4} md={6}>
            <h5 className="text-primary fw-bold mb-1 fs-4">GALERÍA MATIZ</h5>
            <p className="small text-white fw-medium mb-2 italic">Descubre, aprende y disfruta con el arte.</p>
            <address className="small text-white-50 mb-0">
              <strong>Dirección:</strong>Av. Calle 26 # 70-40, Bogotá, Colombia<br />
              <strong>Teléfono:</strong>+57 (601) 234-5678<br />
              <strong>Horario:</strong>Mar-Sáb 10:00 AM - 7:00 PM<br />
              <span>Dom y Fest: 11:00 AM - 5:00 PM</span>
            </address>
          </Col>

          {/* Bloque con enlaces rápidos */}
          <Col lg={2} md={6}>
            <h5 className="fs-6 fw-bold text-uppercase mb-3">Conócenos</h5>
            <ul className="list-unstyled small">
              <li>
                <a href="#sobre-nosotros" 
                onClick={() => setPaginaActual('home')}
                className="text-secondary text-decoration-none hover-link"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#visitanos" 
                onClick={() => setPaginaActual('visitanos')}
                className="text-secondary text-decoration-none hover-link"
                >
                  Planifica tu Visita
                </a>
              </li>
              <li>
                <a href="#arteshop" 
                onClick={() => setPaginaActual('arteshop')}
                className="text-secondary text-decoration-none hover-link"
                >
                  Tienda de Arte
                </a>
              </li>
            </ul>
          </Col>

          {/* Bloque con enlaces de ayuda e información Legal */}
          <Col lg={2} md={6}>
            <h5 className="fs-6 fw-bold text-uppercase mb-3">Ayuda & Soporte</h5>
            <ul className="list-unstyled small">
              <li>
                <a href="#pqrs" 
                onClick={() => setPaginaActual('visitanos')}
                className="text-secondary text-decoration-none hover-link"
                >
                  Radicar PQRS
                </a>
              </li>
              <li>
                <a href="#cookies" 
                onClick={() => setPaginaActual('home')}
                className="text-secondary text-decoration-none hover-link"
                >
                  Política de Cookies
                </a>
              </li>
              <li>
                <a href="#terminos" 
                onClick={() => setPaginaActual('home')}
                className="text-secondary text-decoration-none hover-link"
                >
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </Col>

          {/* Bloque con Boletín y comunidad */}
          <Col lg={4} md={6}>
            <h5 className="fs-6 fw-bold text-uppercase mb-3">Únete a Nuestra Comunidad</h5>
            <p className="small text-secondary mb-3">Recibe artículos didácticos y alertas de nuevas exposiciones.</p>
            <form className="d-flex mb-3" onSubmit={(e) => e.preventDefault()}>
                <Form.Control 
                  type="email" 
                  placeholder="Tu correo electrónico..."
                  className="me-2 rounded-pill bg-secondary text-white border-0 px-3"
                  required
                />
              <button variant="primary" className="rounded-pill px-3" type="submit">
                Unirme
              </button>
            </form>
            {/* Enlaces a redes sociales */}
            <div className="d-flex justify-content-center justify-content-md-start gap-3 fs-5 mt-2">
              <a 
                href="https://wa.me" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px' }}
                aria-label="Escríbenos por WhatsApp"
              >
                <i className="bi bi-whatsapp text-white"></i>
              </a>

              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px' }}
                aria-label="Síguenos en Instagram"
              >
                <i className="bi bi-instagram text-white"></i>
              </a>

              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px' }}
                aria-label="Síguenos en Facebook"
              >
                <i className="bi bi-facebook text-white"></i>
              </a>
              
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px' }}
                aria-label="Síguenos en LinkedIn"
              >
                <i className="bi bi-linkedin text-white"></i>
              </a>
              
            </div>
          </Col>

        </Row>

          {/* LÍNEA DE CIERRE: COPYRIGHT Y FECHA DE ACTUALIZACIÓN */}
          <hr className="border-secondary my-2" />
          <Row className="small text-secondary align-items-center">
            <Col md={6} className="text-center text-md-start mb-2 md-md-0">
            &copy; {currentYear} <strong>Matiz Galería</strong>. Todos los derechos reservados.
            </Col>
            <Col md={6} className="text-center text-md-end text-muted">
            Versión Académica 1.1 | Última actualización: Octubre {currentYear}
            </Col>
          </Row>

      </Container>
    </footer>
  );
}

export default CustomFooter;