import Vue from 'vue';

import App from './App.vue';

// use the plugin
import ImageLazy from './plugins/ImageLazy';
Vue.use(ImageLazy);

new Vue({
    el: '#app',
    render: h => h(App),
});
