import React, { useState, useEffect } from 'react';
import equipoData from '../../data/equipo.json';
const SobreNosotros = () => {
  const [integrantes, setIntegrantes] = useState([]);
  const [devSeleccionado, setDevSeleccionado] = useState(null);

  useEffect(() => {
    setIntegrantes(equipoData);
  }, []);

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        
        {/* ENCABEZADO */}
        <div className="text-center mb-5">
          <span className="badge bg-primary px-3 py-2 rounded-pill mb-2">Nuestra Esencia</span>
          <h1 className="display-5 fw-bold text-dark">Sobre Galería Matiz</h1>
          <p className="text-secondary mx-auto" style={{ maxWidth: '600px' }}>
            Un espacio donde la tecnología y el arte convergen para acercar la cultura a cada rincón.
          </p>
        </div>

        {/* SECCIÓN EN ZIGZAG: HISTORIA, MISIÓN, VISIÓN Y OBJETIVO */}
        <div className="d-flex flex-column gap-5 mb-5">
          
          {/* BLOQUE 1: Historia (Texto Izquierda / Imagen Derecha) */}
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-6">
              <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border-start border-primary border-4 h-100 d-flex flex-column justify-content-center">
                <span className="text-primary fw-bold small text-uppercase">Nuestros Inicios</span>
                <h2 className="fs-3 fw-bold text-dark mt-1 mb-3">De un proyecto universitario a la realidad</h2>
                <p className="text-secondary mb-0">
                  Galería Matiz nació en las aulas universitarias como una propuesta académica de ingeniería y diseño de software. Lo que empezó como maquetas conceptuales y diagramas de arquitectura en código se transformó en una plataforma real y funcional. Decidimos romper el molde tradicional de los museos cerrados para construir un puente digital inclusivo entre los artistas locales y el público general.
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="ratio ratio-16x9 bg-white rounded-4 shadow-sm border overflow-hidden d-flex align-items-center justify-content-center position-relative">
                <img 
                  src="/assets/sobreNosotros/historia.png"
                  alt="Inicios de la Galería" 
                  className="w-100 h-100 object-fit-cover position-relative z-1"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="position-absolute text-center p-3 text-muted">
                  <i className="bi bi-image fs-1 d-block mb-2"></i>
                  <span>Sube tu foto como <code className="text-primary">/assets/sobreNosotros/historia.png</code></span>
                </div>
              </div>
            </div>
          </div>

          {/* BLOQUE 2: Misión (Imagen Izquierda / Texto Derecha - ZIGZAG) */}
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-6 order-lg-1 order-2">
              <div className="ratio ratio-16x9 bg-white rounded-4 shadow-sm border overflow-hidden d-flex align-items-center justify-content-center position-relative">
                <img 
                  src="/assets/sobreNosotros/mision.png" 
                  alt="Misión Galería Matiz" 
                  className="w-100 h-100 object-fit-cover position-relative z-1"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="position-absolute text-center p-3 text-muted">
                  <i className="bi bi-image fs-1 d-block mb-2"></i>
                  <span>Sube tu foto como <code className="text-primary">/assets/sobreNosotros/mision.png</code></span>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 order-lg-2 order-1">
              <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border-start border-primary border-4 h-100 d-flex flex-column justify-content-center">
                <span className="text-primary fw-bold small text-uppercase">Propósito</span>
                <h2 className="fs-3 fw-bold text-dark mt-1 mb-3">Nuestra Misión</h2>
                <p className="text-secondary mb-0">
                  Democratizar el acceso al arte rompiendo barreras técnicas y elitistas mediante narrativas visuales dinámicas, experiencias de aprendizaje que promueven el bienestar social y una plataforma de comercio electrónico transparente y confiable.
                </p>
              </div>
            </div>
          </div>

          {/* BLOQUE 3: Visión (Texto Izquierda / Imagen Derecha) */}
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-6">
              <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border-start border-primary border-4 h-100 d-flex flex-column justify-content-center">
                <span className="text-primary fw-bold small text-uppercase">Futuro</span>
                <h2 className="fs-3 fw-bold text-dark mt-1 mb-3">Nuestra Visión</h2>
                <p className="text-secondary mb-0">
                  Para el año 2031, ser la plataforma web e institución cultural referente en la apropiación social del arte para audiencias no expertas en Colombia, consolidando un ecosistema digital intuitivo y seguro.
                </p>
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="ratio ratio-16x9 bg-white rounded-4 shadow-sm border overflow-hidden d-flex align-items-center justify-content-center position-relative">
                <img 
                  src="/assets/sobreNosotros/vision.png" 
                  alt="Visión Galería Matiz" 
                  className="w-100 h-100 object-fit-cover position-relative z-1"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="position-absolute text-center p-3 text-muted">
                  <i className="bi bi-image fs-1 d-block mb-2"></i>
                  <span>Sube tu foto como <code className="text-primary">/assets/sobreNosotros/vision.png</code></span>
                </div>
              </div>
            </div>
          </div>

          {/* BLOQUE 4: Objetivo (Imagen Izquierda / Texto Derecha - ZIGZAG) */}
          <div className="row align-items-center g-4">
            <div className="col-12 col-lg-6 order-lg-1 order-2">
              <div className="ratio ratio-16x9 bg-white rounded-4 shadow-sm border overflow-hidden d-flex align-items-center justify-content-center position-relative">
                <img 
                  src="/assets/sobreNosotros/objetivo.png" 
                  alt="Objetivo del Sitio" 
                  className="w-100 h-100 object-fit-cover position-relative z-1"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div className="position-absolute text-center p-3 text-muted">
                  <i className="bi bi-image fs-1 d-block mb-2"></i>
                  <span>Sube tu foto como <code className="text-primary">/assets/sobreNosotros/objetivo.png</code></span>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-6 order-lg-2 order-1">
              <div className="bg-white p-4 p-md-5 rounded-4 shadow-sm border-start border-primary border-4 h-100 d-flex flex-column justify-content-center">
                <span className="text-primary fw-bold small text-uppercase">Meta</span>
                <h2 className="fs-3 fw-bold text-dark mt-1 mb-3">Objetivo del Sitio</h2>
                <p className="text-secondary mb-0">
                  Facilitar el acceso a la agenda cultural y formativa de la galería mediante una navegación intuitiva, impulsando la educación artística inclusiva y un e-commerce transparente que conecta de forma segura a los creadores con los visitantes.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* SECCIÓN DEL EQUIPO DE DESARROLLADORES */}
        <div className="text-center mb-4 pt-4 border-top">
          <span className="badge bg-primary px-3 py-2 rounded-pill mb-2">Talento Humano</span>
          <h2 className="fs-2 text-dark fw-bold">Equipo de Desarrollo</h2>
          <p className="text-secondary">Conoce a las mentes creativas detrás de la arquitectura y programación de Galería Matiz.</p>
        </div>

        {/* TARJETAS DE INTEGRANTES */}
        <div className="row g-4 justify-content-center">
          {integrantes.map((dev) => (
            <div key={dev.id} className="col-12 col-md-4">
              <div className="card h-100 bg-white shadow-sm border-0 text-center p-4 rounded-4">
                <img 
                  src={dev.foto} 
                  alt={dev.alt} 
                  className="rounded-circle mx-auto mb-3 object-fit-cover shadow-sm border border-3 border-light"
                  style={{ width: '130px', height: '130px' }}
                />
                <h3 className="fs-5 fw-bold text-dark mb-1">{dev.nombre}</h3>
                <p className="text-primary small fw-semibold mb-3">{dev.rol}</p>
                
                <div className="mt-auto">
                  <button 
                    type="button"
                    onClick={() => setDevSeleccionado(dev)}
                    className="btn bg-white text-primary border border-primary px-4 py-2 rounded-pill fw-bold shadow-sm w-100"
                    style={{ transition: 'all 0.3s' }}
                    onMouseEnter={(e)=>{e.target.style.backgroundColor='#0d6efd';e.target.style.color='#fff';}}
                    onMouseLeave={(e)=>{e.target.style.backgroundColor='#fff';e.target.style.color='#0d6efd';}}
                  >
                    Conóceme más
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* VENTANA EMERGENTE (MODAL) DE CADA DESARROLLADOR */}
        {devSeleccionado && (
          <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content border-0 shadow-lg p-3 rounded-4">
                <div className="modal-header border-0 pb-0">
                  <h4 className="fw-bold text-dark m-0">Perfil Profesional</h4>
                  <button type="button" className="btn-close" onClick={() => setDevSeleccionado(null)}></button>
                </div>
                <div className="modal-body py-4">
                  <div className="row align-items-center g-4">
                    <div className="col-12 col-md-4 text-center">
                      <img 
                        src={devSeleccionado.foto} 
                        alt={devSeleccionado.alt} 
                        className="rounded-circle shadow-sm border border-3 border-primary mb-3 object-fit-cover"
                        style={{ width: '140px', height: '140px' }}
                      />
                      <h5 className="fw-bold text-dark mb-1">{devSeleccionado.nombre}</h5>
                      <span className="badge bg-primary mb-2">{devSeleccionado.rol}</span>
                    </div>
                    <div className="col-12 col-md-8">
                      <p className="text-secondary small mb-2">
                        <strong>Descripción:</strong> {devSeleccionado.descripcion}
                      </p>
                      <p className="text-secondary small mb-3">
                        <strong>Enfoque en el proyecto:</strong> {devSelectorSiNoNull(devSeleccionado.enfoque)}
                      </p>
                      <div className="bg-light p-3 rounded-3 border">
                        <p className="text-dark small mb-1">
                          <i className="bi bi-whatsapp me-2 text-success"></i> <strong>Celular:</strong> {devSeleccionado.celular}
                        </p>
                        <p className="text-dark small mb-0">
                          <i className="bi bi-envelope me-2 text-primary"></i> <strong>Correo:</strong> {devSeleccionado.correo}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer border-0 pt-0">
                  <button type="button" className="btn btn-secondary rounded-pill px-4" onClick={() => setDevSeleccionado(null)}>Cerrar</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

const devSelectorSiNoNull = (val) => val || '';

export default SobreNosotros;