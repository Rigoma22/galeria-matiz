import React, { useState, useEffect } from "react";
import { obtenerCursoPorId, obtenerCursos } from "../services/cursoService";
import { Modal, Button } from "react-bootstrap";

function Curso({
  id,
  imagen,
  descripcionImagen,
  nombre,
  descripcion,
  tipo,
  duracion,
  docente,
  verDetalle,
  nivel,
  fechaInicio,
}) {
  return (
    <div className="card w-100 h-100">
      <img
        src={imagen}
        className="card-img-top"
        style={{ height: "100px", objectFit: "cover" }}
        alt={descripcionImagen}
      />
      <div className="card-body d-flex flex-column gap-0">
        <h6 className="card-title fw-bold">{nombre}</h6>
        <div className="d-flex flex-row gap-2">
          <span className="badge bg-primary align-self-start mb-1">{tipo}</span>
          <span className="badge bg-secondary align-self-start mb-1">
            {nivel}
          </span>
        </div>
        <p className="card-text mb-0 mt-auto">
          <strong>Duración:</strong> {duracion} horas
        </p>
        <p className="card-text mb-0 mt-auto">
          <strong>Fecha inicio:</strong> {fechaInicio}
        </p>
        <p className="card-text mb-1 mt-auto">
          <strong>Docente:</strong> {docente}
        </p>
        <div className="mt-auto d-flex gap-2">
          <button
            className="btn btn-outline-primary flex-fill box-shadow"
            onClick={() => verDetalle(id)}
          >
            Detalles
          </button>
          <button className="btn btn-primary flex-fill box-shadow">
            Inscribirse
          </button>
        </div>
      </div>
    </div>
  );
}

function Filtro({ opcion, setFiltro, seccion, marcados }) {
  return (
    <div className="form-check">
      <input
        className="form-check-input"
        name={seccion}
        type="checkbox"
        value={opcion}
        id={`${seccion}-${opcion}`}
        onChange={(e) => {
          const valor = e.target.value
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

          setFiltro((prev) =>
            e.target.checked
              ? [...prev, valor]
              : prev.filter((item) => item !== valor),
          );
        }}
        checked={marcados.includes(
          opcion
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""),
        )}
      />
      <label className="form-check-label" htmlFor={`${seccion}-${opcion}`}>
        {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
      </label>
    </div>
  );
}

