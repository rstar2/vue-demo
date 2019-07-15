<template>
  <!-- Lazy-load images in <picture>. <img> is the one driving image
      loading so <picture> and srcset fall off of that
  -->
  <picture class="lazy">
    <template v-if="isLazyLoaded">
      <source v-for="(source, index) in sources" :key="index"
         :srcset="source.src" :media="`(min-width: ${source.minWidth}px)`" >
    </template>
    <!-- NOTE: :[attr]="attr" is an conditional adding of listener, from 2.6.0+  -->
    <img :src="isLazyLoaded ? src : placeholder" :alt="alt" :[loadingAttr]="lazy" />
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
    loadingAttr() {
      return this.supportLazyLoading ?' loading' : null;
    }
  },
  mounted() {
    setTimeout(() => this.isLoaded = true, 5000);
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

