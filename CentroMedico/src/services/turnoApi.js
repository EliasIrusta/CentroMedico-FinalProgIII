import api from './api'

const turnoService = {}


turnoService.createTurno = (turno) => api.post(`/turno/`, turno)
turnoService.getAllTurnos = () => api.get(`/turno`)
turnoService.buscarTurnoPorFecha = (fecha) => api.post(`/turno/buscar`, fecha)
turnoService.editarTurno = (id,datos) => api.put(`/turno/${id}`,datos)
turnoService.borraTurno = (id) => api.delete(`/turno/${id}`)


export default turnoService