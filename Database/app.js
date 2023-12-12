const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

const statusRouter = require('./routes/status')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const pacientesRouter = require('./routes/user')
const authentication = require('./middlewares/authentication')
const authorization = require('./middlewares/authorization')
const turnoRouter = require('./routes/turno'); // Código agregado
const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(authorization)

// This is to aviod error
app.get('/favicon.ico', (req, res) => res.status(204))

app.use('/', statusRouter)
app.use('/auth', authRouter)
app.use('/users', userRouter) // quitamos el middleware para que no si fije si esta conectado  --> authentication
app.use('/pacientes', pacientesRouter) // quitamos el middleware para que no si fije si esta conectado  --> authentication
app.use('/turno',turnoRouter)


module.exports = app
