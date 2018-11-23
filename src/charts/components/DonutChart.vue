<template>
  <svg height="160" width="160" viewBox="0 0 160 160">
    <g v-for="(value, index) in sortedValues" :key="index">
      <circle :cx="cx" :cy="cy" :r="radius" fill="transparent"
        :stroke="color(index)" :stroke-width="strokeWidth"
        :stroke-dasharray="dash"
        :stroke-dashoffset="offset(value, circumference)"
        :transform="transform(index)">
      </circle>
      <!-- with the  "text-anchor" presentation attribute we can fix the off-centering,
      depending on the font and font size
      -->
      <text v-if="segmentBigEnough(value)" text-anchor="middle" dy="3px"
        :x="chartData[index].textX" :y="chartData[index].textY">
        {{ labelPercentage(value) }}
      </text>
    </g>
  </svg>
</template>
<script>
const colors = ["#6495ED", "goldenrod", "#cd5c5c", "thistle", "lightgray"];

const degreesToRadians = angle => {
  return angle * (Math.PI / 180);
};

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

      // sortedValues: [],
      chartData: []
    };
  },
  computed: {
    // that the length of a circle is its circumference, e.g. 2πr
    circumference() {
      return 2 * Math.PI * this.radius;
    },
    dash() {
      // substruct 2 in order to make this little gap between segments
      return this.circumference - 2;
    },

    // the total sum of all values - from it, percentages for each single value can be calculated
    total() {
      return this.sortedValues.reduce((acc, val) => acc + val);
    },
    sortedValues() {
      return this.initialValues.sort((a, b) => b - a);
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
    },
    labelPercentage(value) {
      return `${Math.round(this.valuePercentage(value) * 100)}%`;
    },
    segmentBigEnough(value) {
      // check if the segment is gig enough in order to add text inside it
      return Math.round(this.valuePercentage(value) * 100) > 5;
    }
  },
  watch: {
    sortedValues: {
      handler() {
        // because starting point for SVG circles begin at 3 o’clock,
        // so make it at the 12 o’clock position, or -90 degrees
        let angleOffset = -90;

        // for labels
        // x = r cos(t) + a
        // y = r sin(t) + b
        // where r is the radius, t is the angle (IN RADIANS),
        // and a and b are the x and y center point offsets.
        // radians = degrees * (π / 180)

        const chartData = [];
        this.sortedValues.forEach(value => {
          // we calculate the angle of our segment by multiplying the ratio of our data value by 360;
          // however, we actually want half of this because our text labels are in the middle of the segment rather than the end
          const angle = (this.valuePercentage(value) * 360) / 2 + angleOffset;
          const radians = degreesToRadians(angle);

          const data = {
            degrees: angleOffset,

            // text coordinates
            textX: this.radius * Math.cos(radians) + this.cx,
            textY: this.radius * Math.sin(radians) + this.cy
          };
          chartData.push(data);

          angleOffset += this.valuePercentage(value) * 360;
        });
        this.chartData = chartData;
      },
      immediate: true
    }
  }
};

// TODO: Create animations with CSS or
// with Greensock to create effects when the chart comes into view.
</script>
