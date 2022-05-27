import accountApiService from "@/api/accountApiService"

const state = ({
  token: '',
  account: {},
  error: ''
})

const getters = {
  getAccountToken: state => state.token,
  getAccountData: state => state.account,
  getAuthError: state => state.error
}

const actions = {
 login ({commit, dispatch}, payload) {

  dispatch('modal/LOADER_ON', null, { root: true }) 
  commit('clearError')
  accountApiService.getToken(payload).then((response) => {
    const jwt = response.data.data.jwt
    accountApiService.getByEmail(payload.email).then((response) => {
      const customer = response.data.find(item => item.email == payload.email)
      if (customer) {
        commit('setToken', jwt)
        commit('setAccount', customer)
      }
    }).catch(() => {
      dispatch('modal/LOADER_OFF', null, { root: true }) 
      commit('setError', 'Неправильный логин или пароль')
    })
   }).catch(() => {
      dispatch('modal/LOADER_OFF', null, { root: true }) 
      commit('setError', 'Неправильный логин или пароль')
   })
 },
 //Регистрация
 signup ({ commit, dispatch }, payload) {

 dispatch('modal/LOADER_ON', null, { root: true }) 
 commit('clearError')

  accountApiService.signup(payload).then((response) => {
    if (response.data.user) {
       //Получаем токен
      accountApiService.getToken(payload).then((response) => {
        if (response.data.data.jwt) {
          const jwt = response.data.data.jwt
          //Получаем клиент по имейл
          accountApiService.getByEmail(payload.email).then((response) => {
            const customer = response.data.find(item => item.email == payload.email)
            if (customer) {
              commit('setToken', jwt)
              commit('setAccount', customer)
            }
          }).catch(() => {
            dispatch('modal/LOADER_OFF')
            commit('setError', 'Пользователь с таким email уже существует')
          })
        }
      }).catch(() => {
        dispatch('modal/LOADER_OFF')
        commit('setError', 'Пользователь с таким email уже существует')
      })
    }
  }).catch(() => {
    dispatch('modal/LOADER_OFF')
    commit('setError', 'Пользователь с таким email уже существует')
  })
 },

 account({ commit }, payload) {
  commit('setAccount', payload)
 },

 logout ({ commit }) {
   commit('logout')
 }
}

const mutations = {
  setAccount (state, payload) {
    state.account = payload
  },
  
  setToken (state, payload) {
    state.token = payload
  },

  logout (state) {
    state.token = '',
    state.account = {}
  },

  setError (state, payload) {
    state.error = payload
  },

  clearError (state) {
    state.error = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}