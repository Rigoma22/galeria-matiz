import React, { useState } from 'react';

const exposicionesActuales = [
  {
    id: 1,
    titulo: 'Matices Urbanos',
    descripcion: 'Retrato del caos, el transporte y la vida cotidiana en las calles de Bogotá a través de colores saturados.',
    sala: 'Sala Principal',
    fechaInicio: '15 de Octubre 2026',
    fechaFin: '15 de Noviembre 2026',
    imagen: '/assets/sala1.png',
    alt: 'Pintura urbana representando calles de Bogotá',
    artista: 'Colectivo Arte Capital',
    añoCreacion: '2026',
    numeroObras: 15,
    tecnica: 'Pintura acrílica y óleo sobre lienzo',
    intencion: 'Retratar el caos, el transporte y la vida cotidiana en las calles de Bogotá. Se busca que el visitante reconozca su propio entorno urbano a través de colores saturados y trazos rápidos.',
    horarios: 'Mar-Sáb 10:00 AM - 7:00 PM | Dom 11:00 AM - 5:00 PM'
  },
  {
    id: 2,
    titulo: 'Renacer Metálico',
    descripcion: 'Esculturas creadas a partir de piezas de motores antiguos, engranajes y tuberías oxidadas.',
    sala: 'Sala 2',
    fechaInicio: '1 de Octubre 2026',
    fechaFin: '30 de Noviembre 2026',
    imagen: '/assets/sala2.png',
    alt: 'Escultura de metal reciclado',
    artista: 'Diego Ferro y Taller Fundición Andina',
    añoCreacion: '2025 - 2026',
    numeroObras: 12,
    tecnica: 'Ensamblaje y soldadura de metales reciclados',
    intencion: 'Darle una segunda vida al desecho industrial. El artista utiliza piezas de motores antiguos, engranajes y tuberías oxidadas para formar figuras de animales nativos, cuestionando el consumo desmedido.',
    horarios: 'Mar-Sáb 10:00 AM - 7:00 PM | Dom 11:00 AM - 5:00 PM'
  },
  {
    id: 3,
    titulo: 'Retratos Olvidados',
    descripcion: 'Fotografía análoga en blanco y negro que preserva la memoria visual de rostros anónimos de la ciudad.',
    sala: 'Sala 3',
    fechaInicio: '5 de Septiembre 2026',
    fechaFin: '5 de Diciembre 2026',
    imagen: '/assets/sala3.png',
    alt: 'Fotografía antigua en blanco y negro de un rostro',
    artista: 'Archivo General (Restauración por Curaduría Matiz)',
    añoCreacion: '1950 - 1960',
    numeroObras: 45,
    tecnica: 'Fotografía análoga impresa en papel gelatina de plata',
    intencion: 'Preservar la memoria visual de rostros anónimos de la ciudad. Es una ventana directa al pasado que explora la moda, las expresiones y los oficios de mediados del siglo XX.',
    horarios: 'Mar-Sáb 10:00 AM - 7:00 PM | Dom 11:00 AM - 5:00 PM'
  },
  {
    id: 4,
    titulo: 'Raíces de Tierra',
    descripcion: 'Vasijas y figuras modeladas a mano que exploran mitos de creación indígenas mediante patrones geométricos.',
    sala: 'Sala 4',
    fechaInicio: '20 de Septiembre 2026',
    fechaFin: '20 de Diciembre 2026',
    imagen: '/assets/sala4.png',
    alt: 'Cerámica y vasijas de arcilla',
    artista: 'Artesanas de Ráquira',
    añoCreacion: '2026',
    numeroObras: 50,
    tecnica: 'Modelado manual en arcilla y cocción en horno de leña',
    intencion: 'Conectar al público con las técnicas alfareras tradicionales. Las piezas exploran mitos de creación indígenas mediante patrones geométricos tallados directamente en el barro antes del secado.',
    horarios: 'Mar-Sáb 10:00 AM - 7:00 PM | Dom 11:00 AM - 5:00 PM'
  },
  {
    id: 5,
    titulo: 'Visiones del Futuro',
    descripcion: 'Instalaciones interactivas donde la tecnología y proyecciones de luz reaccionan a la presencia del público.',
    sala: 'Sala 5',
    fechaInicio: '10 de Octubre 2026',
    fechaFin: '15 de Diciembre 2026',
    imagen: '/assets/sala5.png',
    alt: 'Instalación de arte digital y luces',
    artista: 'Grupo TeknoArt',
    añoCreacion: '2026',
    numeroObras: 8,
    tecnica: 'Mapeo de proyección (mapping) y sensores de movimiento',
    intencion: 'Sumergir al espectador en un entorno donde la tecnología reacciona a su presencia. Las luces y formas proyectadas en las paredes cambian de patrón dependiendo de cómo caminen las personas por la sala.',
    horarios: 'Mar-Sáb 10:00 AM - 7:00 PM | Dom 11:00 AM - 5:00 PM'
  }
];

