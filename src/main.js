import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueSimpleAlert from "vue-simple-alert";

import router from "./router";
import store from './store'

Vue.use(VueSimpleAlert);

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
