import axios from "axios"
import store from '../store/user'

export const tokenApi = (uri, method, data = {}) => {
   // Create a custom axios instance
   const api = axios.create({
    headers: {
      'Authorization': `Bearer ${store.state.token}`,
      'Content-Type': 'application/json',
    },
   })

  // Set baseURL to something different
  api.defaults.baseURL = 'https://back.lovemeat.ru'

  if (method == 'post') {
    return api.post(uri, data)
  }

  if (method == 'get') {
    return api.get(uri)
  }
}
