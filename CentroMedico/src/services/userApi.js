import api from './api'

const userService = {}

userService.getRoot = () => api.get('/')
userService.getPeople = () => api.get(`/people`)
userService.getPersonById = (id) => api.get(`/people/${id}`)
userService.authUsuario = (usr) => api.post(`/auth/`,usr)

userService.getPatients = () => api.get(`/users/patients`)

userService.createUser = (data) => api.post(`/users/`, data)
userService.deleteUser = (id) => api.delete(`/users/${id}`)
userService.updateUser = (id, data) => api.put(`/users/${id}`, data)




export default userService
