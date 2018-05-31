import Vue from 'vue';

Vue.directive('dnd', {
    bind: function (el, binding, vnode) {
        const handleDragStart = (e) => {
            e.target.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            // Need to set to something or else drag doesn't start
            e.dataTransfer.setData('text', '*');
            vnode.context.$emit('drag-start');
        };

        const handleDragOver = (e) => {
            if (e.preventDefault) {
                // allows dropping
                e.preventDefault();
            }

            e.dataTransfer.dropEffect = 'move';
            e.target.classList.add('drag-over');
            vnode.context.$emit('drag-over');

            return false;
        };

        const handleDragEnter = (e) => {
            vnode.context.$emit('drag-enter');
            e.target.classList.add('drag-enter');
        };

        const handleDragLeave = (e) => {
            vnode.context.$emit('drag-leave');
            e.target.classList.remove('drag-enter', 'drag-over');
        };

        const handleDrag = (e) => {
            console.log("handleDrag-directive", e);
            vnode.context.$emit('drag');
        };

        const handleDragEnd = (e) => {
            e.target.classList.remove('dragging', 'drag-over', 'drag-enter');
            vnode.context.$emit('drag-end');
        };

        const handleDrop = (e) => {
            console.log("handleDrop-directive", e);
            e.preventDefault();
            if (e.stopPropagation) {
                // stops the browser from redirecting.
                e.stopPropagation();
            }

            // Don't do anything if dropping the same column we're dragging.
            vnode.context.$emit('drop');

            return false;
        };

        // setup the listeners
        el.setAttribute('draggable', 'true');
        el.addEventListener('dragstart', handleDragStart, false);
        el.addEventListener('dragenter', handleDragEnter, false);
        el.addEventListener('dragover', handleDragOver, false);
        el.addEventListener('drag', handleDrag, false);
        el.addEventListener('dragleave', handleDragLeave, false);
        el.addEventListener('dragend', handleDragEnd, false);
        el.addEventListener('drop', handleDrop, false);
        el.addEventListener('click', () => {
            vnode.context.$emit('click');
        }, false);
    },
    unbind: function (el) {
        // shut er' down
        el.classList.remove('dragging', 'drag-over', 'drag-enter');
        el.removeAttribute('draggable');
        // el.removeEventListener('dragstart', handleDragStart);
        // el.removeEventListener('dragenter', handleDragEnter);
        // el.removeEventListener('dragover', handleDragOver);
        // el.removeEventListener('dragleave', handleDragLeave);
        // el.removeEventListener('drag', handleDrag);
    }
});
