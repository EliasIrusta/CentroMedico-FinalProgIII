import api from './api'

const turnoService = {}


turnoService.createTurno = (turno) => api.post(`/turno/`, turno)
turnoService.getAllTurnos = () => api.get(`/turno`)
turnoService.buscarTurnoPorFecha = (fecha) => api.post(`/turno/buscar`, fecha)
turnoService.editarTurno = (id, datos) => api.put(`/turno/${id}`, datos)
turnoService.borraTurno = (id) => api.delete(`/turno/${id}`)

turnoService.getAllByMed = async (medicoId) => {
    try {
        const response = await api.get(`/turnos?medicoId=${medicoId}`); // Modifica la ruta para incluir el ID del médico como parámetro
        return response;
    } catch (error) {
        console.error('Error al obtener los turnos:', error);
        throw error;
    }
};


turnoService.getTurnoById = async (turnoId) => {
    try {
        const response = await api.get(`/turno/${turnoId}`);
        console.log('response0',response)
        return response;
    } catch (error) {
        console.error('Error al obtener el turno:', error);
        throw error;
    }
};

export default turnoService