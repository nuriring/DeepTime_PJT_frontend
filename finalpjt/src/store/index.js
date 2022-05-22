import Vue from 'vue'
import Vuex from 'vuex'

// import articles from './modules/articles'
import movies from './modules/movies'
import accounts from './modules/accounts'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: { accounts,movies },
})
