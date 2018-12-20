<template>
  <div id="app">
    <VFrappe/>
    <VDonut/>
    <VGoogleCharts/>
  </div>
</template>

<script>
import VFrappe from "./components/VFrappe.vue";
import VDonut from "./components/VDonut.vue";
import VGoogleCharts from "./components/VGoogleCharts.vue";

export default {
  components: {
    VFrappe, VDonut, VGoogleCharts
  }
};
</script>
