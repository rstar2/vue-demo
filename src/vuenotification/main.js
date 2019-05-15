import Vue from 'vue';
import VueNotification from 'vue-notification';

Vue.use(VueNotification);

import App from './App.vue';

new Vue({
    el: '#app',
    render: h => h(App),
});
