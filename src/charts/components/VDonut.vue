<template>
  <donut-chart :initial-values="values"></donut-chart>
</template>


<script>
import DonutChart from './DonutChart.vue';

export default {
  components: {
    donutChart: DonutChart
  },
  data() {
    return {
      values: [230, 308, 520, 130, 200]
    }
  }
}
</script>
