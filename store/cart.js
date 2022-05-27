const state = {
  cartProductList: [],
  cartSum: 0,
  modalAddCart: false
}

const getters = {
  getCartProductList: state => state.cartProductList,
  getCartSum: state => state.cartSum,
  getModalAddCart: state => state.modalAddCart
}

const actions = {
  cartProductList ({ commit, getters }, payload) {
    let resultSum = 0
    let product = payload.product
  
    const isProduct = getters.getCartProductList.find(item => item.id == payload.product.id)

    if (isProduct) {
       commit('changeProductInCartList', payload)
    } else {
       product.selected_volume = 0
       product.selected_volume = Number(product.selected_volume) + Number(payload.weight)

       commit('setCartProductList', product)
    }

    resultSum = Number(getters.getCartSum) + Number(payload.sum)
    commit('setCartSum', resultSum)
  },

  modalAddCart ({ commit }, payload) {
    commit('setModalAddCart', payload)
  },

  removeProductInCartList ({ commit }, payload) {
    commit('removeProductInCartList', payload)
  },

  clearProductCartList ({ commit }) {
    commit('setClearCartProductList')
  },
  
  mergeCartList ({ commit }, payload) {
    commit('setMergeCartList', payload.list)
    commit('setCartSum', payload.total)
  }
}

const mutations = {
 setCartProductList (state, payload) {
    state.cartProductList.push(payload)
 },
 setCartSum (state, payload) {
    state.cartSum = payload
 },
 setModalAddCart (state, payload) {
    state.modalAddCart = payload
 },
 removeProductInCartList (state, payload) {
   state.cartProductList = state.cartProductList.filter(item => item.id != payload.id)
   state.cartSum = state.cartSum - (payload.selected_volume * payload.price)
 },
 changeProductInCartList (state, payload) {
    state.cartProductList.forEach(item => {
      if (item.id == payload.product.id) {
        item.selected_volume = Number(item.selected_volume) + Number(payload.weight)
        item.selected_volume = Number(item.selected_volume.toFixed(1))
      }
    });
 },
 setClearCartProductList (state) {
    state.cartProductList = []
    state.cartSum = 0
 },

 setMergeCartList (state, payload) {
   state.cartProductList = [...state.cartProductList, ...payload]
 }
}

export default {
  state,
  getters,
  actions,
  mutations
}