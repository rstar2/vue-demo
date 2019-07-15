<template>
  <picture class="lazy">
    <template v-if="isLoaded">
      <source v-for="(source, index) in sources" :key="index"
         :srcset="source.src" :media="`(min-width: ${source.minWidth}px)`" >
    </template>
    <img :src="isLoaded ? src : placeholder" :alt="alt" />
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
  mounted() {
    setTimeout(() => this.isLoaded = true, 5000);
  }


}
</script>

<style>

</style>

