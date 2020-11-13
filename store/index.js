import Vue from 'vue'
import Vuex from 'vuex'

import home from './modules/home'
import geo from './modules/geo'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  modules: {
    home,
    geo
  },
  actions: {
    async nuxtServerInit ({ commit }, { req, app }) {
      const res = await this.$axios.get('/geo/menu')
      const { menu } = res.data
      commit('home/setMenu', menu)
    }
  }

})

export default store
