import Vue from 'vue';

// $ npm install vue-material
import 'vue-material/dist/vue-material.min.css';

// import a theme
import 'vue-material/dist/theme/default.css';
// import 'vue-material/dist/theme/default-dark.css';

// import full bundle
import VueMaterial from 'vue-material';
Vue.use(VueMaterial);

// or single components
// import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components';
// Vue.use(MdButton);
// Vue.use(MdContent);
// Vue.use(MdTabs);

// in order to load the CSS from a URL it's needed to be loaded from a custom local CSS:
// so this will not work
//import url('//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons');
// but when put in './styles.css'
// and imported with @import url('//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic|Material+Icons'); 'it will
import './styles.css';

import App from './App.vue';

new Vue({
    el: '#app',
    render: h => h(App)
});
