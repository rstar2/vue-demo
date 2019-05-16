import Vue from 'vue';

Vue.directive('dnd', {
    bind: function (el, binding, vnode) {
        const handleDragStart = (e) => {
            e.target.classList.add('dragging');
            e.dataTransfer.effectAllowed = 'move';
            // Need to set to something or else drag doesn't start
            e.dataTransfer.setData('text', '*');

            // vnode.context is the component that the vnode is rendered in
            // emit event to the parent component (Note this is not the component that uses the directive,
            // but the component this 'vnode' is rendered (e.g. 'vnode' is rendered in 'vnode.context' scope)
            vnode.context.$emit('drag-start', e);

            // call a callback method on the direct element using the directive
            if (binding.value.onDragStart) {
                binding.value.onDragStart(e);
            }
        };

        const handleDragOver = (e) => {
            if (e.preventDefault) {
                // allows dropping
                e.preventDefault();
            }

            e.dataTransfer.dropEffect = 'move';
            e.target.classList.add('drag-over');

            vnode.context.$emit('drag-over', e);
            if (binding.value.onDragOver) {
                binding.value.onDragOver(e);
            }

            return false;
        };

        const handleDragEnter = (e) => {
            e.target.classList.add('drag-enter');

            vnode.context.$emit('drag-enter', e);
            if (binding.value.onDragEnter) {
                binding.value.onDragEnter(e);
            }
        };

        const handleDragLeave = (e) => {
            e.target.classList.remove('drag-enter', 'drag-over');

            vnode.context.$emit('drag-leave', e);
            if (binding.value.onDragLeave) {
                binding.value.onDragLeave(e);
            }
        };

        const handleDrag = (e) => {
            console.log('handleDrag-directive', e);

            vnode.context.$emit('drag', e);
            if (binding.value.onDrag) {
                binding.value.onDrag(e);
            }
        };

        const handleDragEnd = (e) => {
            e.target.classList.remove('dragging', 'drag-over', 'drag-enter');

            vnode.context.$emit('drag-end', e);
            if (binding.value.onDragEnd) {
                binding.value.onDragEnd(e);
            }
        };

        const handleDrop = (e) => {
            console.log('handleDrop-directive', e);
            e.preventDefault();
            if (e.stopPropagation) {
                // stops the browser from redirecting.
                e.stopPropagation();
            }

            // Don't do anything if dropping the same column we're dragging.
            vnode.context.$emit('drop', e);
            if (binding.value.onDrop) {
                binding.value.onDrop(e);
            }

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
