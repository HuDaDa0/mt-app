export default {
  namespaced: true,
  state: () => ({
    position: {}
  }),
  mutations: {
    setPosition (state, val) {
      state.position = val
    }
  },
  actions: {
    setPosition: ({ commit }, position) => {
      commit('setPosition', position)
    }
  }
}
