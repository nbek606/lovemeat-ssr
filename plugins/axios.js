
   
export default function ({ $axios, store }, inject) {
  // Create a custom axios instance
  const api = $axios.create({
       headers: {
         
       },
   })
 // withCredentials: true

 // Set baseURL to something different
 api.setBaseURL(`http://127.0.0.1:8000/api`)

 // Set token
 api.onRequest(() => {
     api.setToken(store.state.auth.token, 'Bearer')
 })

 // Inject to context as $api
 inject('api', api)
}