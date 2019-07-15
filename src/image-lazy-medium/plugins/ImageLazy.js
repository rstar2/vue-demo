// See https://css-tricks.com/tips-for-rolling-your-own-lazy-loading/

import ImageLazy from './ImageLazy.vue';

const supportLazyLoading = 'loading' in HTMLImageElement.prototype;
const supportIntersectionObserver = 'IntersectionObserver' in window;

const optionsDefault = {
    // The element that is used as the viewport for checking visiblity of the target.
    // Must be the ancestor of the target. Defaults to the browser viewport if not specified or if null.
    root: document.querySelector('#scrollArea'),

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

        if (!supportLazyLoading && supportIntersectionObserver) {
            // Set up an IntersectionObserver with some options

            const load = element => {
                if (element instanceof HTMLPictureElement) {
                    // gather all the image and source elements in this picture
                    let sources = element.children;

                    for (let s = 0; s < sources.length; s++) {
                        let source = sources[s];

                        // set a new srcset on the source elements
                        if (sources.hasAttribute('srcset')) {
                            source.setAttribute('srcset', ONE_OF_OUR_BIGGER_IMAGES);
                        }
                        // or a new src on the img element
                        else {
                            source.setAttribute('src', ONE_OF_OUR_BIGGER_IMAGES);
                        }
                    }
                } else {
                    // so elem instanceof HTMLImageElement
                    // set the src attribute to trigger a load
                    element.src = element.dataset.src;

                    // remove the lazy-initial class when the full image is loaded to unblur
                    sources[s].addEventListener('load', image => {
                        image.target.closest('picture').classList.remove('lazy-initial');
                    }, false);
                }

            };

            // Be aware that your callback is executed on the main thread.
            // It should operate as quickly as possible;
            // if anything time-consuming needs to be done, use Window.requestIdleCallback().
            const lazyLoad = (entries) =>{
                entries.forEach(entry => {
                    if (entry.intersectionRatio > 0) {
                        const element = entry.target;

                        // stop observing this element. Our work here is done!
                        observer.unobserve(element);

                        // load the element
                        load(element);
                    }
                });
            };

            const observer = new IntersectionObserver(lazyLoad, {...optionsDefault, ...opts});

            lazyImage.observe= (img) =>{
                observer.observe(img);
            };

            // load all current not registered by
            let lazyImages = document.querySelectorAll('.lazy');
            lazyImages.forEach(lazyImage.observe);
        } else {
            // nothing to do, the Browser support native lazy loading
        }


        // 1. Make the root instance available in all components
        Vue.prototype.$imageLazy = lazyImage;

        // 2. Register the component
        Vue.component('ImageLazy', ImageLazy);
    }
};
