import Vue from 'vue';

/**
 * General scroll directive.
 */
Vue.directive('scroll', {
    inserted: function (el, binding) {
        const f = function (evt) {
            if (binding.value(evt, el)) {
                window.removeEventListener('scroll', f);
            }
        };
        window.addEventListener('scroll', f);
    }
});
