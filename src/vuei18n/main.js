import Vue from 'vue';

import Vuetify from 'vuetify';
Vue.use(Vuetify);
import 'vuetify/dist/vuetify.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import messages from './messages';

import VueI18n from 'vue-i18n';
Vue.use(VueI18n);


// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: 'en', // set locale
    messages, // set locale messages
});


import App from './App.vue';

new Vue({
    el: '#app',

    i18n,

    render: h => h(App),
});