const Paginacion = ({
  cursosPorPagina,
  totalCursos,
  paginar,
  paginaActual = 1,
}) => {
  const numeroPaginas = [];

  for (let i = 1; i <= Math.ceil(totalCursos / cursosPorPagina); i++) {
    numeroPaginas.push(i);
  }

  return (
    <nav
      aria-label="Paginación"
      className="d-flex justify-content-center bottom py-3 border-top"
    >
      <ul className="pagination pagination-lg">
        {numeroPaginas.map((numero) => {
          return (
            <li
              className={`page-item  ${paginaActual == numero ? "active" : ""}`}
              key={numero}
            >
              <a
                className="page-link"
                href="#!"
                aria-current="page"
                onClick={() => paginar(numero)}
              >
                {numero}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

function CursoDetalle({ detalleCurso, show, onHide }) {
  if (!detalleCurso) {
    return null;
  }
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton className="py-2">
        <Modal.Title id="contained-modal-title-vcenter">
          {detalleCurso.nombre}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row g-3">
          <div className="col-12">
            <img
              src={detalleCurso.imagen}
              alt={detalleCurso.descripcionImagen}
              className="img-fluid rounded w-100"
              style={{ maxHeight: "250px", objectFit: "cover" }}
            />
          </div>
          <div className="col-12">
            <span className="badge bg-primary mb-1 g-2 me-1">
              {detalleCurso.tipo}
            </span>
            <span className="badge bg-secondary mb-1 me-1">
              {detalleCurso.nivel}
            </span>
            <h5 className="fw-bold">Descripción</h5>
            <p className="text-muted">{detalleCurso.descripcion}</p>
          </div>
          <div className="col-md-6">
            <p className="mb-1">
              <strong>Categoría:</strong> {detalleCurso.categoria}
            </p>
            <p className="mb-1">
              <strong>Duración:</strong> {detalleCurso.duracion} horas
            </p>
            <p className="mb-1">
              <strong>Docente:</strong> {detalleCurso.docente}
            </p>
          </div>
          <div className="col-md-6">
            <p className="mb-1">
              <strong>Modalidad:</strong> {detalleCurso.modalidad}
            </p>
            <p className="mb-1">
              <strong>Precio:</strong> ${detalleCurso.precio}
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="py-1">
        <Button onClick={onHide}>Cerrar</Button>
        <Button variant="primary">Inscribirse</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function Cursos() {
  // Estados principales
  const [cursosData, setCursos] = useState([]);
  const [cursosFiltrados, setCursosFiltrados] = useState([]);
  const [valorEntrada, setValorBusqueda] = useState("");

  // Estados de filtros
  const [filtroCategoria, setFiltroCategoria] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState([]);
  const [filtroDuracion, setFiltroDuracion] = useState("Todos");
  const [filtroModalidad, setFiltroModalidad] = useState([]);
  const [filtroNivel, setFiltroNivel] = useState([]);

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const [cursosPorPagina, setCursosPorPagina] = useState(9);

  const indiceUltimoCurso = paginaActual * cursosPorPagina;
  const indicePrimerCurso = indiceUltimoCurso - cursosPorPagina;
  const cursosActuales =
    cursosFiltrados.slice(indicePrimerCurso, indiceUltimoCurso) || [];

  // Detalle curso
  const [detalleCurso, setDetalleCurso] = useState(null);
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  //Carrusel
  const [categoriaCarrusel, setCategoriaCarrusel] = useState(["pintura"]);
  //Orden
  const [ordenLista, setOrdenLista] = useState("lasts");

  useEffect(() => {
    const cargarCursos = async () => {
      const cursos = await obtenerCursos();
      setCursos(cursos);
      setCursosFiltrados(cursos);
    };
    cargarCursos();
  }, []);

  const paginar = (numeroPagina) => setPaginaActual(numeroPagina);

  const buscarCurso = (valor) => {
    setValorBusqueda(valor);
    aplicarFiltros(valor);
  };

  const aplicarFiltros = (valor = valorEntrada) => {
    console.log("Aplicando filtros:", {
      filtroCategoria,
      filtroTipo,
      filtroDuracion,
      filtroModalidad,
    });

    const cursosFiltrados = cursosData.filter((curso) => {
      const categoriaCoincide =
        filtroCategoria.length === 0 ||
        filtroCategoria.includes(
          curso.categoria
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""),
        );

      const tipoCoincide =
        filtroTipo.length === 0 ||
        filtroTipo.includes(
          curso.tipo
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""),
        );

      const duracionCoincide =
        filtroDuracion === "" ||
        filtroDuracion === "Todos" ||
        (filtroDuracion === "-10" && curso.duracion < 10) ||
        (filtroDuracion === "30" &&
          curso.duracion >= 10 &&
          curso.duracion <= 30) ||
        (filtroDuracion === "30+" && curso.duracion > 30);

      const modalidadCoincide =
        filtroModalidad.length === 0 ||
        filtroModalidad.includes(
          curso.modalidad
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""),
        );

      const textoCoincide = curso.nombre
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .includes(
          valor
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""),
        );

      const nivelCoincide =
        filtroNivel.length === 0 ||
        filtroNivel.includes(
          curso.nivel
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, ""),
        );

      return (
        categoriaCoincide &&
        tipoCoincide &&
        duracionCoincide &&
        modalidadCoincide &&
        textoCoincide &&
        nivelCoincide
      );
    });

    setCursosFiltrados(cursosFiltrados);
  };

  const limpiarFiltros = () => {
    setFiltroCategoria([]);
    setFiltroTipo([]);
    setFiltroDuracion("Todos");
    setFiltroModalidad([]);
    setFiltroNivel([]);
    setValorBusqueda("");
    setCursosFiltrados(cursosData);
  };

  const verDetalle = async (id) => {
    const curso = await obtenerCursoPorId(id);
    setDetalleCurso(curso);
    setMostrarDetalle(true);
  };

  const cursosFiltradosCarrusel = cursosData.filter((curso) => {
    return (
      categoriaCarrusel.length === 0 ||
      categoriaCarrusel.includes(
        curso.categoria
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, ""),
      )
    );
  });

  const [cursosPorSlide, setCursosPorSlide] = useState(3);
  const cursosCarrusel = [];
  for (let i = 0; i < cursosFiltradosCarrusel.length; i += cursosPorSlide) {
    cursosCarrusel.push(cursosFiltradosCarrusel.slice(i, i + cursosPorSlide));
  }
  useEffect(() => {
    const carousel = document.getElementById("carousel");

    if (carousel && window.bootstrap) {
      const instancia = window.bootstrap.Carousel.getOrCreateInstance(carousel);

      instancia.to(0);
    }
  }, [categoriaCarrusel]);

  const seleccionarCategoriaCarrusel = (categoria) => {
    const normalizado = categoria
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    setCategoriaCarrusel((prev) =>
      prev.includes(normalizado)
        ? prev.filter((c) => c !== normalizado)
        : [...prev, normalizado],
    );
  };

  const ordenarLista = (opcion) => {
    if (opcion == "A-Z") {
      setCursosFiltrados(
        [...cursosFiltrados].sort((a, b) => a.nombre.localeCompare(b.nombre)),
      );
    }
    if (opcion == "Z-A") {
      setCursosFiltrados(
        [...cursosFiltrados].sort((a, b) => b.nombre.localeCompare(a.nombre)),
      );
    } else {
      setCursosFiltrados([...cursosFiltrados].sort((a, b) => b.id - a.id));
    }
  };

  useEffect(() => {
    const manejarReajuste = () => {
      if (window.innerWidth < 770) {
        setCursosPorSlide(1);
      } else if (window.innerWidth < 1200) {
        setCursosPorSlide(2);
      } else {
        setCursosPorSlide(3);
      }
    };
    window.addEventListener("resize", manejarReajuste);
    return () => {
      window.removeEventListener("resize", manejarReajuste);
    };
  });

  return (
    <div className="d-flex flex-column">
      {/* Banner Principal */}
      <div className="bg-light position-relative">
        <img
          src="/assets/ImgInitialCursos.jpg"
          className="img-fluid object-fit-cover border rounded w-100"
          alt="Imagen de un hombre explicandole a una mujer de que manera pintar el cuadro que tiene en frente de ella"
          style={{ height: "32vh", minHeight: "190px" }}
        />
        <div className="position-absolute bg-dark bg-opacity-75 text-white bottom-0 start-0 text-start p-2 p-md-4 w-100">
          <h5>
            En Galería Matiz ofrecemos diversos cursos, talleres, entre otras
            experiencias en los cuales puedes participar.
          </h5>
        </div>
      </div>

      {/* Sección Categorías y Carrusel */}
      <div className="container-lg">
        <div className="row g-3  py-2 align-items-center">
          <div className="col-12 col-lg-3 d-flex flex-column align-items-center justify-content-center">
            <h2 className="text-dark h4 fw-semibold mb-1">
              ¿Qué quieres aprender?
            </h2>
            <div className="d-flex flex-wrap gap-2">
              {["Pintura", "Dibujo", "Escultura", "Fotografía"].map(
                (categoria) => {
                  const seleccionada = categoriaCarrusel.includes(
                    categoria
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, ""),
                  );
                  return (
                    <button
                      key={categoria}
                      type="button"
                      className={`btn btn-outline-primary rounded-pill ${seleccionada ? "active" : ""}`}
                      aria-pressed={seleccionada}
                      onClick={() => {
                        seleccionarCategoriaCarrusel(
                          categoria
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, ""),
                        );
                      }}
                    >
                      {categoria}
                    </button>
                  );
                },
              )}
            </div>
          </div>

          <div className="col-12 col-lg-9 d-flex align-items-center">
            <button
              className="btn p-0 border-0"
              type="button"
              data-bs-target="#carousel"
              data-bs-slide="prev"
            >
              <i className="bi bi-arrow-left-circle-fill fs-2"></i>
            </button>
            <div id="carousel" className="carousel slide flex-grow-1">
              <div className="carousel-indicators">
                {cursosCarrusel.map((grupo, i) => (
                  <button
                    key={i}
                    className={i === 0 ? "active" : ""}
                    type="button"
                    data-bs-target="#carousel"
                    data-bs-slide-to={i}
                    aria-current={i === 0 ? "true" : undefined}
                    aria-label={`Slide ${i + 1}`}
                  ></button>
                ))}
              </div>
              <div className="carousel-inner">
                {cursosCarrusel.map((grupo, i) => (
                  <div
                    className={`carousel-item ${i === 0 ? "active" : ""}`}
                    key={i}
                  >
                    <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3 p-2">
                      {grupo.map((curso) => {
                        const {
                          id,
                          nombre,
                          imagen,
                          descripcionImagen,
                          duracion,
                          docente,
                          tipo,
                        } = curso;

                        return (
                          <div className="col">
                            <Curso
                              key={id}
                              id={id}
                              nombre={nombre}
                              imagen={imagen}
                              descripcionImagen={descripcionImagen}
                              duracion={duracion}
                              docente={docente}
                              tipo={tipo}
                              verDetalle={verDetalle}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="btn p-0 border-0"
              type="button"
              data-bs-target="#carousel"
              data-bs-slide="next"
            >
              <i className="bi bi-arrow-right-circle-fill fs-2"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Franja Encontrar Curso */}
      <div className="bg-dark bg-opacity-75 w-100 w-md-50 text-white p-2 p-md-3 d-flex flex-row align-items-center justify-content-center align-self-center gap-3 mt-2 mb-2">
        <h5>Encuentra tu curso ideal.</h5>
        <button
          className="btn p-0 border-0"
          type="button"
          onClick={() => {
            document.getElementById("filtros_busqueda").scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        >
          <i className="bi bi-arrow-down-circle-fill fs-2 text-white"></i>
        </button>
      </div>

      {/* Sección Filtros y Lista de Cursos */}
      <section id="filtros" className="container mt-4">
        <div className="row g-4">
          <aside className="col-12 col-lg-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <h5 className="card-title mb-4" id="filtros_busqueda">
                  <i className="bi bi-funnel me-2"></i>
                  Filtros de búsqueda
                </h5>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Buscar curso</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre del curso..."
                    value={valorEntrada}
                    onChange={(e) => buscarCurso(e.target.value)}
                  />
                </div>

                <div className="mb-4 d-flex flex-column align-items-start">
                  <label className="form-label fw-semibold">Categoría</label>
                  {["pintura", "dibujo", "escultura", "fotografía"].map(
                    (opcion) => (
                      <Filtro
                        opcion={opcion}
                        setFiltro={setFiltroCategoria}
                        key={opcion}
                        seccion="categoria"
                        marcados={filtroCategoria}
                      />
                    ),
                  )}
                </div>

                <div className="mb-4 d-flex flex-column align-items-start">
                  <label className="form-label fw-semibold">Tipo</label>
                  {["curso", "taller", "charla"].map((opcion) => (
                    <Filtro
                      opcion={opcion}
                      setFiltro={setFiltroTipo}
                      key={opcion}
                      seccion="tipo"
                      marcados={filtroTipo}
                    />
                  ))}
                </div>

                <div className="mb-4 d-flex flex-column align-items-start">
                  <label className="form-label fw-semibold">Duración</label>
                  <select
                    className="form-select"
                    onChange={(e) => setFiltroDuracion(e.target.value)}
                    value={filtroDuracion}
                  >
                    <option value="Todos">Todos</option>
                    <option value="-10">Menos de 10 horas</option>
                    <option value="30">10 - 30 horas</option>
                    <option value="30+">Más de 30 horas</option>
                  </select>
                </div>

                <div className="mb-4 d-flex flex-column align-items-start">
                  <label className="form-label fw-semibold">Modalidad</label>
                  {["Híbrido", "Virtual", "Presencial"].map((opcion) => (
                    <Filtro
                      opcion={opcion}
                      setFiltro={setFiltroModalidad}
                      key={opcion}
                      seccion="modalidad"
                      marcados={filtroModalidad}
                    />
                  ))}
                </div>

                <div className="mb-4 d-flex flex-column align-items-start">
                  <label className="form-label fw-semibold">Nivel</label>
                  {["Fácil", "Intermedio", "Avanzado"].map((opcion) => (
                    <Filtro
                      opcion={opcion}
                      setFiltro={setFiltroNivel}
                      key={opcion}
                      seccion="nivel"
                      marcados={filtroNivel}
                    />
                  ))}
                </div>

                <button
                  className="btn btn-primary w-100 mb-2"
                  onClick={() => aplicarFiltros()}
                >
                  Aplicar filtros
                </button>

                <button
                  className="btn btn-outline-secondary w-100"
                  onClick={limpiarFiltros}
                >
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

              <select
                className="form-select w-auto"
                onChange={(e) => ordenarLista(e.target.value)}
              >
                <option value={"lasts"}>Más recientes</option>
                <option value={"A-Z"}>Nombre A-Z</option>
                <option value={"Z-A"}>Nombre Z-A</option>
              </select>
            </div>

            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
              {cursosActuales.map((curso) => {
                const {
                  id,
                  nombre,
                  imagen,
                  descripcionImagen,
                  duracion,
                  docente,
                  tipo,
                  nivel,
                  fechaInicio,
                } = curso;
                return (
                  <div className="col" key={id}>
                    <Curso
                      id={id}
                      nombre={nombre}
                      imagen={imagen}
                      descripcionImagen={descripcionImagen}
                      duracion={duracion}
                      docente={docente}
                      tipo={tipo}
                      verDetalle={verDetalle}
                      nivel={nivel}
                      fechaInicio={fechaInicio}
                    />
                  </div>
                );
              })}
            </div>
            <Paginacion
              cursosPorPagina={cursosPorPagina}
              totalCursos={cursosFiltrados.length}
              paginar={paginar}
              paginaActual={paginaActual}
            />
          </div>
          <CursoDetalle
            detalleCurso={detalleCurso}
            show={mostrarDetalle}
            onHide={() => setMostrarDetalle(false)}
          />
        </div>
      </section>
    </div>
  );
}
