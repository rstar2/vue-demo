// See https://css-tricks.com/tips-for-rolling-your-own-lazy-loading/

export default {
    install(Vue, opts) {
        // 1. Make the root instance available in all components
        Vue.prototype.$imageLazy =;


        // 2. Register custom directive that enables zooming on the image
        Vue.directive('image-lazy', {
            bind(el, binding) {
                if (binding.value) {
                    el.setAttribute('data-zoom-src', binding.value);
                }
                zoom.attach(el);
            },
            unbind(el) {
                zoom.detach(el);
            }
        });
    }
};
