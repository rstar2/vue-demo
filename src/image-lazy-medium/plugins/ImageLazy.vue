<template>
  <!-- Lazy-load images in <picture>. <img> is the one driving image
      loading so <picture> and srcset fall off of that
  -->
  <picture :class="{ lazy: !this.isLoaded }">
    <template v-if="isLazyLoading">
      <source
        v-for="(source, index) in sourcesSorted"
        :key="index"
        :srcset="source.src"
        :media="`(min-width: ${source.minWidth}px)`"
      />
    </template>
    <!-- NOTE: @[listener]="handler" :[attr]="attr" is an conditional adding of listener/attr, from 2.6.0+  -->
    <img :src="isLazyLoading ? src : placeholder" :alt="alt" :[loadingAttr]="'lazy'" />
  </picture>
</template>

<script>
export default {
  name: "ImageLazy",
  props: {
    src: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      defaut: ""
    },
    alt: {
      type: String,
      defaut: ""
    },
    sources: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isToLoad: false,
      isLoading: false,
      isLoaded: false
    };
  },
  computed: {
    supportLazyLoading() {
      return this.$imageLazy.supportLazyLoading;
    },
    loadingAttr() {
      return this.supportLazyLoading ? "loading" : null;
    },
    isLazyLoading() {
      return this.supportLazyLoading || this.isLoading;
    },
    sourcesSorted() {
      return this.sources.sort((source1, source2) => source2.minWidth - source1.minWidth)
    }
  },
  watch: {
    isToLoad(isToLoad) {
        if (isToLoad) {
          const sources = this.$el.children;
          for (let s = 0; s < sources.length; s++) {
            const source = sources[s];
            source.addEventListener("load", this.loaded);
          }

          this.isLoading = true;
        }
    }
  },
  mounted() {
    if (this.$imageLazy.supportLazyLoading) {
        console.log("Lazy loading (natively) image ", this.src);
        this.isToLoad = true;
    } else {
      this.$imageLazy.observe(this);
    }
  },
  methods: {
    $load() {
      // called by the ImageLazy.js plugin
      console.log("Lazy loading image ", this.src);
      this.isToLoad = true;
    },
    loaded() {
      // called whne the "real" src image is loaded (either from the img tag or from any of the source tags)
      console.log("Lazy loaded image ", this.src);
      this.isLoaded = true;
    }
  }
};
</script>

<style>
picture {
  width: 100%; /* stretch to fit its containing element */
  overflow: hidden;
}

picture img {
  width: 100%; /* stretch to fill the picture element */
  transition: filter 0.5s;
}

picture.lazy img {
  filter: blur(20px);
}
</style>

