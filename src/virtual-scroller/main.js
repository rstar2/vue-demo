
import Vue from 'vue';

// for using all components
// import VueVirtualScroller from 'vue-virtual-scroller';
// Vue.use(VueVirtualScroller);
// or just needed
import { RecycleScroller } from 'vue-virtual-scroller';
Vue.component('RecycleScroller', RecycleScroller);
// import the needed CSS
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

import App from './App.vue';

new Vue({
    el: '#app',
    render: h => h(App),
});


// See https://github.com/Akryum/vue-virtual-scroller
