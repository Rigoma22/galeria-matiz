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
    <footer className="bg-dark text-light pt-4 pb-3 mt-auto">
      <Container>

        {/* Encabezado General de la Galería */}
        <Row className="mb-3">
          <Col>
            <h2 className="text-primary fw-bold fs-3 mb-0">GALERÍA MATIZ</h2>
            <p className="fs-6 fw-medium text-white mb-2 fst-italic">Descubre, aprende y disfruta con el arte.</p>
          </Col>
        </Row>

        <Row className="gy-4">
          
          {/* Bloque con información de la Galería */}
          <Col lg={3} md={6}>
            <h3 className="fs-6 fw-bold text-uppercase mb-2">Información</h3>
            
            <address className="small text-white-50 mb-0">
              <p className="mb-0">
                <strong>Dirección:</strong> Av. Calle 26 # 70-40,
              </p>
              <p className="mb-0">
                Bogotá, Colombia
              </p>
              <p className="mb-0">
                <strong>Teléfono:</strong> +57 (601) 234-5678
              </p>
              <p className="mb-0">
                <strong>Horario:</strong> Mar-Sáb 10am - 7pm
              </p>
              <p className="mb-0">
                Dom y Fest: 11am - 5pm
              </p>
              
            </address>
          </Col>

          {/* Bloque con enlaces rápidos */}
          <Col lg={2} md={6}>
            <h3 className="fs-6 fw-bold text-uppercase mb-2">Conócenos</h3>
            <ul className="list-unstyled small">
              <li>
                <a href="#sobre-nosotros" 
                onClick={() => setPaginaActual('home')}
                className="text-white-50 text-decoration-none hover-link"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a href="#visitanos" 
                onClick={() => setPaginaActual('visitanos')}
                className="text-white-50 text-decoration-none hover-link"
                >
                  Planifica tu Visita
                </a>
              </li>
              <li>
                <a href="#arteshop" 
                onClick={() => setPaginaActual('arteshop')}
                className="text-white-50 text-decoration-none hover-link"
                >
                  Tienda de Arte
                </a>
              </li>
            </ul>
          </Col>

          {/* Bloque con enlaces de ayuda e información Legal */}
          <Col lg={3} md={6}>
            <h3 className="fs-6 fw-bold text-uppercase mb-2">Ayuda y Soporte</h3>
            <ul className="list-unstyled small">
              <li>
                <a href="#pqrs" 
                onClick={() => setPaginaActual('visitanos')}
                className="text-white-50 text-decoration-none hover-link"
                >
                  Radicar PQRS
                </a>
              </li>
              <li>
                <a href="#cookies" 
                onClick={() => setPaginaActual('home')}
                className="text-white-50 text-decoration-none hover-link"
                >
                  Política de Cookies
                </a>
              </li>
              <li>
                <a href="#terminos" 
                onClick={() => setPaginaActual('home')}
                className="text-white-50 text-decoration-none hover-link"
                >
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </Col>

          {/* Bloque con Boletín y comunidad */}
          <Col lg={4} md={6}>
            <h3 className="fs-6 fw-bold text-uppercase mb-2">Nuestra Comunidad</h3>
            <p className="small text-white-50 mb-3">Recibe artículos didácticos y alertas de nuevas exposiciones.</p>
            <form className="d-flex mb-3" onSubmit={(e) => e.preventDefault()}>
                <Form.Label htmlFor="correo-boletin" visuallyHidden>
                  Correo electrónico para suscripción
                </Form.Label>
                <Form.Control 
                  id="correo-boletin"
                  type="email" 
                  placeholder="Tu correo electrónico..."
                  className="me-1 bg-gray text-dark border-0 px-3"
                  required
                />
              <button variant="primary" size="sm" type="submit" className="rounded-pill px-3 fw-medium btn-unirme">
                Unirme
              </button>
            </form>
            
          </Col>

        </Row>

        <hr className="border-secondary my-2" />
        
        {/* LÍNEA DE CIERRE: COPYRIGHT Y FECHA DE ACTUALIZACIÓN */}
        <Row className="align-items-center gy-3">
          <Col lg={8} md={7} className="text-center text-md-start">
          <p className="small text-white-50 mb-0">
            &copy; {currentYear}{' '}<strong>Matiz Galería</strong>. Todos los derechos reservados.
          </p>
          </Col>

          {/* Enlaces a redes sociales */}
          <Col lg={4} md={5}>
            <nav 
              aria-label="Redes sociales Galería Matiz"
              className="d-flex justify-content-center justify-content-md-end gap-3"
            >
              <a 
                href="https://wa.me" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline-light btn-sm rounded-circle footer-social-icon"
                aria-label="Escríbenos por WhatsApp"
              >
                <i className="bi bi-whatsapp" aria-hidden="true"></i>
              </a>

              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline-light btn-sm rounded-circle footer-social-icon"
                aria-label="Síguenos en Instagram"
              >
                <i className="bi bi-instagram" aria-hidden="true"></i>
              </a>

              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline-light btn-sm rounded-circle footer-social-icon"
                aria-label="Síguenos en Facebook"
              >
                <i className="bi bi-facebook" aria-hidden="true"></i>
              </a>
              
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline-light btn-sm rounded-circle footer-social-icon"
                aria-label="Síguenos en TikTok"
              >
                <i className="bi bi-tiktok" aria-hidden="true"></i>
              </a>
            </nav>
          </Col>
        </Row>

      </Container>
    </footer>
  );
}

export default CustomFooter;