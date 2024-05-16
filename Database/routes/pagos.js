// routes/pagos.js
const express = require('express');
const Pagos = require('../schemas/pagos');
const Turno = require('../schemas/turno');
const mongoose = require('mongoose');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const { turno_id, categoria, metodoPago } = req.body;
        const montoMap = {
            'primera-consulta': 5000,
            'consulta': 3500,
            'control': 2500
        };
        const monto = montoMap[categoria];
        if (!monto) {
            return res.status(400).send('Categoria de pago no válida');
        }
        const pago = new Pagos({ turno_id, categoria, monto, metodoPago });
        const pagoGuardado = await pago.save();
        res.status(201).send(pagoGuardado);
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const { metodoPago } = req.body;
        const pago = await Pagos.findById(req.params.id);
        if (!pago) {
            return res.status(404).send('Pago no encontrado');
        }
        pago.metodoPago = metodoPago;
        const pagoActualizado = await pago.save();
        await Turno.findByIdAndUpdate(pago.turno_id, { estado: 'pagado' });
        res.send(pagoActualizado);
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const pagos = await Pagos.find().populate('turno_id');
        res.send(pagos);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const pago = await Pagos.findById(req.params.id).populate('turno_id');
        if (!pago) {
            return res.status(404).send('Pago no encontrado');
        }
        res.send(pago);
    } catch (err) {
        next(err);
    }
});
exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        res.status(200).send(payments);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getPaymentsByDate = async (req, res) => {
    try {
        const { date } = req.query;
        const payments = await Payment.find({ createdAt: { $gte: new Date(date) } });
        res.status(200).send(payments);
    } catch (error) {
        res.status(400).send(error);
    }
};
module.exports = router;
