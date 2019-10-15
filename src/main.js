import Vue from 'vue'
import 'normalize.css'
import './cube-ui.js'
import App from './App.vue'
import router from './routers/router.js'
import store from './stores/store.js'
import './registerServiceWorker'
import 'amfe-flexible'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
