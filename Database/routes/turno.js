const express = require('express')
const User = require('../schemas/user')
const Turno = require('../schemas/turno')
const Role = require('../schemas/role')
const mongoose = require('mongoose')

const router = express.Router()

router.post('/', createTurno)
router.get('/', getAllTurnos)
router.get('/:id', getTurnoById)
router.post('/buscar', buscarTurnosPorFecha)
router.put('/:id', editarTurno)
router.delete('/:id', borrarTurno)

async function getTurnoById(req, res, next) {
  console.log('getTurno with id: ', req.params.id)

  if (!req.params.id) {
    res.status(500).send('The param id is not defined')
  }

  try {
    const turno = await Turno.findById(req.params.id)
    console.log('turno del back', turno)

    if (!turno || turno.length == 0) {
      res.status(404).send('turno not found')
    }

    res.send(turno)
  } catch (err) {
    next(err)
  }
}

async function createTurno(req, res, next) {
  console.log('createTurno: ', req.body)
  const turno = req.body
  try {
    const turnoCreated = await Turno.create(turno)
    res.send(turnoCreated)
  } catch (err) {
    next(err)
  }
}

async function getAllTurnos(req, res) {
  console.log('getAllTurnos  ')
  try {
    const turnos = await Turno.find()
    res.send(turnos)
  } catch (err) {
    console.log(err)
  }
}


async function buscarTurnosPorFecha(req, res, next) {
  try {
    console.log('Fecha a buscar: ')
    console.log(req.body)
    const fecha = req.body.fechaTurno
    const turnos = await Turno.find({ fechaTurno: fecha })
    res.send(turnos)
  } catch (err) {
    next(err)
  }
}

async function editarTurno(req, res, next) {
  console.log('editar turno con id: ', req.params.id)
  try {
    const turnoId = req.params.id
    const nuevoEstado = req.body.estado
    const nuevaFecha = req.body.fechaTurno
    const nuevaHora = req.body.horaTurno
    const nuevoTratamiento = req.body.tratamiento
    if (!mongoose.Types.ObjectId.isValid(turnoId)) {
      return res.status(400).send('ID de turno no válido')
    }
    const turnoActualizado = await Turno.findByIdAndUpdate(
      turnoId,
      {
        estado: nuevoEstado,
        fechaTurno: nuevaFecha,
        horaTurno: nuevaHora,
        tratamiento: nuevoTratamiento,
      },
      { new: true },
      console.log('delservice', turnoId, nuevoEstado, nuevoTratamiento),
    )
    if (!turnoActualizado) {
      return res.status(404).send('Turno no encontrado')
    }
    res.json(turnoActualizado)
  } catch (err) {
    next(err)
  }
}

async function borrarTurno(req, res, next) {
  try {
    const turnoId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(turnoId)) {
      return res.status(400).send('ID de turno no válido')
    }
    const turnoBorrado = await Turno.findByIdAndDelete(turnoId)
    if (!turnoBorrado) {
      return res.status(404).send('Turno no encontrado')
    }
    res.json(turnoBorrado)
  } catch (err) {
    next(err)
  }
}

module.exports = router
