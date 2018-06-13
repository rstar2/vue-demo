<template>
  <div id="mapbox-container" style="height:300px">
  </div>
</template>

<script>
// import "./mapbox-gl.css";
import mapboxgl from 'mapbox-gl';

export default {
  mounted() {
    mapboxgl.accessToken = process.env.MAPBOX_API_ACCESS_TOKEN;

    const map = new mapboxgl.Map({
      container: "mapbox-container",
      style: "mapbox://styles/mapbox/streets-v10"
    });
  }
};
</script>

<style>
@import "./mapbox-gl.css";
</style>

