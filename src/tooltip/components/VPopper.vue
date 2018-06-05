// https://github.com/hekigan/vue-directive-tooltip

<template>
  <div>
    <button v-tooltip="msg">Popper Basic</button>
    <button v-tooltip.click="{ content: msg, delay: 500 }">Popper Object - click me</button>
  </div>
</template>

<script>
import Vue from "vue";
import Tooltip from "vue-directive-tooltip";
Vue.use(Tooltip, {
  delay: 500,
  placement: "auto",
  class: "tooltip-red",
  triggers: ["hover"],
  offset: 0
});

// import 'vue-directive-tooltip/css/index.css';

export default {
  data() {
    return {
      msg: "Yeee"
    };
  },
  created() {
    setTimeout(() => {
      this.msg = "Reactive ahh!";
    }, 2000);
  }
};
</script>
<style>
/* The ~  represents the node_modules folder in webpack */
@import "~vue-directive-tooltip/css/index.css";
</style>

