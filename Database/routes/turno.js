const express = require('express')
//const bcrypt = require('bcrypt')

const Turno = require('../schemas/turno')
//const Role = require('../schemas/role')
const mongoose = require('mongoose')

const router = express.Router()

router.post('/', createTurno)
router.get('/', getAllTurnos)
router.post('/buscar', buscarTurnosPorFecha)
router.put('/:id', editarTurno)
router.delete('/:id', borrarTurno)

async function createTurno(req, res, next) {
  console.log('createTurno: ', req.body)
  const turno = req.body

  try {
    // Validar si el usuario tiene permisos para crear clientes
    /*     if (!req.isAdmin()) {
      return res.status(403).send('Unauthorized');
    } */

    const turnoCreated = await Turno.create(turno)

    res.send(turnoCreated)
  } catch (err) {
    next(err)
  }
}

async function getAllTurnos(req, res) {
  console.log('getAllTurnos  ')

  try {
    const turnos = await Turno.find({ estado: 'pendiente' })
    res.send(turnos)
  } catch (err) {
    console.log(err)
  }
}

async function buscarTurnosPorFecha(req, res, next) {
  try {
    console.log('Fecha a buscar: ')
    console.log(req.body)
    const fecha = req.body.fechaTurno // Puedes recibir la fecha como parámetro de la solicitud

    // Validar si la fecha es válida antes de realizar la búsqueda

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

    // Validar si el ID del turno es válido antes de realizar la actualización
    if (!mongoose.Types.ObjectId.isValid(turnoId)) {
      return res.status(400).send('ID de turno no válido')
    }

    // Realizar la actualización del turno por su ID
    const turnoActualizado = await Turno.findByIdAndUpdate(
      turnoId,
      { estado: nuevoEstado, fechaTurno: nuevaFecha, horaTurno: nuevaHora },
      { new: true },
    )

    // Verificar si el turno se encontró y se actualizó correctamente
    if (!turnoActualizado) {
      return res.status(404).send('Turno no encontrado')
    }

    // Enviar la respuesta con el turno actualizado
    res.json(turnoActualizado)
  } catch (err) {
    next(err)
  }
}

async function borrarTurno(req, res, next) {
  try {
    const turnoId = req.params.id // Obtener el ID del turno de los parámetros de la solicitud

    // Validar si el ID del turno es válido antes de realizar el borrado
    if (!mongoose.Types.ObjectId.isValid(turnoId)) {
      return res.status(400).send('ID de turno no válido')
    }

    // Realizar el borrado del turno por su ID
    const turnoBorrado = await Turno.findByIdAndDelete(turnoId)

    // Verificar si el turno se encontró y se borró correctamente
    if (!turnoBorrado) {
      return res.status(404).send('Turno no encontrado')
    }

    // Enviar la respuesta con el turno borrado
    res.json(turnoBorrado)
  } catch (err) {
    next(err)
  }
}

module.exports = router
