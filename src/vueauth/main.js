import Vue from 'vue';

// 1. First Ajax library
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'https://api-demo.websanova.com/api/v1';

// 2. Install the Router
import Router from 'vue-router';
const router = new Router();
Vue.router = router;

// 3. Install Vue-Auth
import VueAuth from '@websanova/vue-auth';
import VueAuthDriverBearer from '@websanova/vue-auth/drivers/auth/bearer';
import VueAuthDriverHttp from '@websanova/vue-auth/drivers/http/axios.1.x';
import VueAuthDriverRouter from '@websanova/vue-auth/drivers/router/vue-router.2.x';
Vue.use(VueAuth, {
    auth: VueAuthDriverBearer,
    http: VueAuthDriverHttp,
    router: VueAuthDriverRouter
});

import App from './App.vue';

new Vue({
    el: '#app',

    router,

    render: h => h(App),
});
