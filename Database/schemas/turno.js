const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const turnoSchema = new mongoose.Schema({
  fechaTurno: {
    type: String,
    required: true,
  },
  horaTurno: {
    type: String,
    required: true,
  },
  nombrePaciente: {
    type: String,
    required: false,
  },
  paciente_id: {
    type: ObjectId,
    ref: 'user',
    required: false,
  },
  medico_id: {
    type: ObjectId,
    ref: 'user',
    required: false,
  },
  especialidad: {
    type: String,
    required: false,
  },
  descripcion: {
    type: String,
    required: true,
  },
  tratamiento: {
    type: String,
    required: false,
  },
  estado: {
    type: String,
    required: true,
  },
})

const Turno = mongoose.model('Turnos', turnoSchema)

module.exports = Turno
