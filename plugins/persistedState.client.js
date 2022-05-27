import createPersistedState from "vuex-persistedstate"

export default ({store}) => {
  createPersistedState({
    paths: [
      'account.account',
      'account.token',
    ]
  })(store)
}
