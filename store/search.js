const state = {
  searchText: '',
  searchLoader: false,
  searchProductList: []
}

const getters = {
  getSearchText: state => state.searchText,
  getSearchLoader: state => state.searchLoader,
  getSearchProductList: state => state.searchProductList
}

const actions = {
 searchText ({commit}, payload) {
   commit('setSearchText', payload)
 },

 searchLoader ({ commit }, payload) {
   commit('setSearchLoader', payload)
 },

 searchProductList ({ commit }, payload) {
   commit('setSearchProductList', payload)
 }
}

const mutations = {
  setSearchText (state, payload) {
    state.searchText = payload
  },
  setSearchLoader (state, payload) {
    state.searchLoader = payload
  },
  setSearchProductList (state, payload) {
    state.searchProductList = payload
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}