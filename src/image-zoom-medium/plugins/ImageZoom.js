import mediumZoom from 'medium-zoom';

// some default options
const optionsDefaults = {
};

export default {
    install(Vue, opts) {
        // Merge options argument into options defaults
        const options = { ...optionsDefaults, ...opts };

        const zoom = mediumZoom(options);

        // 2. Make the root instance available in all components
        Vue.prototype.$imageZoom = zoom;

        // 3. Register custom directive that enables zooming on the image
        Vue.directive('image-zoom', {
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
