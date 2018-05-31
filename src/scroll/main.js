import Vue from 'vue';

import './directives/scroll';
import './directives/in-view';

import App from './App.vue';

new Vue({
    el: '#app',
    render: h => h(App),
});
