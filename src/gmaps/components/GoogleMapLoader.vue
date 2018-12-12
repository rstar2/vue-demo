<template>
  <div>
    <div ref="google-map" class="google-map"></div>
    <template v-if="Boolean(google) && Boolean(map)">
      <slot :google="google" :map="map"/>
    </template>
  </div>
</template>

<script>
// GoogleMapLoader component is only as a loader that prepares the map
// we don’t want to render anything on it.

import GoogleMapsApiLoader from "google-maps-api-loader";

export default {
  props: {
    mapConfig: Object,
    apiKey: String
  },
  data() {
    return {
      google: null,
      map: null
    };
  },
  async mounted() {
    console.log(this.apiKey);

    const googleMapApi = await GoogleMapsApiLoader({
      apiKey: this.apiKey
    });
    this.google = googleMapApi;
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      const mapContainer = this.$refs["google-map"];
      this.map = new this.google.maps.Map(mapContainer, this.mapConfig);
    }
  }
};
</script>

<style scoped>
.google-map {
  width: 100%;
  min-height: 100%;
}
</style>
