<template>
  <!--  Will replace the Motion tag finally with DIV (if skipped the default is SPAN) -->
  <Motion :value="offset" tag="div" :spring="spring">
    <div slot-scope="props" :style="{ transform: `translateX(${props.value}px)` }">Hello</div>
  </Motion>
</template>

<script>
import { Motion } from "vue-motion";

export default {
  components: {
    Motion
  },
  data() {
    return {
      offset: 50,
      spring: "wobbly", // default is "noWobble" - the are also "gentle", "wobbly", "stiff"

      // or define a custom spring preset
      // spring: {
      //   stiffness: 210,
      //   damping: 20,
      //   precision: 0.01
      // }
    };
  },
  created() {
    setTimeout(() => {this.offset = 300}, 500);
    setTimeout(() => {this.offset = 100}, 1500);
  }

};
</script>
