
import { useState } from 'react';
import {
  Modal,
  Form,
  Button,
  Alert
} from 'react-bootstrap';

const USUARIO_DEMO = 'Admin';
const CLAVE_DEMO = 'Admin';

export default function AdminLogin({
  show,
  onHide,
  onAccesoCorrecto
}) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');

  const limpiarFormulario = () => {
    setUsuario('');
    setContrasena('');
    setError('');
  };

  const cerrarModal = () => {
    limpiarFormulario();
    onHide();
  };

  const iniciarSesion = evento => {
    evento.preventDefault();
    setError('');

    if (
      usuario === USUARIO_DEMO &&
      contrasena === CLAVE_DEMO
    ) {
      limpiarFormulario();
      onAccesoCorrecto();
      return;
    }

    setError('Usuario o contraseña incorrectos.');
  };

  return (
    <Modal
      className="text-center text-dark"
      show={show}
      onHide={cerrarModal}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center text-blue" >
          Administración Productos Tienda MATIZ
        </Modal.Title>
      </Modal.Header>

      <Form onSubmit={iniciarSesion}>
        <Modal.Body>

          <p className="text-muted">
            Ingresa tus credenciales de administrador.
          </p>

          {error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>

            <Form.Control
              size="sm"
              type="text"
              className="me-1 bg-gray text-dark border-1 px-3"
              value={usuario}
              onChange={evento =>
                setUsuario(evento.target.value)
              }
              autoComplete="username"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>

            <Form.Control
              size="sm"
              type="password"
              className="me-1 bg-gray text-dark border-1 px-3"
              value={contrasena}
              onChange={evento =>
                setContrasena(evento.target.value)
              }
              autoComplete="current-password"
              required
            />
          </Form.Group>

        </Modal.Body>

        <Modal.Footer className="justify-content-center">
          <Button
            variant="secondary"
            onClick={cerrarModal}
            className="rounded-pill px-3 fw-medium btn-unirme"
          >
            Cancelar
          </Button>

          <Button
            variant="primary"
            type="submit"
            className="rounded-pill px-3 fw-medium btn-unirme"
          >
            Ingresar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
