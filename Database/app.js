const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const statusRouter = require('./routes/status')
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const pacientesRouter = require('./routes/user')
const authorization = require('./middlewares/authorization')
const turnoRouter = require('./routes/turno') 
const pagosRoutes = require('./routes/pagos');
const app = express()
const bodyParser = require('body-parser');

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(authorization)
app.use(bodyParser.json());


app.get('/favicon.ico', (req, res) => res.status(204))

app.use('/', statusRouter)
app.use('/auth', authRouter)

app.use('/users', userRouter) 
app.use('/pacientes', pacientesRouter)
app.use('/turno', turnoRouter)

app.use('/pagos', pagosRoutes); 

module.exports = app
