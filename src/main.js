import Vue from 'vue';
import App from './App.vue';
import 'vant/lib/index.css';
import { Button, Search, Icon } from 'vant';
Vue.use(Button).use(Search).use(Icon);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
