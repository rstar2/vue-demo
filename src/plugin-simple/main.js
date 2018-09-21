import Vue from 'vue';

import App from './App.vue';

// use the plugin
import CommentsOverlay from './plugins/CommentsOverlay';
Vue.use(CommentsOverlay);

new Vue({
    el: '#app',
    render: h => h(App),
});
