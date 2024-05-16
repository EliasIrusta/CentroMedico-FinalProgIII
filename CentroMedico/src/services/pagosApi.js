import api from './api';
import axios from 'axios';

const pagosService = {};

pagosService.getAllPagos = () => api.get('/pagos');
pagosService.getPagoById = (id) => api.get(`/pagos/${id}`);
pagosService.deletePago = (id) => api.delete(`/pagos/${id}`);
pagosService.createPago = (pago) => api.post('/pagos', pago);
pagosService.updatePagoMetodo = (id, metodoPago) => api.put(`/pagos/${id}`, { metodoPago });

export default pagosService;