import Vue from 'vue'
import App from './App.vue'
import router from "./router/router";
import VueLazyload from "vue-lazyload";
import store from "./store/store";

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading:require('./components/common/image/default.png')
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
