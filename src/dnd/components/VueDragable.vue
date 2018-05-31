<template>
<div v-drag-and-drop:options="options">
  <h2>VueDraggable directive (native DnD wrap)</h2>
  <ul>
    <li v-for="task in tasks" v-bind:key="task.id">
          <input type="checkbox" name="completed[]" value="1" v-bind:checked="task.completed">
          <strong v-text="task.title"></strong>
    </li>
  </ul>
  <ul>
    <li v-for="task in tasks" v-bind:key="task.id">
          <input type="checkbox" name="completed[]" value="1" v-bind:checked="task.completed">
          <strong v-text="task.title"></strong>
    </li>
  </ul>
</div>
</template>

<script>
import Vue from "vue";
import VueDraggable from "vue-draggable";
Vue.use(VueDraggable);

export default {
  data() {
    return {
      options: null,
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
    };
  }
};
</script>

