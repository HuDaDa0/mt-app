export default {
  namespaced: true,
  state: () => ({
    menu: []
  }),
  mutations: {
    setMenu (state, val) {
      state.menu = val
    }
  },
  actions: {
    setMenu: ({ commit }, menu) => {
      commit('setMenu', menu)
    }
  }
}
