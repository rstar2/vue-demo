<template>
  <svg height="160" width="160" viewBox="0 0 160 160">
    <g v-for="(value, index) in sortedValues" :key="index">
      <circle :cx="cx" :cy="cy" :r="radius" fill="transparent"
        :stroke="color(index)" :stroke-width="strokeWidth"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset(value, circumference)"
        :transform="transform(index)">
      </circle>
      <text></text>
    </g>
  </svg>
</template>
<script>
const colors = ["#6495ED", "goldenrod", "#cd5c5c", "thistle", "lightgray"];

export default {
  props: {
    initialValues: {
      type: Array,
      default: () => [0]
    }
  },
  data() {
    return {
      cx: 80,
      cy: 80,
      radius: 60,
      strokeWidth: 30,

      sortedValues: [],

      chartData: [],
      // because starting point for SVG circles begin at 3 o’clock,
      // so make it at the 12 o’clock position, or -90 degrees
      angleOffset: -90
    };
  },
  computed: {
    // that the length of a circle is its circumference, e.g. 2πr
    circumference() {
      return 2 * Math.PI * this.radius;
    },

    // the total sum of all values - from it, percentages for each single value can be calculated
    total() {
      return this.sortedValues.reduce((acc, val) => acc + val);
    },

    calcChartData() {
      this.sortedValues.forEach((dataVal, index) => {
        const data = {
          degrees: this.angleOffset
        };
        this.chartData.push(data);
        this.angleOffset =
          this.dataPercentage(dataVal) * 360 + this.angleOffset;
      });
    }
  },
  methods: {
    color(index) {
      return colors[index];
    },
    valuePercentage(value) {
      return value / this.total;
    },
    offset(value, circumference) {
      const strokeDiff = this.valuePercentage(value) * circumference;
      return circumference - strokeDiff;
    },
    transform(index) {
      // The rotate function takes three arguments: an angle of rotation
      // and x and y coordinates around which the angle rotates.
      // If we don’t supply cx and cy coordinates, then rotation will be around
      // the entire SVG coordinate system.
      return `rotate(${this.chartData[index].degrees}, ${this.cx}, ${this.cy})`;
    }
  },
  created() {
    // TODO: allow values to be changed - this should be computed prop
    this.sortedValues = this.initialValues.sort((a, b) => b - a);

    this.calcChartData();
  }
};
</script>
