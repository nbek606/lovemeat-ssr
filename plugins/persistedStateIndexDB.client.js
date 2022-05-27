import createPersistedState from "vuex-persist-indexeddb";

export default ({store}) => {
  createPersistedState({
    key: 'lovemeat',
    paths: [
      'cart.cartProductList',
      'cart.cartSum',
      'favorite.favoriteProductList',
      'checkout.checkout',
      'product.categories',
      'product.globalProduct',
      'product.collectionProduct',
      'product.productList',
      'product.underProductList',
      'search.searchProductList',
      'review.list'
    ]
  })(store)
}