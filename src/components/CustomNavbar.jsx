// Barra de Navegación principal que sirve como encabezado del Sitio web
// Contiene enlaces a las diferentes secciones y funcionalidades del sitio

// Importaciones necesarias para el funcionamiento de la barra de navegación
import React from 'react';
// Componentes de React Bootstrap para la barra de navegación
import { Navbar, Nav, Container, Form, Button, Badge, NavDropdown, InputGroup } from 'react-bootstrap';

function CustomNavbar({paginaActual, setPaginaActual, cantidadCarrito = 0}) {
    const [busqueda, setBusqueda] = React.useState('');

    const handleBuscar = (e) => {
        e.preventDefault();
        if(!busqueda.trim()) return;
        //Pendiente
    };

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
                            height="70"
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
                                    🖼️ Nuestras Exposiciones
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
                        <div className="d-flex flex-column align-items-stretch align-items-lg-end gap-2 mt-3 mt-lg-0" 
                            style={{ minWidth: '240px' }}
                        >

                            {/*Carrito de Compras */}
                            <Button
                                variant="light"
                                className="position-relative rounded-pill px-3 text-dark border btn-sm align-self-end"
                                aria-label="Ver carrito"
                                onClick={() => setPaginaActual('arteshop')}
                            >
                                <span aria-hidden="true">🛒</span> 
                                <Badge
                                    bg="danger"
                                    className="position-absolute top-0 start-100 translate-middle"
                                    aria-hidden="true"
                                >
                                    {cantidadCarrito}
                                </Badge>
                            </Button>

                            {/*Buscador */}
                            <Form role="search" className="w-100" style={{ minWidth: '280px' }} onSubmit={handleBuscar}>
                                <Form.Label htmlFor="buscador-sitio" visuallyHidden>
                                    Buscar en el sitio
                                </Form.Label>
                                <InputGroup size='sm'>
                                    <Form.Control
                                        id="buscador-sitio"
                                        type="search"
                                        placeholder="Buscar obras, artistas..."
                                        className="rounded-start-pill ps-3"
                                        value={busqueda}
                                        onChange={(e) => setBusqueda(e.target.value)}
                                        autoComplete="off"
                                    />
                                <Button variant="outline-primary" className="rounded-pill px-3 btn-sm" type="submit">
                                    🔍
                                </Button>
                                </InputGroup>
                            </Form>

                        </div>

                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </header>
    );
}

export default CustomNavbar;