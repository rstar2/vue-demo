
import Vue from 'vue';

import AnimatedVue from 'animated-vue';
import 'animate.css/animate.css';
Vue.use(AnimatedVue);

import App from './App.vue';

new Vue({
    el: '#app',
    render: h => h(App),
});
