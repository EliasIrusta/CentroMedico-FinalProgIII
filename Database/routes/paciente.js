
const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../schemas/user')
const Role = require('../schemas/role')

const router = express.Router()


router.get('/all_pacientes', getAllPacientes)

async function getAllPacientes(req, res, next) {
    try {
        // Buscar el ID del rol de paciente
        const rolPaciente = await Role.findOne({ name: 'paciente' })
        if (!rolPaciente) {
            return res.status(404).send('Role for pacientes not found')
        }

        // Buscar todos los usuarios con el rol de paciente
        const pacientes = await User.find({ role: rolPaciente._id })

        res.send(pacientes)
    } catch (err) {
        next(err)
    }
}

module.exports = router