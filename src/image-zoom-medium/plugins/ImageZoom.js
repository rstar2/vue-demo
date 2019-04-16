import mediumZoom from 'medium-zoom';

// some default options
const optionsDefaults = {
    // The space outside the zoomed image
    margin: 24,

    // The background of the overlay
    background: '#BADA55',

    // The number of pixels to scroll to close the zoom
    scrollOffset: 0,

    // The zoom is by default rendered in the window viewport.
    // You can also render your image in any element of the DOM, or any custom coordinates with the container option.
    // container: '#zoom-container',

    // You might want to render the zoom in your own template.
    // You could reproduce zooms as seen on Facebook or Dropbox Paper. This is possible with the template option.
    // <template id="zoom-template">
    //   <div>
    //     <header>My image zoom template</header>
    //     <div id="zoom-container"></div>
    //     <aside>Comment on my image</aside>
    //   </div>
    // </template>
    // container: '#zoom-container',
    // template: '#zoom-template',
};

export default {
    install(Vue, opts) {
        // if (2 > 0) return;

        // Merge options argument into options defaults
        const options = { ...optionsDefaults, ...opts };

        // https://github.com/francoischalifour/medium-zoom#usage
        const zoom = mediumZoom(null, options);

        // 2. Make the root instance available in all components
        Vue.prototype.$imageZoom = zoom;


        // 3. Register custom directive tha enables zooming on the image
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
