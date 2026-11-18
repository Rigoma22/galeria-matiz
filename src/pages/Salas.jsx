import React, { useState } from 'react';

const Salas = ({ setPaginaActual }) => {
  const [pisoActivo, setPisoActivo] = useState(1);
  const [showModalPlano, setShowModalPlano] = useState(false);

  const [modalCurso1, setModalCurso1] = useState(false);
  const [modalCurso2, setModalCurso2] = useState(false);
  const [modalCurso3, setModalCurso3] = useState(false);
  const [modalCurso4, setModalCurso4] = useState(false);

const pisosData = [
  { id: 1, titulo: "Plano Técnico - Piso 1: Bienvenida y Recepción", archivo: "mapa1.png" },
  { id: 2, titulo: "Plano Técnico - Piso 2: Grandes Lienzos y Volumen", archivo: "mapa2.png" },
  { id: 3, titulo: "Plano Técnico - Piso 3: Texturas y Audiovisual", archivo: "mapa3.png" },
  { id: 4, titulo: "Plano Técnico - Piso 4: Núcleo Académico y Talleres", archivo: "mapa4.png" },
  { id: 5, titulo: "Plano Técnico - Piso 5: Administración y Montaje", archivo: "mapa5.png" },
];

  // Función para obtener los datos del plano según el piso en el que estés ubicado
  const getInfoPlano = () => {
    switch (pisoActivo) {
      case 1:
        return { titulo: "Plano Arquitectónico - Piso 1: Acceso y Servicios", archivo: "mapa1.png" };
      case 2:
        return { titulo: "Plano Arquitectónico - Piso 2: Salas Principales", archivo: "mapa2.png" };
      case 3:
        return { titulo: "Plano Arquitectónico - Piso 3: Arte Contemporáneo", archivo: "mapa3.png" };
      case 4:
        return { titulo: "Plano Arquitectónico - Piso 4: Academia y Talleres", archivo: "mapa4.png" };
      case 5:
        return { titulo: "Plano Arquitectónico - Piso 5: Administración y Bodega", archivo: "mapa5.png" };
      default:
        return { titulo: "Plano Arquitectónico - Galería Matiz", archivo: "mapa1.png" };
    }
  };

  const planoActual = getInfoPlano();

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        
        {/* Cabecera general de la página */}
        <div className="mb-5 text-center text-md-start">
          <h1 className="display-5 fw-bold text-dark m-0">Arquitectura de Nuestras Salas - Galería Matiz</h1>
          <p className="text-secondary mt-2">Recorrido detallado por los 5 pisos y espacios de nuestra instalación.</p>
        </div>

        {/* 5 Botones interactivos pequeños en una sola línea */}
        <div className="row g-2 mb-5">
          {[
            { id: 1, label: 'Piso 1: Acceso y Servicios' },
            { id: 2, label: 'Piso 2: Salas Principales' },
            { id: 3, label: 'Piso 3: Arte Contemporáneo' },
            { id: 4, label: 'Piso 4: Academia y Talleres' },
            { id: 5, label: 'Piso 5: Administración y Bodega' }
          ].map((piso) => (
            <div key={piso.id} className="col">
              <button 
                onClick={() => setPisoActivo(piso.id)}
                className={`btn w-100 py-2 px-1 rounded-pill fw-bold shadow-sm text-truncate small ${
                  pisoActivo === piso.id 
                    ? 'btn-primary text-white' 
                    : 'btn-outline-primary bg-white text-dark'
                }`}
                style={{ fontSize: '0.85rem' }}
              >
                {piso.label}
              </button>
            </div>
          ))}
        </div>

        {/* PISO 1 */}
        {pisoActivo === 1 && (
          <div className="card shadow-sm border-0 bg-white p-4 p-md-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
              <div>
                <span className="badge bg-primary mb-2 w-auto align-self-start">Nivel de Acceso</span>
                <h2 className="display-6 fw-bold text-dark m-0">Piso 1: Recepción, Taquilla y Servicios</h2>
              </div>
              <button 
                onClick={() => setShowModalPlano(true)}
                className="btn btn-outline-primary px-2 py-1 rounded-pill fw-bold shadow-sm d-inline-flex align-items-center gap-1 align-self-start"
                style={{ fontSize: '0.8rem' }}
              >
                <i className="bi bi-map"></i> Ver Mapa de este piso
              </button>
            </div>
            
            <div className="d-flex flex-column gap-5">
              
              {/* Fachada */}
              <div className="row align-items-center g-4">
                <div className="col-12 col-md-5 text-center">
                  <img src="/assets/arquitectura/FachadaGaleria.png" alt="Fachada Principal" className="img-fluid rounded shadow-sm" style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4 mb-3">
                    <h3 className="fs-4 fw-bold text-dark m-0">Nuestra Instalación Galería Matiz</h3>
                  </div>
                  <p className="text-secondary fs-6">
                    ¡Bienvenidos a Galería Matiz! Nos alegra muchísimo abrirles las puertas a este espacio de encuentro con el arte y la cultura. Aquí comienza tu experiencia, diseñamos cada rincón para que te sientas como en casa desde el primer momento en que nos visitas.
                  </p>
                </div>
              </div>

              {/* Recepción */}
              <div className="row align-items-center g-4 flex-md-row-reverse">
                <div className="col-12 col-md-5 text-center">
                  <img src="/assets/arquitectura/Lobby.png" alt="Lobby y Vestíbulo" className="img-fluid rounded shadow-sm" style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4 mb-3">
                    <h3 className="fs-4 fw-bold text-dark m-0">Recepción y Taquilla</h3>
                  </div>
                  <p className="text-secondary fs-6">
                    Esta es nuestra recepción, el corazón de bienvenida de la galería. Acá te esperamos con la mejor disposición; puedes adquirir tus boletas directamente en taquilla, recibir orientación sobre nuestras exposiciones vigentes y empezar a vivir la magia del recorrido.
                  </p>
                </div>
              </div>

              {/* Cafetería */}
              <div className="row align-items-center g-4">
                <div className="col-12 col-md-5 text-center">
                  <img src="/assets/arquitectura/Cafeteria.png" alt="Café Cultural" className="img-fluid rounded shadow-sm" style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4 mb-3">
                    <h3 className="fs-4 fw-bold text-dark m-0">Café Cultural</h3>
                  </div>
                  <p className="text-secondary fs-6">
                    Acá te esperamos para que disfrutes de un delicioso café, tus onces o un snack de tarde mientras compartes con amigos, respiras tranquilidad y contemplas el ambiente artístico que nos rodea. ¡El lugar perfecto para hacer una pausa!
                  </p>
                </div>
              </div>

              {/* Tienda */}
              <div className="row align-items-center g-4 flex-md-row-reverse">
                <div className="col-12 col-md-5 text-center">
                  <img src="/assets/arquitectura/Tienda.png" alt="ArteShop" className="img-fluid rounded shadow-sm" style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4 mb-3">
                    <h3 className="fs-4 fw-bold text-dark m-0">ArteShop (Tienda de Recuerdos)</h3>
                  </div>
                  <p className="text-secondary fs-6">
                    Aquí puedes comprar tus recuerdos, catálogos de arte, detalles únicos y pequeñas obras de artistas locales. Llévate a casa un pedacito de la galería y apoya el talento de nuestra comunidad creativa.
                  </p>
                </div>
              </div>

              {/* Baños Piso 1 */}
              <div className="row align-items-center g-4">
                <div className="col-12 col-md-5 text-center">
                  <img src="/assets/arquitectura/baños.png" alt="Baños Piso 1" className="img-fluid rounded shadow-sm" style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4 mb-3">
                    <h3 className="fs-4 fw-bold text-dark m-0">Servicios Sanitarios</h3>
                  </div>
                  <p className="text-secondary fs-6">
                    Baños públicos modernos, accesibles y dotados para damas, caballeros y personas con movilidad reducida, ubicados estratégicamente en el nivel de acceso.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* PISO 2 */}
        {pisoActivo === 2 && (
          <div className="card shadow-sm border-0 bg-white p-4 p-md-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
              <div>
                <span className="badge bg-primary mb-2 w-auto align-self-start">Exhibición Principal</span>
                <h2 className="display-6 fw-bold text-dark m-0">Piso 2: Sala Principal de Exposición</h2>
              </div>
              <button 
                onClick={() => setShowModalPlano(true)}
                className="btn btn-outline-primary px-2 py-1 rounded-pill fw-bold shadow-sm d-inline-flex align-items-center gap-1 align-self-start"
                style={{ fontSize: '0.8rem' }}
              >
                <i className="bi bi-map"></i> Ver Mapa de este piso
              </button>
            </div>
            
            <div className="d-flex flex-column gap-5">
              
              <div className="row align-items-center g-4">
                <div className="col-12 col-md-5 text-center">
                  <img src="/assets/arquitectura/granLienzo.png" alt="Gran Lienzo" className="img-fluid rounded shadow-sm" style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4 mb-3">
                    <h3 className="fs-4 fw-bold text-dark m-0">Gran Lienzo</h3>
                  </div>
                  <p className="text-secondary fs-6">
                    Un espacio monumental diseñado para perderse entre pinceladas colosales y explosiones de color que dominan la mirada. Aquí las obras de gran formato no solo se exhiben; envuelven los sentidos y atrapan al visitante en una experiencia visual inmersa que obliga a detenerse y contemplar de cerca cada detalle.
                  </p>
                </div>
              </div>

              <div className="row align-items-center g-4 flex-md-row-reverse">
                <div className="col-12 col-md-5 text-center">
                  <img src="/assets/arquitectura/tridimensional.png" alt="Sala Tridimensional" className="img-fluid rounded shadow-sm" style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4 mb-3">
                    <h3 className="fs-4 fw-bold text-dark m-0">Sala Tridimensional</h3>
                  </div>
                  <p className="text-secondary fs-6">
                    Un espacio concebido para rodear la obra. Gracias a una cuidada iluminación cenital, las esculturas y piezas volumétricas se liberan de la pared para invitar a darles la vuelta, descubriendo matices, sombras y relieves ocultos desde cualquier ángulo.                  </p>
                </div>
              </div>

              <div className="row align-items-center g-4">
                <div className="col-12 col-md-5 text-center">
                  <img src="/assets/arquitectura/capturaVisual.png" alt="Sala 3" className="img-fluid rounded shadow-sm" style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4 mb-3">
                    <h3 className="fs-4 fw-bold text-dark m-0">Captura Visual</h3>
                  </div>
                  <p className="text-secondary fs-6">
                    Una galería íntima que detiene el tiempo a través de la lente. Este rincón moderno y depurado convierte cada fotografía e instalación gráfica en un destello de memoria visual, donde la luz guía la mirada hacia historias congeladas con precisión milimétrica.                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* PISO 3 */}
        {pisoActivo === 3 && (
          <div className="card shadow-sm border-0 bg-white p-4 p-md-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
              <div>
                <span className="badge bg-primary mb-2 w-auto align-self-start">Arte Contemporáneo</span>
                <h2 className="display-6 fw-bold text-dark m-0">Piso 3: Arte Contemporáneo y Audiovisual</h2>
              </div>
              <button 
                onClick={() => setShowModalPlano(true)}
                className="btn btn-outline-primary px-2 py-1 rounded-pill fw-bold shadow-sm d-inline-flex align-items-center gap-1 align-self-start"
                style={{ fontSize: '0.8rem' }}
              >
                <i className="bi bi-map"></i> Ver Mapa de este piso
              </button>
            </div>
            
            <div className="d-flex flex-column gap-5">
              
              <div className="row align-items-center g-4">
                <div className="col-12 col-md-5 text-center">
                  <img src="/assets/arquitectura/terracotaYtrama.png" alt="Terracota y Trama" className="img-fluid rounded shadow-sm" style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4 mb-3">
                    <h3 className="fs-4 fw-bold text-dark m-0">Terracota y Trama</h3>
                  </div>
                  <p className="text-secondary fs-6">
                    Un recorrido táctil por el origen. Un entorno modular que huele a arcilla fresca y reúne la calidez de los tapices, los textiles y la cerámica artesanal, conectando al visitante con el trabajo artesano y las fibras más honestas de la tierra.
                  </p>
                </div>
              </div>

              <div className="row align-items-center g-4 flex-md-row-reverse">
                <div className="col-12 col-md-5 text-center">
                  <img src="/assets/arquitectura/espectroDigital.png" alt="Espectro Digital" className="img-fluid rounded shadow-sm" style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4 mb-3">
                    <h3 className="fs-4 fw-bold text-dark m-0">Espectro Digital</h3>
                  </div>
                  <p className="text-secondary fs-6">
                    Una zona de vanguardia donde el arte deja de ser estático para cobrar vida propia. Pantallas envolventes, proyecciones de video-mapping e instalaciones interactivas se fusionan para atrapar los sentidos en un territorio donde la tecnología y la imaginación no tienen límites.
                  </p>
                </div>
              </div>

              <div className="row align-items-center g-4">
                <div className="col-12 col-md-5 text-center">
                  <img src="/assets/arquitectura/baños.png" alt="Baños Piso 3" className="img-fluid rounded shadow-sm" style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4 mb-3">
                    <h3 className="fs-4 fw-bold text-dark m-0">Servicios Sanitarios</h3>
                  </div>
                  <p className="text-secondary fs-6">
                    Espacios sanitarios amplios y dotados con acabados contemporáneos para la comodidad de los visitantes durante su recorrido por las salas contemporáneas.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* PISO 4: ACADEMIA Y TALLERES (ZIGZAG + DETALLES) */}
        {pisoActivo === 4 && (
          <div className="card shadow-sm border-0 bg-white p-4 p-md-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
              <div>
                <span className="badge bg-primary mb-2 w-auto align-self-start">Núcleo Educativo</span>
                <h2 className="display-6 fw-bold text-dark m-0">Piso 4: Academia y Talleres Formativos</h2>
              </div>
              <button 
                onClick={() => setShowModalPlano(true)}
                className="btn btn-outline-primary px-2 py-1 rounded-pill fw-bold shadow-sm d-inline-flex align-items-center gap-1 align-self-start"
                style={{ fontSize: '0.8rem' }}
              >
                <i className="bi bi-map"></i> Ver Mapa de este piso
              </button>
            </div>
            
            <div className="d-flex flex-column gap-5">
              
              {/* Aula 1 (Izq) */}
              <div className="row align-items-center g-4">
                <div className="col-12 col-md-5 text-center">
                  <img src="/assets/arquitectura/tallerPintura.png" alt="Aula 1" className="img-fluid rounded shadow-sm" style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <span className="badge bg-primary mb-2">Aula 1</span>
                  <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4 mb-3">
                    <h3 className="fs-4 fw-bold text-dark m-0">Pintura al Óleo, Acuarela y Acrílico</h3>
                  </div>
                  <p className="text-secondary fs-6 mb-4">
                    Espacio especializado dotado con caballetes profesionales e iluminación natural para explorar las técnicas húmedas más fascinantes del arte pictórico.
                  </p>
                  <button 
                    onClick={() => setModalCurso1(true)}
                    className="btn bg-white text-primary border border-primary px-4 py-2 rounded-pill fw-bold shadow-sm"
                    style={{ transition: 'all 0.3s' }}
                    onMouseEnter={(e) => { e.target.style.backgroundColor = '#0d6efd'; e.target.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.target.style.backgroundColor = '#fff'; e.target.style.color = '#0d6efd'; }}
                  >
                    Ver detalles del curso
                  </button>
                </div>
              </div>

              {/* Aula 2 (Der) */}
              <div className="row align-items-center g-4 flex-md-row-reverse">
                <div className="col-12 col-md-5 text-center">
                  <img src="/assets/arquitectura/tallerDibujo.png" alt="Aula 2" className="img-fluid rounded shadow-sm" style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <span className="badge bg-primary mb-2">Aula 2</span>
                  <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4 mb-3">
                    <h3 className="fs-4 fw-bold text-dark m-0">Dibujo, Grafito y Figura Humana</h3>
                  </div>
                  <p className="text-secondary fs-6 mb-4">
                    Equipado con mesas de dibujo inclinadas, atriles y modelos en vivo para perfeccionar el trazo, la proporción y el claroscuro.
                  </p>
                  <button 
                    onClick={() => setModalCurso2(true)}
                    className="btn bg-white text-primary border border-primary px-4 py-2 rounded-pill fw-bold shadow-sm"
                    style={{ transition: 'all 0.3s' }}
                    onMouseEnter={(e) => { e.target.style.backgroundColor = '#0d6efd'; e.target.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.target.style.backgroundColor = '#fff'; e.target.style.color = '#0d6efd'; }}
                  >
                    Ver detalles del curso
                  </button>
                </div>
              </div>

              {/* Aula 3 (Izq) */}
              <div className="row align-items-center g-4">
                <div className="col-12 col-md-5 text-center">
                  <img src="/assets/arquitectura/tallerFotografia.png" alt="Aula 3" className="img-fluid rounded shadow-sm" style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <span className="badge bg-primary mb-2">Aula 3</span>
                  <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4 mb-3">
                    <h3 className="fs-4 fw-bold text-dark m-0">Laboratorio de Fotografía y Edición Digital</h3>
                  </div>
                  <p className="text-secondary fs-6 mb-4">
                    Estudio fotográfico profesional con equipos de iluminación de alta gama y estaciones de edición digital para revelar tu propia visión artística.
                  </p>
                  <button 
                    onClick={() => setModalCurso3(true)}
                    className="btn bg-white text-primary border border-primary px-4 py-2 rounded-pill fw-bold shadow-sm"
                    style={{ transition: 'all 0.3s' }}
                    onMouseEnter={(e) => { e.target.style.backgroundColor = '#0d6efd'; e.target.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.target.style.backgroundColor = '#fff'; e.target.style.color = '#0d6efd'; }}
                  >
                    Ver detalles del curso
                  </button>
                </div>
              </div>

              {/* Aula 4 (Der) */}
              <div className="row align-items-center g-4 flex-md-row-reverse">
                <div className="col-12 col-md-5 text-center">
                  <img src="/assets/arquitectura/tallerEscultura.png" alt="Aula 4" className="img-fluid rounded shadow-sm" style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <span className="badge bg-primary mb-2">Aula 4</span>
                  <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4 mb-3">
                    <h3 className="fs-4 fw-bold text-dark m-0">Taller de Escultura en Arcilla</h3>
                  </div>
                  <p className="text-secondary fs-6 mb-4">
                    Zona de trabajo manual dotada con tornos de alfarería, bancadas de modelado y herramientas para dar forma a la materia viva.
                  </p>
                  <button 
                    onClick={() => setModalCurso4(true)}
                    className="btn bg-white text-primary border border-primary px-4 py-2 rounded-pill fw-bold shadow-sm"
                    style={{ transition: 'all 0.3s' }}
                    onMouseEnter={(e) => { e.target.style.backgroundColor = '#0d6efd'; e.target.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.target.style.backgroundColor = '#fff'; e.target.style.color = '#0d6efd'; }}
                  >
                    Ver detalles del curso
                  </button>
                </div>
              </div>

              {/* Baños Piso 4 (Izq) */}
              <div className="row align-items-center g-4">
                <div className="col-12 col-md-5 text-center">
                  <img src="/assets/arquitectura/baños.png" alt="Baños Piso 4" className="img-fluid rounded shadow-sm" style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <span className="badge bg-primary mb-2    ">Servicios</span>
                  <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4 mb-3">
                    <h3 className="fs-4 fw-bold text-dark m-0">Servicios Sanitarios</h3>
                  </div>
                  <p className="text-secondary fs-6">
                    Instalaciones sanitarias de uso exclusivo para estudiantes y profesores, ubicadas con acceso rápido desde los talleres formativos.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* PISO 5: ADMINISTRACIÓN Y LOGÍSTICA (ZIGZAG) */}
        {pisoActivo === 5 && (
          <div className="card shadow-sm border-0 bg-white p-4 p-md-5">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-3">
              <div>
                <span className="badge bg-primary mb-2 w-auto align-self-start">Logística y Gestión (Acceso Restringido)</span>
                <h2 className="display-6 fw-bold text-dark m-0">Piso 5: Administración y Operaciones</h2>
              </div>
              <button 
                onClick={() => setShowModalPlano(true)}
                className="btn btn-outline-primary px-2 py-1 rounded-pill fw-bold shadow-sm d-inline-flex align-items-center gap-1 align-self-start"
                style={{ fontSize: '0.8rem' }}
              >
                <i className="bi bi-map"></i> Ver Mapa de este piso
              </button>
            </div>
            
            <div className="d-flex flex-column gap-5">
              
              {/* Oficinas Administrativas (Izq) */}
              <div className="row align-items-center g-4">
                <div className="col-12 col-md-5 text-center">
                  <img src="/assets/arquitectura/oficinas.png" alt="Oficinas Administrativas" className="img-fluid rounded shadow-sm" style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4 mb-3">
                    <h3 className="fs-4 fw-bold text-dark m-0">Oficinas Administrativas</h3>
                  </div>
                  <p className="text-secondary fs-6">
                    Centro de dirección, coordinación académica y gestión cultural de la galería. Espacios diseñados para la planeación institucional y atención especializada.
                  </p>
                </div>
              </div>

              {/* Bodega de Materiales (Der) */}
              <div className="row align-items-center g-4 flex-md-row-reverse">
                <div className="col-12 col-md-5 text-center">
                  <img src="/assets/arquitectura/bodegaInsumos.png" alt="Bodega de Materiales" className="img-fluid rounded shadow-sm" style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4 mb-3">
                    <h3 className="fs-4 fw-bold text-dark m-0">Bodega de Materiales Artísticos</h3>
                  </div>
                  <p className="text-secondary fs-6">
                    Depósito centralizado donde se resguardan todos los insumos, óleos, lienzos, arcilla y herramientas necesarios para el normal desarrollo de los talleres formativos.
                  </p>
                </div>
              </div>

              {/* Almacén de Obras (Izq) */}
              <div className="row align-items-center g-4">
                <div className="col-12 col-md-5 text-center">
                  <img src="/assets/arquitectura/almacenObras.png" alt="Almacén de Obras" className="img-fluid rounded shadow-sm" style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4 mb-3">
                    <h3 className="fs-4 fw-bold text-dark m-0">Almacén de Obras (Acceso Restringido)</h3>
                  </div>
                  <p className="text-secondary fs-6">
                    Área de máxima seguridad y climatización controlada dedicada exclusivamente al resguardo del patrimonio artístico y piezas en tránsito de la galería.
                  </p>
                </div>
              </div>

              {/* Zona de Montaje (Der) */}
              <div className="row align-items-center g-4 flex-md-row-reverse">
                <div className="col-12 col-md-5 text-center">
                  <img src="/assets/arquitectura/zonaMontaje.png" alt="Zona de Montaje" className="img-fluid rounded shadow-sm" style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4 mb-3">
                    <h3 className="fs-4 fw-bold text-dark m-0">Zona de Montaje y Preparación</h3>
                  </div>
                  <p className="text-secondary fs-6">
                    Espacio técnico amplio acondicionado para la curaduría preliminar, enmarcado y diseño de montaje de las próximas exposiciones que llegan a la institución.
                  </p>
                </div>
              </div>

              {/* Baños Piso 5 (Izq) */}
              <div className="row align-items-center g-4">
                <div className="col-12 col-md-5 text-center">
                  <img src="/assets/arquitectura/baños.png" alt="Baños Piso 5" className="img-fluid rounded shadow-sm" style={{ maxHeight: '280px', objectFit: 'cover', width: '100%' }} />
                </div>
                <div className="col-12 col-md-7">
                  <div className="p-3 bg-light rounded shadow-sm border-start border-primary border-4 mb-3">
                    <h3 className="fs-4 fw-bold text-dark m-0">Servicios Sanitarios y Vestier</h3>
                  </div>
                  <p className="text-secondary fs-6">
                    Instalaciones de uso privado y vestier para el personal administrativo, curadores y operadores logísticos del nivel superior.
                  </p>
                </div>
              </div>

      </div>
          </div>
        )}

      </div>

      {/* VENTANA EMERGENTE (MODAL) DINÁMICA PARA PLANOS */}
      {showModalPlano && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title fw-bold"><i className="bi bi-map me-2"></i> {planoActual.titulo}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModalPlano(false)}></button>
              </div>
              <div className="modal-body p-4 text-center">
                <p className="text-secondary mb-3">Distribución técnica oficial correspondiente al nivel seleccionado.</p>
                
                {/* Contenedor dinámico del plano */}
                <div className="ratio ratio-16x9 bg-light rounded border overflow-hidden d-flex align-items-center justify-content-center position-relative">
                  <img 
                    src={`/assets/arquitectura/${planoActual.archivo}`} 
                    alt={planoActual.titulo} 
                    className="w-100 h-100 object-fit-contain position-relative z-1"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  {/* Mensaje de respaldo por si falta algún archivo o mientras lo subes */}
                  <div className="position-absolute text-center p-3 text-muted">
                    <i className="bi bi-image fs-1 d-block mb-2"></i>
                    <span>Sube tu archivo como <code className="text-primary">/assets/arquitectura/{planoActual.archivo}</code></span>
                  </div>
                </div>

              </div>
              <div className="modal-footer bg-light">
                <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setShowModalPlano(false)}>Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* MODALES DE DETALLE PARA CADA CURSO (PISO 4) */}
      {/* Modal Curso 1 */}
      {modalCurso1 && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg p-3">
              <div className="modal-header border-0">
                <h4 className="fw-bold text-dark m-0">Aula 1: Pintura al Óleo, Acuarela y Acrílico</h4>
                <button type="button" className="btn-close" onClick={() => setModalCurso1(false)}></button>
              </div>
              <div className="modal-body">
                <p className="text-secondary">
                  <strong>Descripción:</strong> Aquí las paredes huelen a linaza y color. Un espacio bañado en luz natural donde los caballetes esperan para dar rienda suelta a la creatividad, ya sea derritiendo la paciencia con la elegancia del óleo, jugando con la ligereza de la acuarela o explotando la potencia del acrílico. El lugar perfecto para perder la noción del tiempo mientras la pintura cobra vida propia entre tus manos.
                </p>
                <p className="text-secondary">
                  <strong>Capacidad:</strong> 10 a 15 estudiantes por salón para una atención personalizada.
                </p>
                <p className="text-secondary">
                  <strong>Materiales:</strong> ¡No te preocupes por nada! Contamos con todos los materiales necesarios (óleos, acuarelas, acrílicos, pinceles, espátulas y soportes) listos para ti en cada clase.
                </p>
                <p className="text-secondary">
                  <strong>Objetivo del taller:</strong> Dominar la teoría del color, las transparencias y la expresividad de las técnicas pictóricas en un ambiente creativo.
                </p>
                <p className="text-secondary fst-italic">
                  "Es una experiencia sumamente divertida y liberadora; dejar que el color fluya sobre el lienzo es la desconexión perfecta."
                </p>
                
                <div className="row g-3 my-3">
                  <div className="col-6 text-center">
                    <img 
                        src="/assets/arquitectura/materiales1.png" 
                        alt="Materiales Aula 1" 
                        className="img-fluid rounded border mb-2" 
                        style={{ maxHeight: '120px', objectFit: 'cover' }}
                    />
                    <div className="text-muted small">Foto de Materiales</div>
                   </div>
                   <div className="col-6 text-center">
                    <img 
                        src="/assets/arquitectura/clase1.png" 
                        alt="Clase Aula 1" 
                        className="img-fluid rounded border mb-2" 
                        style={{ maxHeight: '120px', objectFit: 'cover' }}
                    />
                    <div className="text-muted small">Foto de Clase</div>
                   </div>
                </div>

                <div className="text-center mt-4">
                <button 
                    type="button"
                    onClick={() => {
                        setModalCurso1(false);
                        setPaginaActual('cursos');
                    }}
                    className="btn bg-white text-primary border border-primary px-4 py-2 rounded-pill fw-bold shadow-sm"
                    style={{ transition: 'all 0.3s' }} 
                    onMouseEnter={(e)=>{e.target.style.backgroundColor='#0d6efd';e.target.style.color='#fff';}} 
                    onMouseLeave={(e)=>{e.target.style.backgroundColor='#fff';e.target.style.color='#0d6efd';}}
                >
                    Ver cursos y experiencias
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Curso 2 */}
      {modalCurso2 && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg p-3">
              <div className="modal-header border-0">
                <h4 className="fw-bold text-dark m-0">Aula 2: Dibujo, Grafito y Figura Humana</h4>
                <button type="button" className="btn-close" onClick={() => setModalCurso2(false)}></button>
              </div>
              <div className="modal-body">
                <p className="text-secondary">
                  <strong>Descripción:</strong> Todo gran artista empieza dominando el trazo. Este taller está diseñado para entender la anatomía, dominar la sombra y atrapar la esencia de la figura humana con la precisión del grafito y el carbón. Mesas inclinadas y modelos en vivo en un ambiente íntimo donde cada línea en el papel se convierte en una extensión exacta de tu mirada.
                </p>
                <p className="text-secondary">
                  <strong>Capacidad:</strong> 10 a 15 estudiantes por salón.
                </p>
                <p className="text-secondary">
                  <strong>Materiales:</strong> Proveemos todos los implementos necesarios, desde lápices de grafito de diversas graduaciones hasta papeles especiales, difuminadores y atriles.
                </p>
                <p className="text-secondary">
                  <strong>Objetivo del taller:</strong> Desarrollar la precisión visual, el dominio de las sombras, volúmenes y la anatomía artística.
                </p>
                <p className="text-secondary fst-italic">
                  "Una práctica liberadora que te enseña a ver el mundo a través de las líneas y los contrastes."
                </p>
                
                <div className="row g-3 my-3">
                  <div className="col-6 text-center">
                    <img 
                        src="/assets/arquitectura/materiales2.png" 
                        alt="Materiales Aula 2" 
                        className="img-fluid rounded border mb-2" 
                        style={{ maxHeight: '120px', objectFit: 'cover' }}
                    />
                    <div className="text-muted small">Foto de Materiales</div>
                   </div>
                   <div className="col-6 text-center">
                    <img 
                        src="/assets/arquitectura/clase2.png" 
                        alt="Clase Aula 2" 
                        className="img-fluid rounded border mb-2" 
                        style={{ maxHeight: '120px', objectFit: 'cover' }}
                    />
                    <div className="text-muted small">Foto de Clase</div>
                   </div>
                </div>

                <div className="text-center mt-4">
                <button 
                    type="button"
                    onClick={() => {
                        setModalCurso2(false);
                        setPaginaActual('cursos');
                    }}
                    className="btn bg-white text-primary border border-primary px-4 py-2 rounded-pill fw-bold shadow-sm"
                    style={{ transition: 'all 0.3s' }} 
                    onMouseEnter={(e)=>{e.target.style.backgroundColor='#0d6efd';e.target.style.color='#fff';}} 
                    onMouseLeave={(e)=>{e.target.style.backgroundColor='#fff';e.target.style.color='#0d6efd';}}
                >
                    Ver cursos y experiencias
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Curso 3 */}
      {modalCurso3 && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg p-3">
              <div className="modal-header border-0">
                <h4 className="fw-bold text-dark m-0">Aula 3: Laboratorio de Fotografía y Edición Digital</h4>
                <button type="button" className="btn-close" onClick={() => setModalCurso3(false)}></button>
              </div>
              <div className="modal-body">
                <p className="text-secondary">
                  <strong>Descripción:</strong> Detener el tiempo con la luz nunca fue tan profesional. Un estudio de altura equipado con flashes, esquemas de iluminación avanzados y estaciones de postproducción de última generación. Aquí no solo disparas una cámara; aprendes a construir atmósferas, dominar el revelado digital y transformar cada clic en una pieza de autor con sello propio.
                </p>
                <p className="text-secondary">
                  <strong>Capacidad:</strong> 10 a 15 estudiantes por salón.
                </p>
                <p className="text-secondary">
                  <strong>Materiales:</strong> Disponemos de equipos de iluminación profesional, cámaras de estudio y estaciones con software avanzado de revelado digital.
                </p>
                <p className="text-secondary">
                  <strong>Objetivo del taller:</strong> Comprender el manejo de la luz artificial y el flujo de postproducción para narrar historias visuales impactantes.
                </p>
                <p className="text-secondary fst-italic">
                  "Capturar instantes únicos y transformar la realidad a través de la lente es un proceso sumamente apasionante y creativo."
                </p>
                
                <div className="row g-3 my-3">
                  <div className="col-6 text-center">
                    <img 
                        src="/assets/arquitectura/materiales3.png" 
                        alt="Materiales Aula 3" 
                        className="img-fluid rounded border mb-2" 
                        style={{ maxHeight: '120px', objectFit: 'cover' }}
                    />
                    <div className="text-muted small">Foto de Materiales</div>
                   </div>
                   <div className="col-6 text-center">
                    <img 
                        src="/assets/arquitectura/clase3.png" 
                        alt="Clase Aula 3" 
                        className="img-fluid rounded border mb-2" 
                        style={{ maxHeight: '120px', objectFit: 'cover' }}
                    />
                    <div className="text-muted small">Foto de Clase</div>
                   </div>
                </div>

                <div className="text-center mt-4">
                <button 
                    type="button"
                    onClick={() => {
                        setModalCurso3(false); 
                        setPaginaActual('cursos'); 
                    }}
                    className="btn bg-white text-primary border border-primary px-4 py-2 rounded-pill fw-bold shadow-sm"
                    style={{ transition: 'all 0.3s' }} 
                    onMouseEnter={(e)=>{e.target.style.backgroundColor='#0d6efd';e.target.style.color='#fff';}} 
                    onMouseLeave={(e)=>{e.target.style.backgroundColor='#fff';e.target.style.color='#0d6efd';}}
                >
                    Ver cursos y experiencias
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal Curso 4 */}
      {modalCurso4 && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content border-0 shadow-lg p-3">
              <div className="modal-header border-0">
                <h4 className="fw-bold text-dark m-0">Aula 4: Taller de Escultura en Arcilla</h4>
                <button type="button" className="btn-close" onClick={() => setModalCurso4(false)}></button>
              </div>
              <div className="modal-body">
                <p className="text-secondary">
                  <strong>Descripción:</strong> El arte que se toca, se amasa y se respira. Una zona de trabajo totalmente equipada con tornos de alfarería y herramientas de precisión para sentir la resistencia y la docilidad de la materia viva. Un espacio artesanal donde la arcilla se convierte en volumen, textura y movimiento bajo el poder de tus propias manos.
                </p>
                <p className="text-secondary">
                  <strong>Capacidad:</strong> 10 a 15 estudiantes por salón.
                </p>
                <p className="text-secondary">
                  <strong>Materiales:</strong> Proveemos arcilla de alta calidad, tornos de alfarería, estecas, vaciadores y herramientas de modelado para cada sesión.
                </p>
                <p className="text-secondary">
                  <strong>Objetivo del taller:</strong> Conectar con el volumen, el espacio tridimensional y la textura mediante el modelado directo de la materia.
                </p>
                <p className="text-secondary fst-italic">
                  "Moldear con las manos es una actividad profundamente liberadora que te permite desconectarte por completo y dar vida a tus propias formas."
                </p>
                
                <div className="row g-3 my-3">
                  <div className="col-6 text-center">
                    <img 
                        src="/assets/arquitectura/materiales4.png" 
                        alt="Materiales Aula 4" 
                        className="img-fluid rounded border mb-2" 
                        style={{ maxHeight: '120px', objectFit: 'cover' }}
                    />
                    <div className="text-muted small">Foto de Materiales</div>
                   </div>
                   <div className="col-6 text-center">
                    <img 
                        src="/assets/arquitectura/clase4.png" 
                        alt="Clase Aula 4" 
                        className="img-fluid rounded border mb-2" 
                        style={{ maxHeight: '120px', objectFit: 'cover' }}
                    />
                    <div className="text-muted small">Foto de Clase</div>
                   </div>
                </div>

                <div className="text-center mt-4">
                <button 
                    type="button"
                    onClick={() => {
                        setModalCurso4(false);
                        setPaginaActual('cursos');
                    }}
                    className="btn bg-white text-primary border border-primary px-4 py-2 rounded-pill fw-bold shadow-sm"
                    style={{ transition: 'all 0.3s' }} 
                    onMouseEnter={(e)=>{e.target.style.backgroundColor='#0d6efd';e.target.style.color='#fff';}} 
                    onMouseLeave={(e)=>{e.target.style.backgroundColor='#fff';e.target.style.color='#0d6efd';}}
                >
                    Ver cursos y experiencias
                </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Salas;