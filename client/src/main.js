import Vue from 'vue';
import axios from 'axios';
import wysiwyg from 'vue-wysiwyg';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.prototype.axios = axios.create({
  baseURL: 'http://localhost:3000'
});

Vue.use(wysiwyg, {});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
