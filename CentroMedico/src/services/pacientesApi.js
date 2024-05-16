import api from './api'

const pacienteService = {}

pacienteService.getAllPacientes = () => api.get(`/pacientes`)

pacienteService.createPacientes = (paciente) =>
    api.post(`/pacientes/`, paciente)
pacienteService.getPacienteById = (id) => api.get(`/pacientes/${id}`)

export default pacienteService
