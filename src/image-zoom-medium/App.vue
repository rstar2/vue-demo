<template>
  <div>
    <img v-image-zoom src="./assets/image1.png" />
    <hr style="margin:250px 0" />
    <img v-image-zoom src="./assets/image2.png" />
    <hr style="margin:250px 0" />
    <Component/>
  </div>
</template>

<script>
import Component from './Component.vue'
export default {
  components: {
    Component
  }
};
</script>

<style>
body {
  background-color: #56585a;
  text-align: center;
}
</style>

