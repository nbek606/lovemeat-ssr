const state = {
  list: []
}

const getters = {
 getReviewList: state => state.list
}

const actions = {
  reviewList ({ commit }, payload) {
    commit('setReviewList', payload)
  }
}

const mutations = {
  setReviewList (state, payload) {
    state.list = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}