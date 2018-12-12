<script>
export default {
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    path: {
      type: Array,
      required: true
    },
    lineConfig: {
      type: Object,
      required: false
    }
  },

  mounted() {
    const { Polyline } = this.google.maps;
    new Polyline({
      path: this.path,
      map: this.map,
      ...this.lineConfig
    });
  },

  // template or render function is obligatory for each .vue component file
  render() {}
};
</script>
