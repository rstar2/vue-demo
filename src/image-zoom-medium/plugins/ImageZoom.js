import mediumZoom from 'medium-zoom';

// some default options
const optionsDefaults = {
    // Retrieves the current logged in user that is posting a comment
    commenterSelector() {
        return {
            id: null,
            fullName: 'Anonymous',
            initials: '--',
            email: null
        };
    },
    data: {
        // Hash object of all elements that can be commented on
        targets: {},
        onCreate(created) {
            this.targets[created.targetId].comments.push(created);
        },
        onEdit(edited) {
            // This is obviously not necessary
            // It's there to illustrate what could be done in the callback of a remote call
            let comments = this.targets[edited.targetId].comments;
            comments.splice(comments.indexOf(edited), 1, edited);
        },
        onRemove(removed) {
            let comments = this.targets[removed.targetId].comments;
            comments.splice(comments.indexOf(removed), 1);
        }
    }
};

export default {
    install(Vue, opts) {
        // if (2 > 0) return;

        // Merge options argument into options defaults
        const options = { ...optionsDefaults, ...opts };

        const zoom = mediumZoom();

        // 2. Make the root instance available in all components
        Vue.prototype.$imageZoom = zoom;


        // 3. Register custom directive that enables zooming on the image
        // TODO: Use directive value
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
