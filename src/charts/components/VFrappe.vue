<template>
  <div>
    <!-- id - Every chart must have an id. -->
    <!-- title - The title displayed on the chart -->
    <!-- type - The type of chart: line, bar, percent, pie, or axis-mixed. -->
    <!-- labels - Names for each value on the x-axis. -->
    <!-- height- Optional: How tall the chart should be. -->
    <!-- colors - Separate colors for each dataset. -->
    <!-- lineOptions - Additional options for how to display line charts. See docs. -->
    <!-- datasets - An array of objects containing names and values for each data set. -->
    <vue-frappe
      id="test"
      :labels="[
          '12am-3am', '3am-6am', '6am-9am', '9am-12pm',
          '12pm-3pm', '3pm-6pm', '6pm-9pm', '9pm-12am'
      ]"
      title="My Awesome Chart"
      type="axis-mixed"
      :height="300"
      :colors="['purple', '#ffa3ef', 'light-blue']"
      :dataSets="data">
    </vue-frappe>

    <vue-frappe
      id="my-chart-id"
      title="Weight during 2017-2018 (kilos)"
      type="line"
      :labels="['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
      :height="250"
      :colors="['#008F68', '#FAE042']"
      :lineOptions="{
        regionFill: 1,
        hideDots: 1
      }"
      :dataSets="[
        {name: '2017', values: weight2017, chartType: 'line'},
        {name: '2018', values: weight2018, chartType: 'line'}
      ]">
    </vue-frappe>
  </div>
</template>

<script>
import Vue from 'vue';
import VueFrappe from "vue2-frappe";

Vue.use(VueFrappe);

export default {
  data() {
    return {
      data: [
        {
          name: "Some Data",
          chartType: "bar",
          values: [25, 40, 30, 35, 8, 52, 17, -4]
        },
        {
          name: "Another Set",
          chartType: "bar",
          values: [25, 50, -10, 15, 18, 32, 27, 14]
        },
        {
          name: "Yet Another",
          chartType: "line",
          values: [15, 20, -3, -15, 58, 12, -17, 37]
        }
      ],

      weight2017: [67, 68, 69, 69, 68, 68, 67, 66, 66, 67, 68, 68],
      weight2018: [66, 66, 67, 67, 66, 66, 66, 65, 65, 65, 67, 68]
    };
  }
};
</script>

