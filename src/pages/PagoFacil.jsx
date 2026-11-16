import { useState, useRef } from 'react';

import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Alert,
    Spinner,
    Badge
} from 'react-bootstrap';

import { useCarrito } from '../context/CarritoContext';

import {
    simularPago,
    consultarSolicitud
} from '../services/pagoFacilService';

import './PagoFacil.css';

const formatoCOP = valor =>
    Number(valor).toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0
    });

export default function PagoFacil({ setPaginaActual }) {
    const {
        items,
        totalCarrito,
        vaciarCarrito
    } = useCarrito();

    const [cliente, setCliente] = useState({
        tipoDocumento: 'CC',
        numeroDocumento: '',
        nombres: '',
        apellidos: '',
        telefono: '',
        correo: ''
    });

    const [metodoPago, setMetodoPago] = useState('debito');
    const [procesando, setProcesando] = useState(false);
    const [resultado, setResultado] = useState(null);
    const [error, setError] = useState('');

    // Conserva la clave si la respuesta del servidor
    // se pierde y necesitamos consultar el resultado.
    const solicitudActual = useRef(null);
    const bloqueoEnvio = useRef(false);

    const cambiarCliente = evento => {
        const { name, value } = evento.target;

        setCliente(actual => ({
            ...actual,
            [name]: value
        }));
    };

    const confirmarPago = async evento => {
        evento.preventDefault();

        if (bloqueoEnvio.current) return;

        bloqueoEnvio.current = true;
        setProcesando(true);
        setError('');
        setResultado(null);

        const claveSolicitud =
            solicitudActual.current || crypto.randomUUID();

        solicitudActual.current = claveSolicitud;

        try {
            const respuesta = await simularPago({
                claveSolicitud,
                cliente,
                metodoPago,
                items: items.map(item => ({
                    tipo: item.tipo,
                    referenciaId: item.referenciaId,
                    cantidad: item.cantidad
                }))
            });

            setResultado(respuesta);
            solicitudActual.current = null;

            if (respuesta.estado === 'aprobado') {
                vaciarCarrito();
            }

        } catch (errorPago) {
            setError(errorPago.message);
        } finally {
            bloqueoEnvio.current = false;
            setProcesando(false);
        }
    };

    const verificarResultado = async () => {
        if (!solicitudActual.current) return;

        setProcesando(true);
        setError('');

        try {
            const respuesta = await consultarSolicitud(
                solicitudActual.current
            );

            if (
                ['aprobado', 'rechazado', 'cancelado']
                    .includes(respuesta.estado)
            ) {
                setResultado(respuesta);
                solicitudActual.current = null;

                if (respuesta.estado === 'aprobado') {
                    vaciarCarrito();
                }
            } else {
                setError(
                    'El pedido todavía no tiene un resultado definitivo.'
                );
            }
        } catch (errorConsulta) {
            setError(errorConsulta.message);
        } finally {
            setProcesando(false);
        }
    };

    const reintentar = () => {
        setResultado(null);
        setError('');
        solicitudActual.current = null;
    };

    const volverCarrito = () => {
        setPaginaActual('carrito');
    };

    const contieneOtrosServicios = items.some(
        item => item.tipo !== 'producto'
    );

    return (
        <Container className="pagofacil py-4">
            <Row className="justify-content-center">
                <Col lg={9} xl={8}>
                    <Card className="pagofacil-card border-0 shadow">
                        <Card.Header className="pagofacil-header">
                            <h2 className="mb-1">
                                PagoFacil
                            </h2>
                            <p className="mb-0">
                                Pasarela de pagos de demostración
                            </p>
                        </Card.Header>

                        <Card.Body className="p-3 p-md-4">
                            {resultado ? (
                                <div className="text-center py-4">
                                    <h3>
                                        {resultado.estado === 'aprobado'
                                            ? 'Pago aprobado'
                                            : resultado.estado === 'rechazado'
                                                ? 'Pago rechazado'
                                                : 'Pago cancelado'}
                                    </h3>

                                    <Alert
                                        variant={
                                            resultado.estado === 'aprobado'
                                                ? 'success'
                                                : 'warning'
                                        }
                                    >
                                        {resultado.mensaje ||
                                            `Estado: ${resultado.estado}`}
                                    </Alert>

                                    <p>
                                        Referencia:
                                        <strong>
                                            {' '}
                                            {resultado.referenciaTransaccion}
                                        </strong>
                                    </p>

                                    <p>
                                        Total:
                                        <strong>
                                            {' '}
                                            {formatoCOP(resultado.total)}
                                        </strong>
                                    </p>

                                    <div className="d-flex flex-wrap justify-content-center gap-2">
                                        {resultado.estado === 'rechazado' && (
                                            <Button
                                                variant="success"
                                                onClick={reintentar}
                                            >
                                                Intentar nuevamente
                                            </Button>
                                        )}

                                        <Button
                                            variant="outline-secondary"
                                            onClick={() =>
                                                setPaginaActual(
                                                    resultado.estado === 'aprobado'
                                                        ? 'home'
                                                        : 'carrito'
                                                )
                                            }
                                        >
                                            {resultado.estado === 'aprobado'
                                                ? 'Volver al inicio'
                                                : 'Volver al carrito'}
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h4 className="mb-0">
                                            Resumen del pedido
                                        </h4>
                                        <Badge bg="success">
                                            {items.length} artículos
                                        </Badge>
                                    </div>

                                    {items.map(item => (
                                        <div
                                            key={item.clave}
                                            className="d-flex justify-content-between gap-3 border-bottom py-2"
                                        >
                                            <div>
                                                <strong>{item.nombre}</strong>
                                                <div className="text-muted small">
                                                    Cantidad: {item.cantidad}
                                                </div>
                                            </div>
                                            <span>
                                                {formatoCOP(item.subtotal)}
                                            </span>
                                        </div>
                                    ))}

                                    <div className="d-flex justify-content-between align-items-center py-3 mb-3">
                                        <strong>Total a pagar</strong>
                                        <h3 className="pagofacil-total mb-0">
                                            {formatoCOP(totalCarrito)}
                                        </h3>
                                    </div>

                                    {contieneOtrosServicios && (
                                        <Alert variant="warning">
                                            Esta versión de PagoFacil procesa
                                            únicamente productos de ArteShop.
                                            Los cursos, entradas y reservas
                                            todavía requieren integración.
                                        </Alert>
                                    )}

                                    {error && (
                                        <Alert variant="danger">
                                            {error}
                                        </Alert>
                                    )}

                                    {solicitudActual.current && error && (
                                        <Button
                                            variant="outline-primary"
                                            className="mb-3"
                                            disabled={procesando}
                                            onClick={verificarResultado}
                                        >
                                            Consultar resultado del intento
                                        </Button>
                                    )}

                                    <Form onSubmit={confirmarPago}>
                                        <h4 className="mb-3">
                                            Información del cliente
                                        </h4>

                                        <Row className="g-3">
                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label>
                                                        Tipo de documento
                                                    </Form.Label>
                                                    <Form.Select
                                                        name="tipoDocumento"
                                                        value={cliente.tipoDocumento}
                                                        onChange={cambiarCliente}
                                                    >
                                                        <option value="CC">Cédula de ciudadanía</option>
                                                        <option value="CE">Cédula de extranjería</option>
                                                        <option value="TI">Tarjeta de identidad</option>
                                                        <option value="PASAPORTE">Pasaporte</option>
                                                        <option value="OTRO">Otro</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>

                                            <Col md={6}>
                                                <Form.Group>
                                                    <Form.Label>
                                                        Número de documento
                                                    </Form.Label>
                                                    <Form.Control
                                                        required
                                                        name="numeroDocumento"
                                                        value={cliente.numeroDocumento}
                                                        onChange={cambiarCliente}
                                                    />
                                                </Form.Group>
                                            </Col>

                                            {[
                                                ['nombres', 'Nombres'],
                                                ['apellidos', 'Apellidos'],
                                                ['telefono', 'Teléfono'],
                                                ['correo', 'Correo electrónico']
                                            ].map(([campo, etiqueta]) => (
                                                <Col md={6} key={campo}>
                                                    <Form.Group>
                                                        <Form.Label>
                                                            {etiqueta}
                                                        </Form.Label>
                                                        <Form.Control
                                                            required
                                                            name={campo}
                                                            type={
                                                                campo === 'correo'
                                                                    ? 'email'
                                                                    : campo === 'telefono'
                                                                        ? 'tel'
                                                                        : 'text'
                                                            }
                                                            value={cliente[campo]}
                                                            onChange={cambiarCliente}
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            ))}
                                        </Row>

                                        <h4 className="mt-4 mb-3">
                                            Método de pago
                                        </h4>

                                        <Form.Select
                                            value={metodoPago}
                                            onChange={evento =>
                                                setMetodoPago(evento.target.value)
                                            }
                                            aria-label="Método de pago"
                                        >
                                            <option value="debito">
                                                Tarjeta débito
                                            </option>
                                            <option value="credito">
                                                Tarjeta crédito
                                            </option>
                                        </Form.Select>
                                        
                                        <div className="d-flex flex-wrap justify-content-end gap-2 mt-4">
                                            <Button
                                                variant="outline-secondary"
                                                type="button"
                                                disabled={procesando}
                                                onClick={volverCarrito}
                                            >
                                                Cancelar
                                            </Button>

                                            <Button
                                                className="pagofacil-confirmar"
                                                type="submit"
                                                disabled={
                                                    procesando ||
                                                    items.length === 0 ||
                                                    contieneOtrosServicios ||
                                                    Boolean(solicitudActual.current)
                                                }
                                            >
                                                {procesando && (
                                                    <Spinner
                                                        size="sm"
                                                        className="me-2"
                                                    />
                                                )}
                                                Confirmar pago
                                            </Button>
                                        </div>
                                    </Form>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}