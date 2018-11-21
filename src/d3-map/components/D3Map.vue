<template>
  <div class="map">
    <template v-if="width && height">
      <svg :viewBox="vbox" @mousedown="onTouchStart" @mousemove="onTouchMove"
          @mouseup="onTouchEnd" @mouseleave="onTouchEnd">
        <g>
            <image v-for="(tile, index) in tiles" :key="getTileImageKey(tile, index)"
              :href="getTileHref(tile)"
              :x="(tile.x + tiles.translate[0]) * tiles.scale"
              :y="(tile.y + tiles.translate[1]) * tiles.scale"
              :width="tiles.scale"
              :height="tiles.scale"
              class="map__tile"
            />
        </g>
      </svg>
      <div class="map__controls">
          <button class="map__button" :disabled="zoom >= MAX_ZOOM" @click="zoomIn">+</button>
          <button class="map__button" :disabled="zoom <= MIN_ZOOM" @click="zoomOut">-</button>
      </div>
      <div v-if="width && height" class="map__copyright">
        ©&nbsp; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap&nbsp;</a>
      </div>
    </template>

    <div v-else>Empty map</div>
  </div>
</template>

<script>
// https://dev.to/denisinvader/creating-an-interactive-map-with-d3-and-vue-4158

import * as d3Geo from "d3-geo";
import * as d3Tile from "d3-tile";

const MIN_ZOOM = 10;
const MAX_ZOOM = 27;

export default {
  props: {
    center: {
      type: Array,
      default: () => [33.561041, -7.584838]
    },
    initialZoom: {
      type: [Number, String],
      default: 20
    }
  },
  data() {
    return {
      width: 0,
      height: 0,

      translateX: 0,
      translateY: 0,

      touchStarted: false,
      touchLastX: 0,
      touchLastY: 0,

      zoom: +this.initialZoom,
      scale: 1 << +this.initialZoom
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
        .translate([this.translateX, this.translateY])
        .center(this.center)
    },
    tiles() {
      return d3Tile
        .tile()
        .size([this.width, this.height])
        .scale(this.scale)
        .translate(this.projection([0, 0]))();
    }
  },
  beforeCreate() {
    this.MIN_ZOOM = MIN_ZOOM;
    this.MAX_ZOOM = MAX_ZOOM;
  },
  mounted() {
    const rect = this.$el.getBoundingClientRect();

    this.width = rect.width;
    this.height = rect.height;

    this.translateX = this.width / 2;
    this.translateY = this.height / 2;
  },
  methods: {
    getTileImageKey(tile, index) {
      return `${tile.x}_${tile.y}_${tile.z}_${index}`;
    },
    getTileHref(tile) {
      return `https://a.tile.openstreetmap.org/${tile.z}/${tile.x}/${
        tile.y
      }.png`;
    },

    zoomIn() {
      this.zoom = Math.min(this.zoom + 1, MAX_ZOOM);
    },
    zoomOut() {
      this.zoom = Math.max(this.zoom - 1, MIN_ZOOM);
    },

    onTouchStart(e) {
      console.log('start');

      this.touchStarted = true;
      this.touchLastX = e.clientX;
      this.touchLastY = e.clientY;
    },
    onTouchMove(e) {
      if (this.touchStarted) {
        console.log('move');

        this.translateX += e.clientX - this.touchLastX;
        this.translateY += e.clientY - this.touchLastY;
        this.touchLastX = e.clientX;
        this.touchLastY = e.clientY;
      }
    },
    onTouchEnd() {
      console.log('end');
      this.touchStarted = false;
    },
  },
  watch: {
    zoom(zoom, prevZoom) {
      const k = zoom - prevZoom > 0 ? 2 : 0.5;
      this.scale = 1 << zoom;
      this.translateY =
        this.height / 2 - k * (this.height / 2 - this.translateY);
      this.translateX = this.width / 2 - k * (this.width / 2 - this.translateX);
    }
  }
};
</script>
<style lang="less">

.map {
  width: 100%;
  height: 100%;
  position: relative;

  &__controls {
    position: absolute;
    left: 16px;
    top: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 56px;
  }
  &__button {
    border: 0;
    padding: 0;
    width: 24px;
    height: 24px;
    line-height: 24px;
    border-radius: 50%;
    font-size: 18px;
    background-color: #ffffff;
    color: #343434;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
    &:hover,
    &:focus {
      background-color: #eeeeee;
    }
    &:disabled {
      background-color: rgba(#eeeeee, 0.4);
    }
  }
  &__tile {
    pointer-events: none;
  }
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
