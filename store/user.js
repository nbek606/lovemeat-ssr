import userApiService from '@/api/userApiService'

const state = {
  token: '',
  user: false
}

const getters = {
  getToken: state => state.token
}

const actions = {
 token ({commit}) {
   userApiService.getToken().then((response => {
     commit('setToken', response.data.token)
   }))
 }
}

const mutations = {
  setToken (state, payload) {
    state.token = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}