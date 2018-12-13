<template>
  <div id="app">
    <GoogleMap
      class="travel-map"
      :apiKey="apiKey"
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

const apiKey = process.env.GMAPS_API_KEY;

export default {
  components: {
    GoogleMap
  },
  beforeCreate() {
    // add to the Vue instance so that they are accessible in the template
    this.mapSettings = mapSettings;
    this.apiKey = apiKey;
  },
  data() {
    return {
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
  },
};
</script>

<style scoped>
.travel-map {
  height: 400px;
}
</style>
