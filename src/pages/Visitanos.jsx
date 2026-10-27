export default function Visitanos() {
  return (
    <div className="bg-light p-4">
      <h1 className="display-5 fw-bold text-dark mb-4 text-center">Visítanos</h1>
      
      {/* Sección 1: Horarios y Precios */}
      <div className="bg-white shadow-sm rounded p-4 mb-4">
        <h2 className="fs-3 text-primary mb-4">Horarios y Precios</h2>
        <div className="row">
          <div className="col-md-6">
            <h3 className="fs-5 fw-bold">Horarios de Apertura</h3>
            <ul className="lead">
              <li>Martes a Sábado: 10:00 AM - 7:00 PM</li>
              <li>Domingos y Festivos: 11:00 AM - 5:00 PM</li>
            </ul>
          </div>
          <div className="col-md-6">
            <h3 className="fs-5 fw-bold">Tarifas y Descuentos</h3>
            <ul className="lead">
              <li>Entrada General: $15.000 COP</li>
              <li>Estudiantes y Tercera Edad: $10.000 COP</li>
              <li>Niños menores de 12 años: Gratis</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sección 2: Ubicación y Parqueaderos */}
      <div className="bg-white shadow-sm rounded p-4 mb-4">
        <h2 className="fs-3 text-primary mb-3">Ubicación y Llegada</h2>
        <p className="lead">Encuéntranos en la Av. Calle 26 # 70-40, Bogotá, Colombia.</p>
        <p><strong>Parqueaderos cercanos:</strong> Contamos con convenio en el parqueadero del edificio central (20% de descuento sellando tu ticket en nuestra taquilla).</p>
        
        <div className="bg-light border rounded d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
          <p className="text-muted">Espacio reservado para el mapa interactivo</p>
        </div>
      </div>

      {/* Sección 3: Reservas y Exposiciones */}
      <div className="bg-white shadow-sm rounded p-4 mb-4">
        <div className="row">
          <div className="col-md-6">
            <h2 className="fs-3 text-primary mb-3">Visitas Grupales</h2>
            <p className="lead">Ofrecemos recorridos guiados para colegios, universidades y empresas.</p>
            <button className="btn btn-primary rounded-pill">Reservar visita grupal</button>
          </div>
          <div className="col-md-6 mt-4 mt-md-0">
            <h2 className="fs-3 text-primary mb-3">Calendario de Exposiciones</h2>
            <ul className="lead">
              <li><strong>Actual:</strong> "Pinceladas del Alma" (Hasta fin de mes)</li>
              <li><strong>Próxima:</strong> "Esculturas Contemporáneas" (Próximo mes)</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}