import api from './api'

const swService = {}

swService.getRoot = () => api.get('/')
swService.getPeople = () => api.get(`/users`)
swService.getPersonById = (id) => api.get(`/users/${id}`)
//swService.createUser = (data) => api.post(`/users/`, data)
//swService.deleteUser = (id) => api.delete(`/users/${id}`)
//swService.updateUser = (id, data) => api.put(`/users/${id}`, data)

swService.login = (data) => api.post(`auth`, data)

swService.createTurno = (turno) => api.post(`/turno/`, turno)
swService.getAllTurnos = () => api.get(`/turno`)
swService.buscarTurnoPorFecha = (fecha) => api.post(`/turno/buscar`, fecha)
swService.editarTurno = (id,datos) => api.put(`/turno/${id}`,datos)
swService.borraTurno = (id) => api.delete(`/turno/${id}`)
export default swService
