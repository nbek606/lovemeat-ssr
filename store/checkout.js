const state = {
  checkout: false
}

const getters = {
  getCheckout: state => state.checkout
}

const actions = {
  checkout ({commit}, payload) {
    commit('setCheckout', payload)
  }
}

const mutations = {
  setCheckout (state, payload) {
    state.checkout = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}