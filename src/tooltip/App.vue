<template>
  <div>
    <!-- <VTooltip/> -->
    <hr>
    <VPopper/>
    <hr>
    <VTippy/>
  </div>
</template>

<script>
import VTooltip  from "./components/VTooltip";
import VPopper from "./components/VPopper";
import VTippy from "./components/VTippy";

export default {
  components: {
    VTooltip, VPopper, VTippy
  }
};
</script>

<style>
  body {
    text-align: center;
    margin-top: 100px;
  }
</style>

