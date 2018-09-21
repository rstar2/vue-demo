import uuid from 'uuid/v1';

import CommentsRootContainer from './CommentsRootContainer';

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
        // Merge options argument into options defaults
        const options = { ...optionsDefaults, ...opts };


        // 1. One thing you want to avoid with this plugin is having its DOM and styles interfere with the app it is installed on.
        // To minimize the chances of this happening, one way to go is making the plugin
        // live in another root Vue instance, outside of the main app's component tree

        // Create plugin's root Vue instance
        const root = new Vue({
            data: {
                targets: options.data.targets
            },
            render: createElement => createElement(CommentsRootContainer)
        });

        // Mount root Vue instance on new div element added to body
        root.$mount(document.body.appendChild(document.createElement('div')));

        // Register data mutation handlers on root instance
        root.$on('create', options.data.onCreate);
        root.$on('edit', options.data.onEdit);
        root.$on('remove', options.data.onRemove);

        // 2. Make the root instance available in all components
        Vue.prototype.$commentsOverlay = root;


        // 3. Register custom directive tha enables commenting on any element
        Vue.directive('comments-enabled', {
            bind(el, binding) {

                // Add this target entry in root instance's data
                // Note - targets is object { "with id for each one "}
                // and inside each target it contains list with comments
                // (e.g for each target CommentsOverlay instance is created with commnets inside)

                root.$set(root.targets,
                    binding.value,
                    {
                        id: binding.value,
                        comments: [],
                        getRect: () => el.getBoundingClientRect(),
                    });

                el.addEventListener('click', (evt) => {
                    root.$emit(`commentTargetClicked__${binding.value}`, {
                        id: uuid(),
                        commenter: options.commenterSelector(),
                        clientX: evt.clientX,
                        clientY: evt.clientY
                    });
                });
            }
        });
    }
};
