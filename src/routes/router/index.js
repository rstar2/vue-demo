import Vue from 'vue';

// initialize routing
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
import routes from './routes';

const router = new VueRouter({
    routes,
    // mode: 'history',
});

export default router;
