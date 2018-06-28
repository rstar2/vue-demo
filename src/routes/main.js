
import Vue from 'vue';

import router from './router';
import App from './App.vue';

new Vue({
    el: '#app',

    // Make sure to inject the router with the router option to make the
    // whole app router-aware - - through this.$router (the router API) and this.$route (current active route)
    router,

    render: h => h(App),
});
