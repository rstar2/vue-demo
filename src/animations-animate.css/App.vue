<template>
  <div id="app">
    <!-- animate single element -->
    <animated-jello>
      <div v-if="isShowSingle" class="element-to-animate">
        Hello
      </div>
    </animated-jello>

    <!-- TODO: animate group of elements -->
    <animated-group-jello tag="p">
      <span v-for="element in list" :key="element.id" class="list-element-to-animate">
        Item {{ element.id }}
      </span>
    </animated-group-jello>
  </div>
</template>

<script>
import { shuffle } from "lodash";

// https://github.com/radical-dreamers/animated-vue#readme

export default {
  data() {
    return {
      isShowSingle: false,
      list: Array.from({ length: 5 }, (_, index) => ({id: index}))
    };
  },
  mounted() {
    setInterval(() => {
      this.isShowSingle = !this.isShowSingle;
      this.list.push({id: this.list.length});
    }, 10000);
  }
};
</script>

<style scoped>
.expander {
  height: 1000px;
  background-color: black;
}
.element-to-animate {
  height: 100px;
  width: 100px;
  background-color: red;
}

.list-element-to-animate {
  height: 50px;
  width: 50px;
  background-color: blueviolet;
  margin: 0 10px
}
</style>
