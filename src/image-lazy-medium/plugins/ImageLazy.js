// See https://css-tricks.com/tips-for-rolling-your-own-lazy-loading/

import ImageLazy from './ImageLazy.vue';

export default {
    /**
     *
     * @param {Vue} Vue
     * @param {*} opts
     */
    install(Vue, opts) {
        // 1. Make the root instance available in all components
        Vue.prototype.$imageLazy = {};

        Vue.component('ImageLazy', ImageLazy);


        // 2. Register custom directive that enables zooming on the image
        // Vue.directive('image-lazy', {
        //     bind(el, binding) {
        //         if (binding.value) {
        //             el.setAttribute('data-zoom-src', binding.value);
        //         }
        //         zoom.attach(el);
        //     },
        //     unbind(el) {
        //         zoom.detach(el);
        //     }
        // });
    }
};
