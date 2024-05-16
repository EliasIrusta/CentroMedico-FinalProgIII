import userService from '../services/userApi'

export async function validarUsuario({ user }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await userService.authUsuario(user)
      console.log(response.status)
      user.rol = response.user.role
      user.token = response.token
      user._id = response.user._id
      resolve(user)
    } catch (error) {
      console.error('Error al obtener la respuesta:', error)
      reject(error)
    }
  })
}
