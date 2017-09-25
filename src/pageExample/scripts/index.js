import '../sass/home.scss';
import MintUI from 'mint-ui';
import Vue from 'vue'
import App from './components/App.vue'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})