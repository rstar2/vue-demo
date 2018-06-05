<template>
  <div>
    <!--  Will replace the Motion tag finally with DIV (if skipped the default is SPAN) -->
    <Motion :value="offset" tag="div" :spring="spring">
      <div slot-scope="props" :style="{ transform: `translateX(${props.value}px)` }">Hello</div>
    </Motion>

    <hr>


    <Motion :values="graf" tag="div" spring="stiff">
      <template slot-scope="values">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g v-for="(y, i) in  values" :key="i" class="bar">
            <rect :x="i*10 + 20" :y="0" width="10" :height="y*10"/>
          </g>
        </svg>
      </template>
    </Motion>

  </div>
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
      // },

      graf: [1, 4, 2, 7, 3],
    };
  },
  created() {
    setTimeout(() => {this.offset = 300}, 500);
    setTimeout(() => {this.offset = 100}, 1500);

    setTimeout(() => {this.graf = [7, 1, 5, 2, 8]}, 500);
    setTimeout(() => {this.graf = [1, 4, 2, 7, 3]}, 1500);
  }

};
</script>

<style scoped>
  .bar {
    fill: white;
    stroke: red;
    stroke-width: 1;
  }

</style>

