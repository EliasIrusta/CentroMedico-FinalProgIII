const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const pagosSchema = new mongoose.Schema({
    
    categoria: {
        type: String,
        required: false,
        enum: ['primera consulta', 'consulta', 'control']
    },
    monto: {
        type: Number,
        required: false,
    },
    turno_id: {
        type: ObjectId,
        ref: 'Turnos',
        required: true,
    },
    metodoPago: {
        type: String,
        required: false,
        
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
    createdAt: { type: Date, default: Date.now }
});

const Pagos = mongoose.model('Pagos', pagosSchema);
module.exports = Pagos;
