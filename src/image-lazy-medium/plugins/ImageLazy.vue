<template>
  <!-- Lazy-load images in <picture>. <img> is the one driving image
      loading so <picture> and srcset fall off of that
  -->
  <picture :class="{ lazy: !this.isLoaded }">
    <template v-if="isLazyLoaded">
      <source v-for="(source, index) in sources" :key="index"
         :srcset="source.src" :media="`(min-width: ${source.minWidth}px)`" />
    </template>
    <!-- NOTE: @[listener]="handler" :[attr]="attr" is an conditional adding of listener/attr, from 2.6.0+  -->
    <img :src="isLazyLoaded ? src : placeholder" :alt="alt" :[loadingAttr]="'lazy'" />
  </picture>
</template>

<script>
export default {
  name: 'ImageLazy',
  props: {
    src: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      defaut: ''
    },
    alt: {
      type: String,
      defaut: ''
    },
    sources: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isLazy: false,
      isLoading: false,
      isLoaded: false
    }
  },
  computed: {
    supportLazyLoading() {
      return this.$imageLazy.supportLazyLoading;
    },
    isLazyLoaded() {
      return this.supportLazyLoading || this.isLoaded;
    },
    isLazyLoading() {
      return this.supportLazyLoading || this.isLoading;
    },
    loadingAttr() {
      return this.supportLazyLoading ? 'loading' : null;
    },
    classes() {
      return ;
    }
  },
  watch: {
  isLazyLoading: {
    immediate: true,
    handler(isLazyLoading) {
      if (isLazyLoading) {
        const sources = this.$el.children;
        for (let s = 0; s < sources.length; s++) {
            const source = sources[s];
            source.addEventListener('load', this.load)
        }
      }
    }
  }
  },
  mounted() {
    this.$imageLazy.observe(this);
  },
  methods: {
    $load() {
      // called by the ImageLazy.js plugin
      console.log('Lazy loading image ', this.src);
      this.isToLoad = true;
    },
    loaded() {
      // this means that the placeholder has been loaded
      if (!this.isLazyLoading) return;

      console.log('Lazy loaded image ', this.src);
      this.isLoaded = true;
    }
  }


}
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

