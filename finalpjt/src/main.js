// Import Bootstrap and BootstrapVue CSS files (order is important)
import Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueGlide from 'vue-glide-js'
import 'vue-glide-js/dist/vue-glide.css'
import vuetify from './plugins/vuetify'



Vue.config.productionTip = false


Vue.use(VueGlide)
Vue.config.productionTip = false
Vue.use(VueCookies)
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')






// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

