import React from 'react';

const SobreNosotros = () => {
  const integrantes = [
    { id: 1, nombre: 'Sanyela Rodríguez', rol: 'Desarrolladora', celular: '+57 304 4237 383', foto: '/assets/FotoSanyela.png', alt: 'Foto de Sanyela' },
    { id: 2, nombre: 'Ricardo Gomez', rol: 'Desarrollador', celular: '+57 312 8800 618', foto: '/assets/FotoRicardo.png', alt: 'Foto de Ricardo' },
    { id: 3, nombre: 'Yudy Benavides', rol: 'Desarrolladora', celular: '+57 315 0116 988', foto: '/assets/FotoYudy.png', alt: 'Foto de Yudy' }
  ];

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        
        <div className="mb-5">
          <h1 className="display-5 fw-bold text-dark m-0">Sobre Nosotros</h1>
        </div>

        {/* Sección Misión, Visión y Objetivos */}
        <div className="row g-4 mb-5">
          <div className="col-12 col-md-4">
            <div className="card h-100 bg-white shadow-sm border-0 p-4">
              <h2 className="fs-4 text-primary fw-bold mb-3">Nuestra Misión</h2>
              <p className="small text-secondary mb-0">
                Galería Matiz es un espacio cultural y pedagógico inclusivo que democratiza el acceso al arte. Rompemos las barreras del lenguaje técnico y el elitismo tradicional a través de narrativas visuales dinámicas, experiencias de aprendizaje que promueven el bienestar social y una plataforma de comercio electrónico transparente y confiable. Conectamos a artistas locales y globales con el ciudadano del común, transformando la contemplación del arte en una experiencia cotidiana, cercana y enriquecedora.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card h-100 bg-white shadow-sm border-0 p-4">
              <h2 className="fs-4 text-primary fw-bold mb-3">Nuestra Visión</h2>
              <p className="small text-secondary mb-0">
                Para el año 2031, Galería Matiz será reconocida como la plataforma web e institución cultural referente en la divulgación y apropiación social del arte para audiencias no expertas en Colombia. Consolidaremos un ecosistema digital responsive e intuitivo, donde la innovación en formatos multimedia didácticos y la seguridad transaccional inspiren confianza en nuevos coleccionistas y entusiastas del arte.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card h-100 bg-white shadow-sm border-0 p-4">
              <h2 className="fs-4 text-primary fw-bold mb-3">Objetivo del Sitio</h2>
              <p className="small text-secondary mb-0">
                 Facilitar el acceso a la agenda cultural y formativa de la galería mediante una navegación intuitiva, impulsando la educación artística inclusiva y un e-commerce transparente que conecta de forma segura a los creadores con los visitantes.
              </p>
            </div>
          </div>
        </div>

        {/* Sección del Equipo de Desarrolladores */}
        <div className="mb-4 border-bottom pb-2">
          <h2 className="fs-3 text-dark fw-bold m-0">Equipo de Desarrollo</h2>
        </div>

        {/* Tarjetas de los Integrantes */}
        <div className="row g-4">
          {integrantes.map((dev) => (
            <div key={dev.id} className="col-12 col-md-4">
              <div className="card h-100 bg-white shadow-sm border-0 text-center p-4">
                <img 
                  src={dev.foto} 
                  alt={dev.alt} 
                  className="rounded-circle mx-auto mb-3 object-fit-cover shadow-sm"
                  style={{ width: '120px', height: '120px' }}
                />
                <h3 className="fs-5 fw-bold text-dark mb-1">{dev.nombre}</h3>
                <p className="text-primary small mb-2">{dev.rol}</p>
                <p className="text-secondary small mb-0">
                  <i className="bi bi-whatsapp me-1 text-success"></i> {dev.celular}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SobreNosotros;