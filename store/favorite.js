const state = {
  favoriteProductList: []
}

const getters = {
  getFavoriteProductList: state => state.favoriteProductList
}

const actions = {
  favoriteProductList({ commit, getters }, payload) {
    const isProdcut = getters.getFavoriteProductList.find(item => item.id == payload.id)

    if (isProdcut) {
      commit('removeFavoriteProductList', isProdcut.id)
    } else {
      commit('setFavoriteProductList', payload)
    }
  }
}

const mutations = {
 setFavoriteProductList (state, payload) {
  state.favoriteProductList.push(payload)
 },
 removeFavoriteProductList(state, payload) {
  state.favoriteProductList = state.favoriteProductList.filter(item => item.id != payload)
 }
}

export default {
  state,
  getters,
  actions,
  mutations
}