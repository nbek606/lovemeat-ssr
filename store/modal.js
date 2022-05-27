const state = {
  loader: false,
  requestCall: false,
  createOrderModal: false 
}

const getters = {
  getLoader: state => state.loader,
  getRequestCall: state => state.requestCall,
  getCreateOrderModal: state => state.createOrderModal
}

const actions = {
  LOADER_ON ({ commit }) {
    commit('setLoader', true)
  },

  LOADER_OFF ({ commit }) {
    commit('setLoader', false)
  },

  requestCall ({commit}, payload) {
    commit('setRequestCall', payload)
  },
  
  createOrderModal ({ commit }, payload) {
    commit('setCreateOrderModal', payload)
  }
}

const mutations = {
 setLoader (state, payload) {
   state.loader = payload
 },
 setRequestCall (state, payload) {
   state.requestCall = payload
 },
 setCreateOrderModal (state, payload) {
   state.createOrderModal = payload
 }
}

export default {
  state,
  getters,
  actions,
  mutations
}