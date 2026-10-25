// Barra de Navegación principal que sirve como encabezdo del Sitio web
// Contiene enlaces a las diferentes secciones y funcionalidades del sitio

// Importaciones necesarias para el funcionamiento de la barra de navegación
import React from 'react';
// Componentes de React Bootstrap para la barra de navegación
import { Navbar, Nav, Container, Form, Button, Badge, NavDropdown } from 'react-bootstrap';

function CustomNavbar({paginaActual, setPaginaActual}) {
    return (
        //Regla W3C: usamos la etiqueta semantica <header>
        <header className="sticky-top shadow-sm">
            <Navbar bg="white" expand="lg" className="border-bottom py-3">
                <Container>

                    {/*Marca y Logo del sitio */}
                    <Navbar.Brand
                    href="#home"
                    onClick={() => setPaginaActual('home')}
                    className="d-flex align-items-center"
                    aria-label="Regresar al Inicio"
                    >
                        <img 
                            src="/assets/logoMatiz.png" 
                            alt="Logo oficial Galeria MATIZ"
                            height="60"
                            className="d-inline-block me-2" 
                        />
                    </Navbar.Brand>

                    {/*Botón Responsive para dispositivos móviles - Hamburguesa */}
                    <Navbar.Toggle aria-controls="nav-galeria-matiz" aria-label="Abrir menú" />

                    {/*Contenedor Colapsable para el Menú y Submenús */}
                    <Navbar.Collapse id="nav-galeria-matiz">

                        {/*Enlaces de navegación*/}
                        <Nav className="mx-auto fw-medium">

                            {/*Enlace a la sección Visítanos */}
                            <NavDropdown 
                                title="📍 Visítanos" 
                                id="submenu-visitanos"
                                className="px-2"
                                active={paginaActual === 'visitanos'}
                            >
                                <NavDropdown.Item
                                    href="#planea-visita"
                                    onClick={() => setPaginaActual('visitanos')}
                                >
                                    📅 Planea tu visita
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    href="#exposiciones-actuales"
                                    onClick={() => setPaginaActual('exposiciones')}
                                >
                                    🖼️ Exposiciones actuales
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    href="#proximas-exposiciones"
                                    onClick={() => setPaginaActual('exposiciones')}
                                >
                                    ⏳ Próximas exposiciones
                                </NavDropdown.Item>
                            </NavDropdown>

                            {/*Enlace a la sección Aprende de Arte */}
                            <NavDropdown 
                                title="🎓 Aprende de Arte" 
                                id="submenu-aprende"
                                className="px-2"
                                active={paginaActual === 'cursos'}
                            >
                                <NavDropdown.Item
                                    href="#obras-artistas"
                                    onClick={() => setPaginaActual('exposiciones')}
                                >
                                    🧑‍🎨 Obras y Artistas
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    href="#cursos-experiencias"
                                    onClick={() => setPaginaActual('cursos')}
                                >
                                    📚 Cursos y experiencias
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    href="#novedades-arte"
                                    onClick={() => setPaginaActual('home')}
                                >
                                    📰 Novedades del Mundo del Arte
                                </NavDropdown.Item>
                            </NavDropdown>

                            {/*Enlace a la sección Conocenos */}
                            <NavDropdown 
                                title="✨ Conócenos" 
                                id="submenu-conocenos"
                                className="px-2"
                            >
                                <NavDropdown.Item
                                    href="#sobre-nosotros"
                                    onClick={() => setPaginaActual('home')}
                                >
                                    🏛️ Sobre Nosotros
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    href="#nuestras-salas"
                                    onClick={() => setPaginaActual('exposiciones')}
                                >
                                    🔑 Nuestras Salas
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    href="#contactanos"
                                    onClick={() => setPaginaActual('visitanos')}
                                >
                                    🤝 Eres importante para nosotros
                                </NavDropdown.Item>
                            </NavDropdown>

                            {/*Enlace a la sección Nuestra Tienda */}
                            <NavDropdown 
                                title="🛍️ Nuestra Tienda" 
                                id="submenu-tienda"
                                className="px-2"
                            >
                                <NavDropdown.Item
                                    href="#tienda-arte"
                                    onClick={() => setPaginaActual('arteshop')}
                                >
                                    🎨 Tienda de Arte
                                </NavDropdown.Item>
                            </NavDropdown>

                        </Nav>

                        {/*Sección Carrito de Compras y Buscador */}
                        <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center mt-3 mt-lg-0 gap-2">

                            {/*Carrito de Compras */}
                            <Button
                                variant="light"
                                className="position-relative rounded-pill me-lg-2 px-3 text-dark border border"
                                aria-label="Ver carrito"
                                onClick={() => setPaginaActual('arteshop')}
                            >
                                🛒 <span className="d-lg-none ms-1">Carrito</span>
                                <Badge
                                    bg="danger"
                                    className="position-absolute top-0 start-100 translate-middle rounded-circle fs-7"
                                >
                                    0
                                </Badge>
                            </Button>

                            {/*Buscador */}
                            <Form className="d-flex w-100" onSubmit={(e) => e.preventDefault()}>
                                <Form.Control
                                    type="search"
                                    placeholder="Buscar..."
                                    className="me-2 rounded-pill px-3"
                                    aria-label="Buscar"
                                />
                                <Button variant="outline-primary" className="rounded-pill px-3" type="submit">
                                    🔍
                                </Button>
                            </Form>

                        </div>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    );
}

export default CustomNavbar;