const jwt = require('jsonwebtoken')

const Role = require('../schemas/role')

async function generateUserToken(req, user) {
  const role = await Role.findById(user.role).exec()

  const payload = {
    _id: user._id,
    role: role.name,
  }

  const userResponse = {
    _id: user._id,
    role: role.name,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  }

 
  const token = jwt.sign(payload, 'base-api-express-generator', {
    subject: user._id.toString(),
    issuer: 'base-api-express-generator',
  })


  return { token, user: userResponse }
}

module.exports = generateUserToken
