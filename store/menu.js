const state = {
  itemCategory: {}
}

const getters = {
  getItemCategory: state => state.itemCategory
}

const actions = {
  itemCategory ({ commit }, payload) {
    commit('setCategory', payload)
  }
}

const mutations = {
  setCategory (state, payload) {
    state.itemCategory = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}