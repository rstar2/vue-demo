<template>
  <div>
    <h2>Simple DnD directive (native DnD wrap)</h2>
    <div>
      <h3>Some Tasks</h3>
      <ul>
        <li v-for="task in tasks"
            v-bind:key="task.id"
            v-bind:id="task.id"
            v-dnd="{handleDragStart, handleDragOver, handleDragEnter, handleDragLeave, handleDragEnd,
            handleDrop, handleDrag}">
          <input type="checkbox" v-model="task.completed">
          <strong v-text="task.title"></strong>
        </li>
      </ul>
    </div>
    <div>
      <h3>Some Images</h3>
      <span class="image" v-for="(image, index) in images" v-bind:key="index"
          v-dnd="{handleClick, handleDrag, handleImageDrop}" v-bind:id="index">
        <img v-bind:src="image.src" v-bind:title="image.name">
      </span>
    </div>

    <p v-text="loggedEvent"></p>
  </div>
</template>

<script>
import '../directives/drag-and-drop';

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
    handleDragStart: function(e) {
      console.log("handleDragStart", e);
      this.loggedEvent = "handleDragStart";
    },
    handleDragOver: function(e) {
      console.log("handleDragOver", e);
      this.loggedEvent = "handleDragOver";
    },
    handleDragEnter: function(e) {
      console.log("handleDragEnter", e);
      this.loggedEvent = "handleDragEnter";
    },
    handleDragLeave: function(e) {
      console.log("handleDragLeave", e);
      this.loggedEvent = "handleDragLeave";
    },
    handleDragEnd: function(e) {
      console.log("handleDragEnd", e);
      this.loggedEvent = "handleDragEnd";
    },
    handleDrop: function(e) {
      console.log("handleDrop-component", this.currentlyDragging, e.target);
      this.currentlyDragging = null;
      this.loggedEvent = "handleDrop";
    },
    handleImageDrop: function(e) {
      console.log("handleImageDrop", this.currentlyDragging, e.target);
      this.currentlyDragging = null;
      this.loggedEvent = "handleImageDrop";
    },
    handleDrag: function(e) {
      console.log("handleDrag-component", e);
      this.loggedEvent = "handleDrag";
      if (!this.currentlyDragging) {
        this.currentlyDragging = e.srcElement;
      }
    },
    handleClick: function(e) {
      console.log("handleClick-component", this.currentlyDragging, e.target);
      this.loggedEvent = "handleClick";
    },
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

