import Vue from 'vue'
import Rx from 'rxjs/Rx';
import VueRx from 'vue-rx';

// could init VueRx with just the used stuff from 'rxjs' , like : { Observable, Subscription }
Vue.use(VueRx, Rx);

import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App),
});
