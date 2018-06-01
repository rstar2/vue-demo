<template>
  <div>
    <h2>Simple DnD directive</h2>
    <h3>1. Nnative DnD wrap - so no mobile.touch support</h3>
    <h3>2. No model sync - has to do it explicitly in the callbacks</h3>
    <div>
      <h3>Some Tasks</h3>
      <ul>
        <li v-for="task in tasks" v-bind:key="task.id" v-bind:id="task.id"
            v-dnd="{onDragStart, onDragOver, onDragEnter, onDragLeave, onDragEnd, onDrop, onDrag}">
          <input type="checkbox" v-model="task.completed">
          <strong v-text="task.title"></strong>
        </li>
      </ul>
    </div>
    <div>
      <h3>Some Images</h3>
      <span class="image" v-for="(image, index) in images" v-bind:key="index" v-bind:id="index"
          v-dnd="{onDrag, onDrop : onImageDrop}">
        <img v-bind:src="image.src" v-bind:title="image.name">
      </span>
    </div>

    <p v-text="loggedEvent"></p>
  </div>
</template>

<script>
import "../directives/drag-and-drop";

export default {
  data() {
    return {
      currentlyDragging: null,
      loggedEvent: "",

      tasks: [
        { id: 96, title: "Task 8", completed: false },
        { id: 12, title: "Task 1", completed: true },
        { id: 24, title: "Task 2", completed: false },
        { id: 36, title: "Task 3", completed: true },
        { id: 48, title: "Task 4", completed: false },
        { id: 60, title: "Task 5", completed: true },
        { id: 72, title: "Task 6", completed: false },
        { id: 84, title: "Task 7", completed: true },
        { id: 0, title: "Task 0", completed: false },
        { id: 108, title: "Task 9", completed: true }
      ],
      images: [
        { name: "Image 1", src: "http://placehold.it/100/000000/ffffff" },
        { name: "Image 2", src: "http://placehold.it/100/C93742/ffffff" },
        { name: "Image 3", src: "http://placehold.it/100/6894D1/ffffff" }
      ]
    };
  },
  methods: {
    onDragStart: function(e) {
      this.loggedEvent = "handleDragStart";
    },
    onDragOver: function(e) {
      this.loggedEvent = "handleDragOver";
    },
    onDragEnter: function(e) {
      this.loggedEvent = "handleDragEnter";
    },
    onDragLeave: function(e) {
      this.loggedEvent = "handleDragLeave";
    },
    onDragEnd: function(e) {
      this.loggedEvent = "handleDragEnd";
    },
    onDrop: function(e) {
      this.currentlyDragging = null;
      this.loggedEvent = "handleDrop";

      // TODO: this.list.splice(event.newIndex, 0, this.list.splice(event.oldIndex, 1)[0])
    },
    onImageDrop: function(e) {
      this.currentlyDragging = null;
      this.loggedEvent = "handleImageDrop";

      // TODO: this.list.splice(event.newIndex, 0, this.list.splice(event.oldIndex, 1)[0])
    },
    onDrag: function(e) {
      this.loggedEvent = "handleDrag";
      if (!this.currentlyDragging) {
        this.currentlyDragging = e.srcElement;
      }
    }
  }
};
</script>

<style scoped>
/* Prevent the text contents of draggable elements from being selectable. */
[draggable] {
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
li {
  color: black;
}
.dragging {
  opacity: 0.8;
  color: #6894d1;
}
.drag-over {
  outline: 1px solid red;
}
.drag-enter {
  color: #c93742;
}
</style>

