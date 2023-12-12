const mongoose = require('mongoose');

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
  especialidad: {
    type: String,
    required: false,
  },
  estado: {
    type: String,
    required: true,
  }
});

const Turno = mongoose.model('Turnos', turnoSchema);

module.exports = Turno;