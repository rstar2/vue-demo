import Vue from 'vue';

// import { CldImage } from 'cloudinary-vue';
// Vue.component('cld-image', CldImage);
// Vue.component('cld-transformation', CldTransformation);

import Cloudinary from 'cloudinary-vue';

// configure a default Cloudinary cloud name
// (a specific cloud name can be used on a component if needed)
Vue.use(Cloudinary, {
    configuration: {
        cloudName: 'demo'
    },
    // install only the needed Cloudinary components
    components: { CldImage: true }
});


import App from './App.vue';


new Vue({
    el: '#app',
    render: h => h(App),
});
