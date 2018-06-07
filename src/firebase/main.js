// init the store (in this case Firebase Cloud Firestone)
import './store';

// init the view
import Vue from 'vue';
import App from './App.vue';
new Vue({
    el: '#app',
    render: h => h(App),
});
