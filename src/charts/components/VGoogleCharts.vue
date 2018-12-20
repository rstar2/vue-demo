<template>
  <div>
    <GChart
      type="BubbleChart"
      :data="bubbleData"
      :options="bubbleOptions"
      style="width: 900px; height: 500px;"
    />

    <GChart type="ColumnChart" :data="barData" :options="barOptions"/>

    <GChart type="BarChart" :data="barData" :options="barHorizontalOptions"/>

    <!--
      if not using 'type="BarChart"' but 'createChart' then the used constractor has to be added in settings,
      like in this case 'bar' in order to use 'new google.charts.Bar'
    -->
    <GChart
      :settings="{packages: ['bar']}"
      :createChart="(el, google) => new google.charts.Bar(el)"

      :data="barData"
      :options="barHorizontalOptions"

      @ready="onChartReady"
    />
  </div>
</template>

<script>
import Vue from "vue";

// Install globally (use as plugin):
// import VueGoogleCharts from 'vue-google-charts';
// Vue.use(VueGoogleCharts);

// install locally single components
import { GChart } from "vue-google-charts";

export default {
  components: {
    GChart,
  },
  data() {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      bubbleData: [
        ["ID", "X", "Y", "Temperature"],
        ["", 80, 167, 120],
        ["", 79, 136, 130],
        ["", 78, 184, 50],
        ["", 72, 278, 230],
        ["", 81, 200, 210],
        ["", 72, 170, 100],
        ["", 68, 477, 80]
      ],
      bubbleOptions: {
        colorAxis: { colors: ["yellow", "red"] }
      },

      barData: [
        ["Year", "Sales", "Expenses", "Profit"],
        ["2014", 1000, 400, 200],
        ["2015", 1170, 460, 250],
        ["2016", 660, 1120, 300],
        ["2017", 1030, 540, 350]
      ],

      barOptions: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017"
        }
      },

      barHorizontalOptions: {
        chart: {
          title: "Company Performance",
          subtitle: "Sales, Expenses, and Profit: 2014-2017"
        },
        bars: "horizontal", // Required for Material Bar Charts.
        hAxis: { format: "decimal" },
        height: 400,
        colors: ["#1b9e77", "#d95f02", "#7570b3"]
      }
    };
  },

  methods: {
    onChartReady(chart, google) {
      // canbe used to access later progamatically the chart and by the google API
    }
  }
};
</script>

