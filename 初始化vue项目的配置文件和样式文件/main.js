import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "utils/1920screen_self-adaption"
import "assets/scss/index.scss"


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
