import React from "react";


export const cursos = [
  {
    id: 1,
    nombre: "Pintura al óleo para principiantes",
    imagen: "https://images.unsplash.com/photo-1513364776144-60967b0f800f",
    descripcionImagen: "Clase de pintura al óleo",
    duracion: "8 semanas",
    docente: "Laura Martínez",
    tipo: "curso",
    categoria: "pintura",
  },
  {
    id: 2,
    nombre: "Escultura en arcilla",
    imagen: "",
    descripcionImagen: "Creación de una escultura en arcilla",
    duracion: "4 horas",
    docente: "Carlos Ramírez",
    tipo: "taller",
    categoria: "escultura",
  },
  {
    id: 3,
    nombre: "Fotografía artística",
    imagen: "",
    descripcionImagen: "Fotografía artística profesional",
    duracion: "6 semanas",
    docente: "Andrés Gómez",
    tipo: "curso",
    categoria: "fotografia",
  },
  {
    id: 4,
    nombre: "Introducción al dibujo",
    imagen: "",
    descripcionImagen: "Técnicas básicas de dibujo",
    duracion: "3 semanas",
    docente: "María Torres",
    tipo: "curso",
    categoria: "dibujo",
  },
  {
    id: 5,
    nombre: "Técnicas de acuarela",
    imagen: "",
    descripcionImagen: "Pintura realizada con acuarelas",
    duracion: "5 horas",
    docente: "Laura Martínez",
    tipo: "taller",
    categoria: "pintura",
  },
  {
    id: 6,
    nombre: "El arte de la fotografía",
    imagen: "",
    descripcionImagen: "Exposición sobre fotografía",
    duracion: "2 horas",
    docente: "Andrés Gómez",
    tipo: "charla",
    categoria: "fotografia",
  },
  {
    id: 7,
    nombre: "Dibujo de figura humana",
    imagen: "",
    descripcionImagen: "Dibujo de figura humana",
    duracion: "6 horas",
    docente: "María Torres",
    tipo: "taller",
    categoria: "dibujo",
  },
  {
    id: 8,
    nombre: "Historia de la escultura",
    imagen: "",
    descripcionImagen: "Esculturas artísticas",
    duracion: "1 hora y 30 minutos",
    docente: "Carlos Ramírez",
    tipo: "charla",
    categoria: "escultura",
  },
];

function Curso({
  imagen,
  descripcionImagen,
  nombre,
  descripcion,
  tipo,
  duracion,
  docente,
}) {
  return (
    <div className="card w-100 h-100 ">
      <img
        src={imagen}
        className="card-img-top object-fit-cover h-50"
        alt={descripcionImagen}
      ></img>
      <div className="card-body d-flex flex-column">
        <span className="badge bg-primary align-self-start mb-2">{tipo}</span>
        <h5 className="card-title fw-bold">{nombre}</h5>
        <p className="card-text text-muted">{descripcion}</p>
        <p className="card-text mb-1">
          <strong>Duración:</strong> {duracion}
        </p>
        <p className="card-text mb-3">
          <strong>Docente:</strong> {docente}
        </p>
        <div className="mt-auto d-flex gap-2">
          <button className="btn btn-outline-primary flex-fill">
            Detalles
          </button>
          <button className="btn btn-primary flex-fill">Comprar</button>
        </div>
      </div>
    </div>
  );
}

