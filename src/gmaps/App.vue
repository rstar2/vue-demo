<template>
  <div id="app">
    <GoogleMap
      class="travel-map"
      apiKey="AIzaSyB93baXanXOj5Q0u6fAleGg2NjuRMlB0OI"
      :mapSettings="mapSettings"
      :markers="markers"
      :lines="lines"
    />
  </div>
</template>

<script>
// https://css-tricks.com/using-scoped-slots-in-vue-js-to-abstract-functionality/pathConfig

import { mapSettings } from "./gmap_settings";
import GoogleMap from "./components/GoogleMap";

export default {
  components: {
    GoogleMap
  },
  data() {
    return {
      mapSettings,
      markers: [
        {
          id: "a",
          position: { lat: 3, lng: 101 }
        },
        {
          id: "b",
          position: { lat: 5, lng: 99 }
        },
        {
          id: "c",
          position: { lat: 6, lng: 97 }
        }
      ],
      lines: [
        {
          id: "1",
          path: [{ lat: 3, lng: 101 }, { lat: 5, lng: 99 }]
        },
        {
          id: "2",
          path: [{ lat: 5, lng: 99 }, { lat: 6, lng: 97 }]
        }
      ]
    };
  }
};
</script>

<style scoped>
.travel-map {
  height: 400px;
}
</style>
