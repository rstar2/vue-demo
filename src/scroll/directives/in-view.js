import Vue from 'vue';

/**
 * In view (scroll) directive.
 */
Vue.directive('inView', {
    inserted: function (el, binding) {
        const f = function (evt) {
            const domRect = el.getBoundingClientRect();
            if (
                window.scrollY > domRect.top &&
                window.scrollY < domRect.top + domRect.height
            ) {
                if (!el.__handleScrollInView) {
                    el.__handleScrollInView = true;
                    el.setAttribute(
                        'style',
                        'opacity: 1; transform: translate3d(0, 0, 0)'
                    );
                }
            } else {
                if (el.__handleScrollInView === true) {
                    delete el.__handleScrollInView;
                    el.setAttribute('style', 'opacity: 0;');
                }
            }
        };
        window.addEventListener('scroll', f);
        f();
    }
});
