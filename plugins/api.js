import axios from 'axios'

export const api = (uri, method, data = {}) => {
   // Create a custom axios instance
   const api = axios.create({})

  // Set baseURL to something different
  api.defaults.baseURL = `https://back.lovemeat.ru`

  if (method == 'get') {
    return api.get(uri)
  } else {
    return api.post(uri, data)
  }
}