function Filtro({
  opcion
}) {
  return (
                      <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="{opcion}"
                    />
                    <label className="form-check-label" htmlFor="{opcion}">
                      {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
                    </label>
                  </div> 
  );
}

export default function Cursos() {
  return (
    <div className="d-flex flex-column">
      <div className="bg-light position-relative">
        <img
          src="/assets/ImgInitialCursos.jpg"
          className="img-fluid object-fit-cover border rounded w-100"
          alt="Imagen de un hombre explicandole a una mujer de que manera pintar el cuadro que tiene en frente de ella"
          style={{ height: "50vh" }}
        ></img>
        <div className="position-absolute bg-dark bg-opacity-75 text-white bottom-0 start-0 text-start p-4">
          <h5>
            En Galería Matiz ofrecemos diversos cursos, talleres, entre otras
            experiencias en los cuales puedes participar.
          </h5>
        </div>
      </div>
      <div className="row" style={{ height: "25vh" }}>
        <div className="col-3 d-flex  flex-column align-items-center justify-content-center">
          <h2 className="text-dark">¿Qué quieres aprender</h2>
          <div className="d-flex flex-wrap gap-2">
            <button
              type="button"
              className="btn btn-outline-primary rounded-pill active"
              data-bs-toggle="button"
              aria-pressed="true"
            >
              Pintura
            </button>
            <button
              type="button"
              className="btn btn-outline-primary rounded-pill"
              data-bs-toggle="button"
              aria-pressed="true"
            >
              Dibujo
            </button>
            <button
              type="button"
              className="btn btn-outline-primary rounded-pill"
              data-bs-toggle="button"
              aria-pressed="true"
            >
              Escultura
            </button>
            <button
              type="button"
              className="btn btn-outline-primary rounded-pill"
              data-bs-toggle="button"
              aria-pressed="true"
            >
              Fotografía
            </button>
          </div>
        </div>

        <div className="col-9 d-flex align-items-center">
          <button
            className="btn p-0 border-0 "
            type="button"
            data-bs-target="#carousel"
            data-bs-slide="prev"
          >
            <i className="bi bi-arrow-left-circle-fill fs-2"></i>
          </button>
          <div
            id="carousel"
            className="carousel slide flex-grow-1 "
            data-bs-theme="dark"
          >
            <div className="carousel-indicators">
              <button
                className="active"
                type="button"
                data-bs-target="#carousel"
                data-bs-slide-to="0"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="row row-cols-1 row-cols-xl-3 g-3 p-2">
                  <div className="col">
                    <Curso />
                  </div>
                  <div className="col">
                    <Curso />
                  </div>
                  <div className="col">
                    <Curso />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            className="btn p-0 border-0 "
            type="button"
            data-bs-target="#carousel"
            data-bs-slide="next"
          >
            <i className="bi bi-arrow-right-circle-fill fs-2"></i>
          </button>
        </div>
      </div>
      <div className="bg-dark bg-opacity-75 w-50 text-white  p-4 d-flex flex-row align-items-center justify-content-center align-self-center gap-3 ">
        <h5>Encuentra tu curso ideal.</h5>
        <button
          className="btn p-0 border-0 "
          type="button"
          onClick={() => {
            document.getElementById("filtros").scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          <i className="bi bi-arrow-down-circle-fill fs-2"></i>
        </button>
      </div>

      <section id="filtros" className="container ">
        <div className="row g-4">
          <aside className="col-12 col-lg-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-4">
                  <i className="bi bi-funnel"></i>
                  Filtros de búsqueda
                </h5>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Buscar curso</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre del curso..."
                  />
                </div>

                <div className="mb-4 d-flex flex-column align-items-start">
                  <label className="form-label fw-semibold">Categoría</label>
                  {["pintura","dibujo","escultura","fotografía"].map(opcion =>{
                    return (
                      <Filtro opcion={opcion}/>
                    );
                  })}
                </div>
                <div className="mb-4 d-flex flex-column align-items-start">
                  <label className="form-label fw-semibold">Tipo</label>
                  {["curso","taller","charla"].map(opcion =>{
                    return (
                      <Filtro opcion={opcion}/>
                    );
                  })}
                </div>

                <div className="mb-4 d-flex flex-column align-items-start">
                  <label className="form-label fw-semibold">Duración</label>

                  <select className="form-select">
                    <option value="">Todas las duraciones</option>
                    <option value="-10">Menos de 10 horas</option>
                    <option value="30">10 - 30 horas</option>
                    <option value="30+">Más de 30 horas</option>
                  </select>
                </div>

                <div className="mb-4 d-flex flex-column align-items-start">
                  <label className="form-label fw-semibold">Modalidad</label>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="modalidad"
                      id="todos"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="todos">
                      Todas
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="modalidad"
                      id="presencial"
                    />
                    <label className="form-check-label" htmlFor="presencial">
                      Presencial
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="modalidad"
                      id="virtual"
                    />
                    <label className="form-check-label" htmlFor="virtual">
                      Virtual
                    </label>
                  </div>
                </div>

                <button className="btn btn-primary w-100">
                  Aplicar filtros
                </button>

                <button className="btn btn-outline-secondary w-100 mt-2">
                  Limpiar filtros
                </button>
              </div>
            </div>
          </aside>

          <div className="col-12 col-lg-9">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
              <div>
                <h3 className="mb-1">Explorar cursos</h3>
                <p className="text-secondary mb-0">
                  Encuentra el curso ideal para ti
                </p>
              </div>

              <select className="form-select w-auto">
                <option>Más recientes</option>
                <option>Nombre A-Z</option>
                <option>Nombre Z-A</option>
              </select>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
            
              {cursos.map((curso) => {
                const {
                  id,
                  nombre,
                  imagen,
                  descripcionImagen,
                  duracion,
                  docente,
                  tipo,
                  categoria,
                } = curso;
                return(
                <div className="col" key={id}>
                <Curso
                  nombre={nombre}
                  imagen={imagen}
                  descripcionImagen={descripcionImagen}
                  duracion={duracion}
                  docente={docente}
                  tipo={tipo}
                  categoria={categoria}
                />
                </div>)
              })}

            </div>
              <nav aria-label="..." className="d-flex justify-content-center mt-4" >
              <ul className="pagination pagination-lg ">
                <li className="page-item active">
                  <a className="page-link" aria-current="page">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
}
