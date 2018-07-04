import Vue from 'vue';

// $ npm install vuetify
import Vuetify from 'vuetify';
Vue.use(Vuetify);
import 'vuetify/dist/vuetify.css';

// $ npm install material-design-icons-iconfont
import 'material-design-icons-iconfont/dist/material-design-icons.css';

// in order to load the CSS from a URL it's needed to loaded from a custom local CSS
//import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Inconsolata:300,400,700|Material+Icons');
import './styles.css';

import App from './App.vue';

new Vue({
    el: '#app',
    render: h => h(App)
});
