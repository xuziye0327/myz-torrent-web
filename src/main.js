import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios'
import VueClipboard from 'vue-clipboard2'

axios.defaults.baseURL=process.env.VUE_APP_API_ENDPOINT
Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(VueClipboard)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
