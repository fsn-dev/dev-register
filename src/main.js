import Vue from 'vue'

// import axios from 'axios'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/css.css'

import $$ from '@/assets/js/methods'
import i18n from '@/local'

import App from './App.vue'



Vue.config.productionTip = false
Vue.prototype.$$ = $$

// Vue.prototype.axios = axios
// console.log($$)
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
	connection: $$.config.appURL,
}))
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  i18n,
}).$mount('#app')
