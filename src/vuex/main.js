import Vue from 'vue';

import store from './store';
import App from './App.vue';

new Vue({
    el: '#app',

    // Make sure to inject the store with the router option to make the
    // whole app store-aware - through this.$store
    store,

    render: h => h(App),
});
