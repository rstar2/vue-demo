<template>
  <div class="map">
    <svg v-if="width && height" :viewBox="vbox">
      <g v-for="(tile, index) in tiles" :key="index">
          <image
            :key="getTileImageKey(tile)"
            :href="getTileHref(tile)"
            :x="(tile.x + tiles.translate[0]) * tiles.scale"
            :y="(tile.y + tiles.translate[1]) * tiles.scale"
            :width="tiles.scale"
            :height="tiles.scale"
            class="map__tile"
          />
      </g>
    </svg>
    <div v-else>
      Empty map
    </div>

    <div v-if="width && height" class="map__copyright">
      ©&nbsp; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap&nbsp;</a>
    </div>
  </div>
</template>

<script>
// https://dev.to/denisinvader/creating-an-interactive-map-with-d3-and-vue-4158

import * as d3Geo from "d3-geo";
import * as d3Tile from "d3-tile";

export default {
  props: {
    center: {
      type: Array,
      default: () => [33.561041, -7.584838]
    },
    scale: {
      type: [Number, String],
      default: 1 << 20
    }
  },
  data() {
    return {
      width: 0,
      height: 0
    };
  },
  computed: {
    vbox() {
      return `0 0 ${this.width} ${this.height}`;
    },
    projection() {
      return d3Geo
        .geoMercator()
        .scale(+this.scale / (2 * Math.PI))
        .translate([this.width / 2, this.height / 2])
        .center(this.center);
    },
    tiles() {
      return d3Tile
        .tile()
        .size([this.width, this.height])
        .scale(+this.scale)
        .translate(this.projection([0, 0]))();
    }
  },
  mounted() {
    const rect = this.$el.getBoundingClientRect();

    this.width = rect.width;
    this.height = rect.height;
  },
  methods: {
    getTileImageKey(tile) {
      return `${tile.x}_${tile.y}_${tile.z}`;
    },
    getTileHref(tile) {
      return `https://a.tile.openstreetmap.org/${tile.z}/${tile.x}/${tile.y}.png`;
    }
  }
};
</script>
<style lang="less">
body {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.map {
  width: 100%;
  height: 100%;

  &__copyright {
    position: absolute;
    bottom: 8px;
    right: 8px;
    padding: 2px 4px;
    background-color: rgba(#ffffff, 0.6);
    font-size: 14px;
  }
}
</style>
