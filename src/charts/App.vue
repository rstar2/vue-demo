<template>
  <div id="app">
    <VFrappe/>
    <VDonut/>
  </div>
</template>

<script>
import VFrappe from "./components/VFrappe.vue";
import VDonut from "./components/VDonut.vue";

export default {
  components: {
    VFrappe, VDonut
  }
};
</script>
