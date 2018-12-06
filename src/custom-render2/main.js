import Vue from 'vue';

Vue.component('anchored-heading', {
    props: {
        level: {
            type: Number,
            required: true,
        }
    },
    // if using 'this' in the render function then don't make it arrow-function
    render: function (createElement) {
        return createElement(
            'h' + this.level,   // tag name
            this.$slots.default // array of children
        );
    },
});

new Vue({
    el: '#app',
    render: createElement => {
        return createElement(
            'anchored-heading',
            {
                props: {
                    level: 3
                },
            },
            'Hello1');
    },
});
