import React from 'react';

const exposicionesActuales = [
  {
    id: 1,
    titulo: 'Matices Urbanos',
    descripcion: 'Una muestra contemporánea de 15 artistas locales enfocada en la vida cotidiana de Bogotá.',
    sala: 'Sala Principal',
    fechaInicio: '15 de Octubre 2026',
    fechaFin: '15 de Noviembre 2026',
    imagen: 'imagen',
    alt: 'Pintura urbana representando calles de Bogotá'
  },
  {
    id: 2,
    titulo: 'Pinceladas del Alma',
    descripcion: 'Colección de óleos sobre lienzo que exploran las emociones humanas a través del expresionismo.',
    sala: 'Sala 2',
    fechaInicio: '1 de Octubre 2026',
    fechaFin: '31 de Octubre 2026',
    imagen: 'imagen',
    alt: 'Obra expresionista al óleo con colores cálidos'
  },
  {
    id: 3,
    titulo: 'Geometría del Color',
    descripcion: 'Exploración visual de formas abstractas y su interacción con la luz natural.',
    sala: 'Sala 3',
    fechaInicio: '10 de Octubre 2026',
    fechaFin: '15 de Noviembre 2026',
    imagen: 'imagen',
    alt: 'Cuadro abstracto con figuras geométricas'
  },
  {
    id: 4,
    titulo: 'Retratos Olvidados',
    descripcion: 'Fotografía en blanco y negro rescatada de los archivos históricos de la ciudad.',
    sala: 'Sala 4',
    fechaInicio: '5 de Septiembre 2026',
    fechaFin: '5 de Noviembre 2026',
    imagen: 'imagen',
    alt: 'Fotografía antigua en blanco y negro de un rostro'
  },
  {
    id: 5,
    titulo: 'Naturaleza Viva',
    descripcion: 'Paisajismo inmersivo que invita a reconectar con los entornos rurales colombianos.',
    sala: 'Sala 5',
    fechaInicio: '20 de Septiembre 2026',
    fechaFin: '20 de Diciembre 2026',
    imagen: 'imagen',
    alt: 'Pintura realista de un paisaje natural colombiano'
  }
];

const exposicionesProximas = [
  {
    id: 6,
    titulo: 'Esculturas Contemporáneas',
    descripcion: 'Intervención de espacios tridimensionales utilizando materiales reciclados y bronce.',
    sala: 'Sala Principal',
    fechaInicio: 'Próximo mes',
    fechaFin: 'Por definir',
    imagen: 'imagen',
    alt: 'Escultura moderna hecha con bronce y metal'
  },
  {
    id: 7,
    titulo: 'Ecos del Pasado',
    descripcion: 'Restauraciones de arte clásico colonial del siglo XVIII.',
    sala: 'Sala 2',
    fechaInicio: '15 de Noviembre 2026',
    fechaFin: '15 de Enero 2027',
    imagen: 'imagen',
    alt: 'Pintura colonial restaurada'
  },
  {
    id: 8,
    titulo: 'Visiones del Futuro',
    descripcion: 'Exposición interactiva de arte digital y proyecciones holográficas.',
    sala: 'Sala 3',
    fechaInicio: '20 de Noviembre 2026',
    fechaFin: '20 de Febrero 2027',
    imagen: 'imagen',
    alt: 'Instalación de luces de neón y arte digital'
  },
  {
    id: 9,
    titulo: 'Luz y Sombra',
    descripcion: 'Estudio fotográfico sobre el contraste y la iluminación en espacios cerrados.',
    sala: 'Sala 4',
    fechaInicio: '1 de Diciembre 2026',
    fechaFin: '28 de Febrero 2027',
    imagen: 'imagen',
    alt: 'Fotografía jugando con alto contraste de luz'
  },
  {
    id: 10,
    titulo: 'Raíces',
    descripcion: 'Homenaje a las técnicas de tejido y cerámica de comunidades indígenas.',
    sala: 'Sala 5',
    fechaInicio: '10 de Enero 2027',
    fechaFin: '10 de Marzo 2027',
    imagen: 'imagen',
    alt: 'Cerámica indígena tradicional con patrones geométricos'
  }
];

const Exposiciones = () => {
  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        <h1 className="display-5 fw-bold text-dark text-center mb-5">Nuestras Exposiciones</h1>

        <section className="mb-5">
          <h2 className="fs-3 text-primary mb-4 border-bottom pb-2">Calendario Actual</h2>
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
                    <h3 className="fs-4 fw-bold text-dark">{expo.titulo}</h3>
                    <p className="text-secondary small mb-2">
                      <i className="bi bi-geo-alt-fill me-1"></i>{expo.sala}
                    </p>
                    <p className="lead fs-6 text-dark flex-grow-1">{expo.descripcion}</p>
                    <div className="mt-3 p-3 bg-light rounded text-center">
                      <span className="d-block fw-bold text-primary">Abierta: {expo.fechaInicio}</span>
                      <span className="d-block text-secondary small">Hasta: {expo.fechaFin}</span>
                    </div>
                    <button className="btn btn-primary rounded-pill w-100 mt-3">
                      Ver detalles de la sala
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="fs-3 text-secondary mb-4 border-bottom pb-2">Próximas Exposiciones</h2>
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
                    <h3 className="fs-4 fw-bold text-dark">{expo.titulo}</h3>
                    <p className="text-secondary small mb-2">
                      <i className="bi bi-door-open-fill me-1"></i>{expo.sala}
                    </p>
                    <p className="text-dark flex-grow-1">{expo.descripcion}</p>
                    <div className="mt-3 p-3 bg-light rounded text-center border border-secondary border-opacity-25">
                      <span className="d-block fw-bold text-secondary">Inicia: {expo.fechaInicio}</span>
                    </div>
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