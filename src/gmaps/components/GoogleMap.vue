<template>
  <GoogleMapLoader :mapConfig="mapConfig" :apiKey="apiKey">
    <template slot-scope="{ google, map }">
      <GoogleMapMarker
        v-for="marker in markers" :key="marker.id"
        :marker="marker" :markerConfig="mapSettings.markerConfig"
        :google="google"
        :map="map"
      />
      <GoogleMapLine
        v-for="line in lines" :key="line.id"
        :path.sync="line.path" :lineConfig="mapSettings.lineConfig"
        :google="google"
        :map="map"
      />
    </template>
  </GoogleMapLoader>
</template>

<script>
import GoogleMapLoader from "./GoogleMapLoader";
import GoogleMapMarker from "./GoogleMapMarker";
import GoogleMapLine from "./GoogleMapLine";

export default {
  components: {
    GoogleMapLoader,
    GoogleMapMarker,
    GoogleMapLine,
  },
  props: {
    mapSettings: {
      type: Object,
      required: true
    },
    apiKey: {
      type: String,
      required: true
    },
    markers: Array,
    lines: Array,
  },
  computed: {
    mapConfig() {
      return {
        ...this.mapSettings,
        center: this.mapCenter
      };
    },

    mapCenter() {
      return this.markers[1].position;
    }
  }
};
</script>
