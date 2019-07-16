// See https://css-tricks.com/tips-for-rolling-your-own-lazy-loading/

import ImageLazy from './ImageLazy.vue';

const supportLazyLoading = 'loading' in HTMLImageElement.prototype;
const supportIntersectionObserver = 'IntersectionObserver' in window;

const optionsDefault = {
    // The element that is used as the viewport for checking visiblity of the target.
    // Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null.
    // root: document.querySelector('#scrollArea'),

    // where in relation to the edge of the viewport, we are observing
    rootMargin: '0px',
    // rootMargin: '100px',

    // how much of the element needs to have intersected
    // in order to fire our loading function.
    // A threshold of 1.0 means that when 100% of the target is visible within
    // the element specified by the root option, the callback is invoked.
    threshold: 1.0
};

export default {
    /**
     *
     * @param {Vue} Vue
     * @param {*} opts
     */
    install(Vue, opts) {
        const lazyImage = {
            supportLazyLoading,
            supportIntersectionObserver,
            observe: () => {}
        };

        // check if the Browser support native lazy loading
        if (!supportLazyLoading) {
            // use IntersectionObserver if supported
            if (supportIntersectionObserver) {
                const observedComponents = new Map();

                lazyImage.observe = (vmImageLazy) => {
                    observedComponents.set(vmImageLazy.$el, vmImageLazy);
                    observer.observe(vmImageLazy.$el);
                };

                // TODO: make a collection of intersection observers that support observe different roots
                // e.g allow the ImageLazy.vue component to support the scrolling parent -
                // it can be the main viewport or some custom scrolling element

                // Set up an IntersectionObserver with some options

                // Be aware that your callback is executed on the main thread.
                // It should operate as quickly as possible;
                // if anything time-consuming needs to be done, use Window.requestIdleCallback().
                const lazyLoad = (entries) =>{
                    entries.forEach(entry => {
                        if (entry.intersectionRatio > 0) {
                            const element = entry.target;

                            // stop observing this element. Our work here is done!
                            observer.unobserve(element);

                            const vmImageLazy = observedComponents.get(element);
                            if (vmImageLazy) {
                                observedComponents.delete(element);
                                // call the ImageLazy component's load method
                                vmImageLazy.$load();
                            }
                        }
                    });
                };
                const observer = new IntersectionObserver(lazyLoad, {...optionsDefault, ...opts});
            } else {
                // don't do anything, or if necessary use scroll-listener and etc...

                // skip observing and notify as if image is in viewport
                lazyImage.observe = (vmImageLazy) => {
                    // simulate async behaviour just in case
                    setTimeout(() => vmImageLazy.$load(), 0);
                };
            }
        }


        // 1. Make the root instance available in all components
        Vue.prototype.$imageLazy = lazyImage;

        // 2. Register the component
        Vue.component('ImageLazy', ImageLazy);
    }
};