const exposicionesProximas = [
  {
    id: 6,
    titulo: 'Formas en Reposo',
    descripcion: 'Esculturas talladas directamente en bloques de mármol y piedra sabanera que capturan la fluidez del cuerpo humano.',
    sala: 'Sala Principal',
    fechaInicio: '20 de Noviembre 2026',
    fechaFin: '20 de Enero 2027',
    imagen: '/assets/sala1_prox.png',
    alt: 'Escultura en piedra y mármol',
    artista: 'Elena Montes',
    añoCreacion: '2024 - 2025',
    numeroObras: 10,
    tecnica: 'Talla directa sobre bloques de mármol y piedra sabanera',
    intencion: 'Capturar la fluidez y suavidad del cuerpo humano utilizando materiales de extrema rigidez y peso. Exige que el espectador rodee la obra para entender la anatomía desde distintos ángulos.',
    horarios: 'Mar-Sáb 10:00 AM - 7:00 PM | Dom 11:00 AM - 5:00 PM'
  },
  {
    id: 7,
    titulo: 'Pinceladas de Niebla',
    descripcion: 'Paisajes de los páramos colombianos mediante manchas de agua y color para concientizar sobre el agua.',
    sala: 'Sala 2',
    fechaInicio: '1 de Diciembre 2026',
    fechaFin: '28 de Febrero 2027',
    imagen: '/assets/sala2_prox.png',
    alt: 'Pintura en acuarela de paisajes',
    artista: 'Carlos Cifuentes',
    añoCreacion: '2026',
    numeroObras: 30,
    tecnica: 'Acuarela sobre papel de algodón',
    intencion: 'Mostrar los paisajes de los páramos colombianos mediante manchas de color diluidas. El objetivo es generar conciencia sobre la fragilidad de las fuentes de agua y los ecosistemas de alta montaña.',
    horarios: 'Mar-Sáb 10:00 AM - 7:00 PM | Dom 11:00 AM - 5:00 PM'
  },
  {
    id: 8,
    titulo: 'Hilos de la Memoria',
    descripcion: 'Telares de gran formato que narran historias de resistencia campesina mediante técnicas textiles tradicionales.',
    sala: 'Sala 3',
    fechaInicio: '15 de Diciembre 2026',
    fechaFin: '15 de Febrero 2027',
    imagen: '/assets/sala3_prox.png',
    alt: 'Telares y arte textil',
    artista: 'Colectivo Tejedoras del Sur',
    añoCreacion: '2025 - 2026',
    numeroObras: 25,
    tecnica: 'Telar manual, bordado y tintes naturales',
    intencion: 'Narrar historias de resistencia campesina a través de los hilos. Transforma el acto doméstico de tejer en un documento social que documenta los desplazamientos y el retorno a la tierra.',
    horarios: 'Mar-Sáb 10:00 AM - 7:00 PM | Dom 11:00 AM - 5:00 PM'
  },
  {
    id: 9,
    titulo: 'Luz y Sombra',
    descripcion: 'Estudio fotográfico de larga exposición sobre cómo penetra la luz del sol en edificios abandonados.',
    sala: 'Sala 4',
    fechaInicio: '10 de Enero 2027',
    fechaFin: '10 de Marzo 2027',
    imagen: '/assets/sala4_prox.png',
    alt: 'Fotografía de arquitectura y sombras',
    artista: 'Laura Bernal',
    añoCreacion: '2025',
    numeroObras: 20,
    tecnica: 'Fotografía digital de larga exposición',
    intencion: 'Un estudio sobre cómo penetra la luz del sol en edificios abandonados de la capital. Juega con la geometría espacial, el alto contraste y la belleza de las estructuras vacías.',
    horarios: 'Mar-Sáb 10:00 AM - 7:00 PM | Dom 11:00 AM - 5:00 PM'
  },
  {
    id: 10,
    titulo: 'Ecos de Papel',
    descripcion: 'Ensamblaje de recortes de prensa antigua y pintura para cuestionar la sobresaturación de información.',
    sala: 'Sala 5',
    fechaInicio: '20 de Enero 2027',
    fechaFin: '20 de Abril 2027',
    imagen: '/assets/sala5_prox.png',
    alt: 'Collage y técnica mixta con papel',
    artista: 'David Ruiz',
    añoCreacion: '2026',
    numeroObras: 40,
    tecnica: 'Ensamblaje de recortes de prensa, pintura acrílica y resina sobre madera',
    intencion: 'Cuestionar la sobresaturación de información. El artista recorta titulares reales de periódicos antiguos y los entrelaza con pintura para crear rostros distorsionados por las noticias.',
    horarios: 'Mar-Sáb 10:00 AM - 7:00 PM | Dom 11:00 AM - 5:00 PM'
  }
];

