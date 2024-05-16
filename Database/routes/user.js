const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../schemas/user')
const Role = require('../schemas/role')

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.get('/patients', getPatients)

async function getAllUsers(req, res, next) {
  try {
    const users = await User.find({ isActive: true }).populate('role')
    res.send(users)
  } catch (err) {
    next(err)
  }
}
async function getPatients(Role, res, next) {
  try {
    const role = await Role.findOne({ name: 'paciente' })
    if (!role) {
      return res.status(404).send('Role "paciente" not found')
    }
    const patients = await User.find({ role: role._id, isActive: true }).populate('role')
    res.send(patients)
  } catch (err) {
    next(err)
  }
}

async function getUserById(req, res, next) {
  console.log('getUser with id: ', req.params.id)
  if (!req.params.id) {
    res.status(500).send('The param id is not defined')
  }
  try {
    const user = await User.findById(req.params.id).populate('role')
    if (!user || user.length == 0) {
      res.status(404).send('User not found')
    }
    res.send(user)
  } catch (err) {
    next(err)
  }
}

async function createUser(req, res, next) {
  console.log('createUser: ', req.body)
  const user = req.body
  console.log('esto busca', user.rol[0])
  try {
    const role = await Role.findOne({ name: user.rol[0] })
    if (!role) {
      res.status(404).send('Role not found')
    } else {
      console.log(role)
    }
    const passEncrypted = await bcrypt.hash(user.password, 10)
    const userCreated = await User.create({ ...user, password: passEncrypted, role: role._id })
    res.send(userCreated)
  } catch (err) {
    next(err)
  }
}

async function updateUser(req, res, next) {
  console.log('updateUser with id: ', req.params.id)

  if (!req.params.id) {
    return res.status(404).send('Parameter id not found')
  }
  delete req.body.email
  try {
    const userToUpdate = await User.findById(req.params.id)
    if (!userToUpdate) {
      req.logger.error('User not found')
      return res.status(404).send('User not found')
    }
    if (req.body.role) {
      const newRole = await Role.findById(req.body.role)
      if (!newRole) {
        req.logger.verbose('New role not found. Sending 400 to client')
        return res.status(400).end()
      }
      req.body.role = newRole._id
    }
    if (req.body.password) {
      const passEncrypted = await bcrypt.hash(req.body.password, 10)
      req.body.password = passEncrypted
    }

    await userToUpdate.updateOne(req.body)
    res.send(userToUpdate)
    x
  } catch (err) {
    next(err)
  }
}

async function deleteUser(req, res, next) {
  console.log('deleteUser with id: ', req.params.id)

  if (!req.params.id) {
    res.status(500).send('The param id is not defined')
  }

  try {
    const user = await User.findById(req.params.id)

    if (!user) {
      res.status(404).send('User not found')
    }

    await User.deleteOne({ _id: user._id })

    res.send(`User deleted :  ${req.params.id}`)
  } catch (err) {
    next(err)
  }
}

module.exports = router
