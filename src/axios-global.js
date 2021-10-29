import axios from 'axios'

// use a clean axios instance different from global axios
let secureAxios = axios.create()

secureAxios.interceptors.request.use(async (config) => {
  config.withCredentials = true
  return config
})

export default secureAxios
