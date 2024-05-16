import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000 * 15, // 15 sec
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(console.log(error)),
)

export default api
