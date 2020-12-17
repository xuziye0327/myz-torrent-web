import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false

Vue.use(VueClipboard)
Vue.prototype.$axios = axios

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
