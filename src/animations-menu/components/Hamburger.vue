<template>
  <button class="hamburger" :class="{ 'hamburger--isOpen': isOpen }">
    <div class="hamburger__lineWrapper">
      <span v-for="line in 3" :key="line" class="hamburger__line" />
      <span class="visuallyHidden">Menu</span>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style lang="scss">
@import "../styles/hamburger.scss";
</style>

