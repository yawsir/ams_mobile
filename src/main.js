import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './routers/router.js'
import store from './stores/store.js'
import './registerServiceWorker'
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
