import Vue from 'vue';
import { Tag } from 'vant';

import App from './App.vue';
Vue.config.productionTip = false;

Vue.use(Tag)

new Vue({
  render: h => h(App)
}).$mount('#app');
