<template>
  <div>
    <!-- <VTooltip/> -->
    <notifications group="all"  position="top left"/>
  </div>
</template>

<script>

export default {
  mounted() {
    this.$notify({ group: 'all', text: 'Mounted' });
  }
};
</script>

<style>
  body {
    text-align: center;
    margin-top: 100px;
  }
</style>

