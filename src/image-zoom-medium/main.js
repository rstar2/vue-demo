import Vue from 'vue';

import App from './App.vue';

// use the plugin
import ImageZoom from './plugins/ImageZoom';
Vue.use(ImageZoom);

new Vue({
    el: '#app',
    render: h => h(App),
});
