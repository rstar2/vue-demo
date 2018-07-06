import Vue from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

// this will just make Vue.axios (or this.axios === this.$http to be alias of just axios)
// E.g. the point of this is that by using this.$http.get this.$http.post , etc...
// we abstract the underlying Ajax library used and can dynamically set/change it
// also it's not needed to import 'axios' everywhere in each component where it's gonna be used


import App from './App.vue';

new Vue({
    el: '#app',

    render: h => h(App),
});
