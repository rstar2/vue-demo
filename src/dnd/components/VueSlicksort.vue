// See https://www.npmjs.com/package/vue-slicksort

<template>
<div>
  <h2>VueSlicsort directive (using SortableJS)</h2>
  <h3>3. Support drag and drop between different lists</h3>
  <h3>5. Sync HTML with model</h3>
  <h3>6. Can work with Vuex</h3>
  <h3>7. Can work with Vuetify/VueMaterial/Bootstrap/...</h3>
  <h3>8. Compatible with Vue.js 2.0 transition-group/</h3>

  <SortableList lockAxis="y" v-model="tasks">
    <transition-group name="task">
      <SortableItem v-for="(task, index) in tasks" :key="task.id"
        :index="index" :item="task" :itemClass="'task'" @remove="removeTask(task)"/>
    </transition-group>
  </SortableList>

  <button @click="addTask">Add</button>
</div>
</template>

<script>
import {ContainerMixin, ElementMixin} from 'vue-slicksort';

const SortableList = {
  mixins: [ContainerMixin],
  template: `
    <div class="list">
      <slot />
    </div>
  `,
};

const SortableItem = {
  mixins: [ElementMixin],
  props: ['item', 'itemClass'],
  template: `
    <div :class='itemClass'>
      <input type="checkbox" v-model="item.completed">
      <strong>{{item.title}}</strong>
      <button @click="$emit('remove')">Remove</button>
    </div>
  `,
};

export default {
  components: {
    SortableItem,
    SortableList,
  },
  data() {
    return {
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
  },
  methods: {
    addTask() {
      this.tasks.push({id: Math.random(), title: "Task Added", completed: false});
    },
    removeTask(task) {
      // No needd to do immutable change - the reactivity of Vue will handle mutations better
      // With Vue is better to use mutation methods
      // this.tasks = this.tasks.filter(t => t !== task);
      const index = this.tasks.indexOf(task);
      this.tasks.splice(index, 1);
    }
  }
};
</script>

<style scoped>
.task {
  padding: 4px;
  margin-top: 4px;
  border: solid 1px;
}

.task-enter,
.task-leave-active {
  transition-property: opacity;
  transition-duration: 1s;
  opacity: 0;
}
</style>