const Exposiciones = () => {
  const [salaSeleccionada, setSalaSeleccionada] = useState(null);

  if (salaSeleccionada) {
    return (
      <div className="bg-light min-vh-100 py-5">
        <div className="container">
          <button 
            className="btn btn-outline-secondary mb-4" 
            onClick={() => setSalaSeleccionada(null)}
          >
            <i className="bi bi-arrow-left me-2"></i>Volver a Exposiciones
          </button>
          
          <div className="card shadow-sm border-0 bg-white p-4 p-md-5">
            <div className="row g-5">
              <div className="col-12 col-lg-6">
                <img 
                  src={salaSeleccionada.imagen} 
                  alt={salaSeleccionada.alt} 
                  className="img-fluid rounded shadow-sm w-100 object-fit-cover"
                  style={{ maxHeight: '500px' }}
                />
              </div>
              <div className="col-12 col-lg-6 d-flex flex-column justify-content-center">
                <span className="badge bg-primary w-auto align-self-start mb-3 px-3 py-2">
                  {salaSeleccionada.sala}
                </span>
                <h2 className="display-6 fw-bold text-dark mb-3">{salaSeleccionada.titulo}</h2>
                <p className="fs-6 text-secondary mb-3">{salaSeleccionada.descripcion}</p>
                
                <div className="bg-light p-3 rounded mb-3 border">
                  <p className="mb-0 small text-dark"><strong>Intención artística:</strong> {salaSeleccionada.intencion}</p>
                </div>

                <div className="bg-light p-4 rounded mb-4 border">
                  <div className="row g-3">
                    <div className="col-6">
                      <span className="d-block fw-bold text-dark small">Artista / Colectivo</span>
                      <span className="text-secondary small">{salaSeleccionada.artista}</span>
                    </div>
                    <div className="col-6">
                      <span className="d-block fw-bold text-dark small">Año de Creación</span>
                      <span className="text-secondary small">{salaSeleccionada.añoCreacion}</span>
                    </div>
                    <div className="col-6">
                      <span className="d-block fw-bold text-dark small">Obras Exhibidas</span>
                      <span className="text-secondary small">{salaSeleccionada.numeroObras} piezas</span>
                    </div>
                    <div className="col-6">
                      <span className="d-block fw-bold text-dark small">Técnica</span>
                      <span className="text-secondary small">{salaSeleccionada.tecnica}</span>
                    </div>
                    <div className="col-12">
                      <span className="d-block fw-bold text-dark small">Fechas de Exhibición</span>
                      <span className="text-secondary small">{salaSeleccionada.fechaInicio} al {salaSeleccionada.fechaFin}</span>
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-center text-dark mb-4">
                  <i className="bi bi-clock-history fs-4 text-primary me-3"></i>
                  <div>
                    <span className="d-block fw-bold small">Horarios de visita</span>
                    <span className="small text-secondary">{salaSeleccionada.horarios}</span>
                  </div>
                </div>

                {/* Botón interactivo para planear visita */}
                <button 
                  onClick={() => { 
                    const linkVisitanos = document.querySelector('a[href*="visitanos"]') || document.querySelector('button');
                    if (linkVisitanos) linkVisitanos.click();
                  }} 
                  className="btn btn-primary rounded-pill w-100 py-2 shadow-sm"
                >
                  <i className="bi bi-calendar-check me-2"></i>Planea tu visita para esta sala
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5">
          <h1 className="display-5 fw-bold text-dark mb-3 mb-md-0">Nuestras Exposiciones</h1>
          <a href="#planea-visita" className="btn btn-outline-primary rounded-pill px-4">
            <i className="bi bi-geo-alt me-2"></i>Visítanos y Conoce las Salas
          </a>
        </div>

        <section className="mb-5">
          <h2 className="fs-4 text-primary mb-4 border-bottom pb-2">Calendario Actual</h2>
          <div className="row g-4">
            {exposicionesActuales.map((expo) => (
              <div key={expo.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 bg-white shadow-sm border-0">
                  <img 
                    src={expo.imagen} 
                    className="card-img-top object-fit-cover" 
                    alt={expo.alt} 
                    style={{ height: '200px' }} 
                  />
                  <div className="card-body d-flex flex-column">
                    <h3 className="fs-5 fw-bold text-dark">{expo.titulo}</h3>
                    <p className="text-secondary small mb-2">
                      <i className="bi bi-geo-alt-fill me-1"></i>{expo.sala}
                    </p>
                    <p className="small text-dark flex-grow-1">{expo.descripcion}</p>
                    <div className="mt-3 p-2 bg-light rounded text-center">
                      <span className="d-block fw-bold text-primary small">Abierta: {expo.fechaInicio}</span>
                      <span className="d-block text-secondary small">Hasta: {expo.fechaFin}</span>
                    </div>
                    <button 
                      className="btn btn-primary rounded-pill w-100 mt-3 small"
                      onClick={() => setSalaSeleccionada(expo)}
                    >
                      Ver detalles de la sala
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="fs-4 text-secondary mb-4 border-bottom pb-2">Próximas Exposiciones</h2>
          <div className="row g-4">
            {exposicionesProximas.map((expo) => (
              <div key={expo.id} className="col-12 col-md-6 col-lg-4">
                <div className="card h-100 bg-white shadow-sm border-0 opacity-75 hover-opacity-100 transition-opacity">
                  <img 
                    src={expo.imagen} 
                    className="card-img-top object-fit-cover grayscale" 
                    alt={expo.alt} 
                    style={{ height: '200px', filter: 'grayscale(30%)' }} 
                  />
                  <div className="card-body d-flex flex-column">
                    <h3 className="fs-5 fw-bold text-dark">{expo.titulo}</h3>
                    <p className="text-secondary small mb-2">
                      <i className="bi bi-door-open-fill me-1"></i>{expo.sala}
                    </p>
                    <p className="small text-dark flex-grow-1">{expo.descripcion}</p>
                    <div className="mt-3 p-2 bg-light rounded text-center border border-secondary border-opacity-25">
                      <span className="d-block fw-bold text-secondary small">Inicia: {expo.fechaInicio}</span>
                      <span className="d-block text-secondary small">Hasta: {expo.fechaFin}</span>
                    </div>
                    <button 
                      className="btn btn-outline-secondary rounded-pill w-100 mt-3 small"
                      onClick={() => setSalaSeleccionada(expo)}
                    >
                      Ver detalles de la sala
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Exposiciones;